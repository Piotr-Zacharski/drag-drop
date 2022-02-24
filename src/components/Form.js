import React from 'react';
import {Button, TextField} from "@mui/material";


const Form = ({handleAdd}) => {

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
                onChange={(e) => handleAdd(e.target.value)}
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
                onClick={() => handleAdd()}
            >
                Add Task
            </Button>
            </div>
        </>
    );
};

export default Form;
