import Navigation from "./Navigate";
import { useState } from "react";

const CreateTask = ({ state }) => {
    // Function to get the current date in the required format (YYYY-MM-DD)
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [taskDate, setTaskDate] = useState(getCurrentDate()); // Initial state set to current date

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
    };

    const generatePassword = () => {
        // Implement your password generation logic here
        // This is just a simple example, you can use libraries like `password-generator` for more complex generation
        const newPassword = Math.random().toString(36).slice(-10); // Generate a random alphanumeric password
        setGeneratedPassword(newPassword);
    };

    const createTask = async (event) => {
        event.preventDefault();
        const { contract, account } = state;
        const website = document.querySelector("#website").value;
        const username = document.querySelector("#username").value;
        const password = generatedPassword || document.querySelector("#password").value; // Use generated password if available
        const taskName = `${website}-Username: ${username}-Password: ${password}`;
        try {
            const res = await fetch("http://localhost:3000/api/ethereum/create-task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ taskDate: taskDate })
            });
            const data = await res.json();
            console.log(data);
            if (data.STATUS === 200) {
                if (contract) {
                    await contract.methods.createTask(taskName, taskDate).send({ from: account });
                    setModalContent(`Task ${taskName} added at ${taskDate}`);
                }
            } else {
                alert("Entry can't be added");
            }
        } catch (error) {
            setModalContent(`Task already exists at ${taskDate}`);
        } finally {
            setModalOpen(true);
        }
    };

    return (
        <>
            <Navigation />
            <div className="create_task todo_btn">
                <form onSubmit={createTask}>
                    <label>
                        Website:
                        <input id="website" type="text" required />
                    </label>
                    <label>
                        Username:
                        <input id="username" type="text" required />
                    </label>
                    <label>
                        Password:
                        <input id="password" type="password" required value={generatedPassword} readOnly />
                        <a href="#" onClick={generatePassword}style={{ textAlign:'right',color: 'blue',marginTop:'4px'}}>Generate Password ?</a>
                    </label>
                    <label>
                        Date:
                        <input id="taskDate" type="date" max={new Date().toISOString().split('T')[0]} value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required />
                    </label>
                    <button type="submit" className="generate_password_button">Create Key</button>
                </form>
                {modalOpen && (
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

export default CreateTask;
