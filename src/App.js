import React, { useState } from 'react';
import styles from './App.module.css';
import TodoList from "./Components/TodoList/TodoList";
import AddTodo from "./Components/AddTodo/AddTodo";
import {FormControl, Select} from "@material-ui/core";

function App() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [sortValue, setValue] = useState(localStorage.getItem('sortValue') || "title");

    const addTodo = (title) => {
        const todo = [{
            status: 'new',
            title: title,
            id: Date.now(),
            createdAt: getDate(),
        }];

        const updateTodos = todos.concat(todo);
        setTodos(updateTodos);
        localStorage.setItem('todos', JSON.stringify(updateTodos));
    }

    const getDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        function formatting(value) {
            if(value.toString().length === 1) {
                return `0${value}`;
            } else {
                return value;
            }
        }

        return `${formatting(hours)}:${formatting(minutes)} ${formatting(day)}.${formatting(month)}.${year}`;
    }

    const compareValues = (key, order = '') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    const sortFunction = (event) => {
        event.preventDefault();
        const newValue = event.target.value;
        const arr = [...JSON.parse(localStorage.getItem('todos'))];
        const sortArr = [...arr].sort(compareValues(newValue));
        setTodos(sortArr);
        setValue(newValue);
        localStorage.setItem('todos', JSON.stringify(sortArr));
        localStorage.setItem('sortValue', newValue);
    }

    return (
        <div className={styles.App}>
            <AddTodo onCreate={addTodo}/>
            {
                todos.length
                    ?
                    <>
                        <div className={styles.List}>
                            <TodoList todos={todos} sortFunction={sortFunction} />
                        </div>
                        <div className={styles.Sort}>
                            <span className={styles.Label}>sort by</span>
                            <FormControl>
                                <Select
                                    native
                                    value={sortValue}
                                    onChange={sortFunction}
                                >
                                    <option value={'title'}>title</option>
                                    <option value={'id'}>created at</option>
                                    <option value={'status'}>status</option>
                                </Select>
                            </FormControl>
                        </div>
                    </>
                    :
                    <div className={styles.List}>No todos</div>
            }
        </div>
    );
}

export default App;
