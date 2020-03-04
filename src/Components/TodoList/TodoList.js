import React from 'react';
import styles from './TodoList.module.css';
import TodoItem from "../TodoItem/TodoItem";

function TodoList (props) {
    return (
        <>
            <div className={styles.Header}>
                <div className={`${styles.Inner} ${styles.status}`}>Status</div>
                <div className={`${styles.Inner} ${styles.title}`}>Title</div>
                <div className={`${styles.Inner} ${styles.created}`}>Created At</div>
            </div>
            {
                props.todos.map(todo => {
                        return <TodoItem
                            key={todo.id}
                            todo={todo}
                        />
                    }
                )
            }
        </>
    )
}

export default TodoList;
