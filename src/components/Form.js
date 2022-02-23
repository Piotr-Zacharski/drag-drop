import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

const Form = ({handleAdd, mainTasks}) => {
    const [add, setAdd] = useState(mainTasks)

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
                name={add}
                value={add}
                onChange={(e) => setAdd(e.target.value)}
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
                onClick={(e) => handleAdd(setAdd(e.target.value))}
            >
                Add Task
            </Button>
            </div>
        </>
    );
};

export default Form;
