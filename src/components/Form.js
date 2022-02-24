import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";


const Form = () => {

    const [tasks, setTasks] = useState('');

    const handleClick = () => {

        const task = { tasks };

        fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        }).then(() => {
            console.log("New task");
        })
    }

    return (
        <>
        <div style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            display: 'flex',
            position: 'relative',
            marginBottom: '250px',
            marginTop: '-250px',
    }}>
            <TextField
                id="outlined-basic"
                placeholder="Enter task"
                variant="outlined"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
            />
        </div>
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                display: 'flex',
                position: 'relative',
                marginBottom: '250px',
                marginTop: '-240px',
            }}
            >
            <Button
                variant="outlined"
                onClick={() => handleClick()}
            >
                Add Task
            </Button>
            </div>
        </>
    );
};

export default Form;
