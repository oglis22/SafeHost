import { useEffect, useState } from 'react';
import './console.css'

function Console() {

    const [ws, setWs] = useState<WebSocket | null>(null);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {

        const socket = new WebSocket('ws://localhost:3001');
        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };
        socket.onmessage = (event) => {
            setOutput((prevOutput) => prevOutput + event.data);
        };
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendCommand = () => {
        if (ws) {
            ws.send(input);
            setInput('');
        }
    };

    return (
        <div className='console'>
        <h1>Console Node-1</h1> <hr />
        <textarea
                rows={10}
                cols={50}
                value={output}
                readOnly
            />
            <br />
        <input className='form-control' type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className='btn btn-success' onClick={sendCommand}>Send</button>
        </div>
    )
}

export default Console;