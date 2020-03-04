import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        maxWidth: '500px',
        margin: '0 auto',
    },
    input: {
        flexGrow: 1
    },
    button: {
        width: '130px'
    }
});

function AddTodo({ onCreate }) {
    const classes = useStyles();

    const [value, setValue] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if(value.trim()) {
            onCreate(value.trim());
            setValue('');
        }
    }

    return (
        <form className={classes.form} noValidate autoComplete="off" onSubmit={submitHandler}>
            <Input
                placeholder="Todo"
                className={classes.input}
                onChange={event => setValue(event.target.value)}
                value={value}
            />
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
            >
                Add
            </Button>
        </form>
    )
}

export default AddTodo;
