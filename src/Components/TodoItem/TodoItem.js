import React, {useState} from 'react';
import styles from '../TodoList/TodoList.module.css';
import { FormControl, Select } from '@material-ui/core';

function TodoItem (props){
    const { id, status, title, createdAt } = props.todo;
    const [value, setValue] = useState(status);

    const handleChange = (event) => {
        event.preventDefault();
        setValue(event.target.value);

        const arr = [...JSON.parse(localStorage.getItem('todos'))];
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id === id) {
                arr[i].status = event.target.value;
                break;
            }
        }
        localStorage.setItem('todos', JSON.stringify(arr));
    }

    return (
        <div className={`${styles.Row} ${styles.Item}`}>
            <div className={`${styles.Inner} ${styles.status} ${styles[value]}`}>
                <FormControl>
                    <Select
                        native
                        value={value}
                        onChange={handleChange}
                        inputProps={{
                            name: 'status',
                            id: 'status-native-simple',
                        }}
                    >
                        <option value={'new'}>New</option>
                        <option value={'inProgress'}>In progress</option>
                        <option value={'done'}>Done</option>
                    </Select>
                </FormControl>
            </div>
            <div className={`${styles.Inner} ${styles.title}`}>{title}</div>
            <div className={`${styles.Inner} ${styles.created}`}>{createdAt}</div>
        </div>
    )
}

export default TodoItem;
