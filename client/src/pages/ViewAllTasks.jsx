import { useState, useEffect } from "react";
import Navigation from "./Navigate";

const ViewAllTasks = () => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/ethereum/view-all-task", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const data = await res.json();
                if (data.STATUS === 200) {
                    setTaskList(data.tasklist);
                } else {
                    throw new Error();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchAllTasks();
    }, []);

    const extractWebsiteName = (name) => {
        const parts = name.split("-"); // Split the name by '-'
        if (parts.length >= 3) {
            return parts[0].trim(); // Select the first part (website name) and remove leading/trailing whitespace
        }
        return name; // If splitting fails, return the original name
    };

    return (
        <>
            <Navigation />
            <div className="view_all_tasks">
                {taskList.map((task) => (
                    <div
                        className="view_all_tasks_card"
                        key={task.tid}
                        style={task.tid !== "" && task.name !== "" && task.date !== "" ? {} : { display: "none" }}
                    >
                        <p>{task.tid}</p>
                        <p>{extractWebsiteName(task.name)}</p> {/* Display only the website name */}
                        <p>{task.date}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ViewAllTasks;
