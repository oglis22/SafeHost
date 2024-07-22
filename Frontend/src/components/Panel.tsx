import axios from 'axios';
import './panel.css'
import { useState } from 'react';
import Console from './Console';

function Panel() {

    const [status, setstatus] = useState("loading...");

    //<create,start,stop,remove> functions for » server
    const createCon = async () => {
        const resp = await axios.post('http://127.0.0.1:3000/create');
        if (resp.status == 200) {
            console.log(resp.data);
            alert("Server created");
        }
        else {alert("Error while creating machine"); setstatus("error");}
        updateStatus();
    };

    const stopCon = async () => {
        const resp = await axios.post('http://127.0.0.1:3000/stop');
        if (resp.status == 200) {
            console.log(resp.data);
            alert("Server sopped!");
        }
        else {alert("Error while sopping machine"); setstatus("error");}
        updateStatus();
    };

    const startCon = async () => {
        const resp = await axios.post('http://127.0.0.1:3000/start');
        if (resp.status == 200) {
            console.log(resp.data);
            alert("Server started");
        }
        else {alert("Error while starting machine"); setstatus("error");}
        updateStatus();
    };

    const removeCon = async () => {
        const resp = await axios.post('http://127.0.0.1:3000/remove');
        if (resp.status == 200) {
            console.log(resp.data);
            alert("Server removed");
        }
        else {alert("Error while removing machine"); setstatus("error");}
        updateStatus();
    };
    

    //Status updates
    const updateStatus = async () => {
        const resp = await axios.get("http://127.0.0.1:3000/getstatus");
        if (resp.status != 200) {
            setstatus("error");
            return;
        }
        if (resp.data.status == "ncreated") {
            setstatus("No Server found ⚫");
            return;
        }
        if (resp.data.status == "running") {
            setstatus("Server is online 🟢");
            return;
        }
        if (resp.data.status == "stopped") {
            setstatus("Server offline 🔴");
        }
        }

        updateStatus();

        if (status == "Server is online 🟢") {
            return (
                <>
                <div>
                    <center><h1>Safe Host Panel</h1></center>
                    <p>Server Status: {status}</p>
                    <p>Port: none</p>
                    <button className='btn btn-primary' onClick={createCon}>Create Server</button>
                    <button className='btn btn-success' onClick={startCon}>Start Server</button>
                    <button className='btn btn-danger' onClick={stopCon}>Stop Server</button>
                    <button className='btn btn-secondary' onClick={removeCon}>Remove</button>
                    <Console />
                </div>
                </>
            )
        }
        return (
            <>
            <div>
                <center><h1>Safe Host Panel</h1></center>
                <p>Server Status: {status}</p>
                <p>Port: none</p>
                <button className='btn btn-primary' onClick={createCon}>Create Server</button>
                <button className='btn btn-success' onClick={startCon}>Start Server</button>
                <button className='btn btn-danger' onClick={stopCon}>Stop Server</button>
                <button className='btn btn-secondary' onClick={removeCon}>Remove</button>
                
            </div>
            </>
        )


}

export default Panel;

//🔴
//🟢
//⚫