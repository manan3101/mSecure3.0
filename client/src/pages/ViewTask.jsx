import { useState } from "react";
import Navigation from "./Navigate";

const ViewTask = () => {
    const [task, setTask] = useState({ numId: null, name: null, date: null });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setModalContent("Copied to clipboard");
                setModalVisible(true);
            })
            .catch((error) => {
                setModalContent("Failed to copy to clipboard: " + error.message);
                setModalVisible(true);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const viewTask = async (event) => {
        try {
            event.preventDefault();
            const taskID = document.querySelector("#taskID").value;
            const res = await fetch(`http://localhost:3000/api/ethereum/view-task/${taskID}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await res.json();
            if (data.STATUS === 200) {
                console.log(data.taskobject);
                setTask(data.taskobject);
            } else {
                throw new Error(data.MESSAGE || "Failed to fetch task");
            }
        } catch (error) {
            setModalContent(error.message);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalContent("");
    };

    return (
        <>
            <Navigation />
            <div className="view_task todo_btn">
                {task.numId !== null && task.name !== null && task.date !== null ? (
                    <div className="view_task_by_id ">
                        <table style={{ borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td colSpan="3" style={{ fontSize: '40px', textAlign: 'center' }}>{task.name.split("-")[0]}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'blue', padding: '5px', fontSize: '19px' }}>Username:</td>
                                    <td colSpan="2" style={{ fontSize: '16px', padding: '5px' }}>{task.name.split("-")[1]}</td>
                                    <td style={{ cursor: 'pointer', padding: '5px' }} onClick={() => copyToClipboard(task.name.split("-")[1])}>📋</td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'green', padding: '5px', fontSize: '19px' }}>Password:</td>
                                    <td colSpan="2" style={{ fontSize: '16px', padding: '5px' }}>
                                        {showPassword ? task.name.split("-")[2]: "************"}
                                    </td>
                                    <td style={{ cursor: 'pointer', padding: '5px' }} onClick={() => copyToClipboard(task.name.split("-")[2])}>📋</td>
                                    <td style={{ cursor: 'pointer', padding: '5px' }} onClick={togglePasswordVisibility}>
                                        {showPassword ? "👁️" : "👁️"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty_div"></div>
                )}
                <form onSubmit={viewTask} style={{ display: 'flex', gap: '20px' }}>
                    <label>
                        ID:
                        <input id="taskID" style={{ fontSize: '16px' }} />
                    </label>
                    <button type="submit" style={{ fontSize: '16px' }}>View Key</button>
                </form>
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <p>{modalContent}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewTask;
