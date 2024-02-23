import { useState } from "react";
import Navigation from "./Navigate";

const UpdateTask = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const generatePassword = () => {
    // Implement your password generation logic here
    // This is just a simple example, you can use libraries like `password-generator` for more complex generation
    const newPassword = Math.random().toString(36).slice(-10); // Generate a random alphanumeric password
    setGeneratedPassword(newPassword);
  };

  const { contract, account } = state;

  const updateTask = async (event) => {
    event.preventDefault();
    const { contract, account } = state;
    const website = document.querySelector("#website").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const taskName = `${website} - ${username} - ${password}`; // Combine fields with delimiter '-'
    const taskDate = document.querySelector("#taskDate").value;
    const taskID = document.querySelector("#taskID").value;

    try {
      const res = await fetch("http://localhost:3000/api/ethereum/update-task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ taskID: taskID, taskName: taskName, taskDate: taskDate }), // Include taskID for updating
      });
      const data = await res.json();
      console.log(data);
      if (data.STATUS === 200) {
        await contract.methods.updateTask(taskID, taskName, taskDate).send({ from: account });
        setModalContent(
          `Task ID ${taskID} updated`
        );
        setModalVisible(true);
      } else {
        alert("Entry can't be updated");
      }
    } catch (error) {
      setModalContent("Task cannot be updated");
      setModalVisible(true);
    }
  };

  // Function to get the current date in the required format (YYYY-MM-DD)
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Navigation />
      <div className="update_task todo_btn">
        <form onSubmit={updateTask}>
          <label>
            ID:
            <input id="taskID" required />
          </label>
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
            <input id="taskDate" type="date" max={new Date().toISOString().split('T')[0]} value={getCurrentDate()} required />
          </label>
          <button type="submit">Update Key</button>
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

export default UpdateTask;
