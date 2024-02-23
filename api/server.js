const express = require('express');
const ABI = require('./ABI.json');
const cors = require("cors");
const { Web3 } = require('web3');

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3("HTTP://127.0.0.1:7545"); // Ganache HTTP
const contract_address = "0x40c4613e9428996730Bf8FEB2D7DA8c69D52D539"; // Contract address
const contract = new web3.eth.Contract(ABI, contract_address);

app.post("/api/ethereum/create-task", async (req, res) => {
    try {
        // Extract taskDate from the request body
        const { taskDate } = req.body;
        res.status(200).json({ STATUS: 200, message: "Entry can be Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ STATUS: 500, message: "Internal Server Error" });
    }
});

app.post("/api/ethereum/update-task", async (req, res) => {
    try {
        // Extract taskID and taskDate from the request body
        const { taskID, taskDate } = req.body;
        res.status(200).json({ STATUS: 200, message: "Entry can be Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ STATUS: 500, message: "Internal Server Error" });
    }
});

app.get("/api/ethereum/view-task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await contract.methods.viewTask(taskId).call();
        const { id, name, date } = task;
        const tid = Number(id);
        const taskobject = {
            tid, name, date
        }
        res.status(200).json({ STATUS: 200, taskobject, MESSAGE: "Entry Exist" });
    } catch (error) {
        res.status(404).json({ STATUS: 500, MESSAGE: "Entry not Exist" });
    }
});

app.get("/api/ethereum/view-all-task", async (req, res) => {
    try {
        const task = await contract.methods.allTask().call();
        if (task.length > 0) {
            const tasklist = task.map(({ id, name, date }) => {
                const tid = Number(id);
                return { tid, name, date };
            })
            res.status(200).json({ STATUS: 200, tasklist, MESSAGE: "Entry Exist" });
        } else {
            res.status(404).json({ STATUS: 404, MESSAGE: "Entry List Not Exist" });
        }
    } catch (error) {
        console.log(error);
    }
})

app.delete("/api/ethereum/delete-task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        res.status(200).json({ STATUS: 200, message: "Entry can delete" });
    } catch (error) {
        console.error(error);
    }
})

app.listen(3000, function () {
    console.log("Server is running on localhost4000");
});
