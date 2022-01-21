import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import api from '../../services/api';

import TaskForm from './TaskForm';
import Task from './Task';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const { id } = useParams();
    
    useEffect(() => {

        async function getLists() {
            try {
                const response = await api.get(`/todolist/${id}`);
                
                if (response.status === 200) {
                    setTodos(response.data.tasks);
                    setTodoTitle(response.data.todoTitle);
                }
            } catch (err) {
                console.log('Erro inesperado');
            }
        }

        getLists();
    }, [id])

    const addTodo = todo => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return;
        }

        async function postTodo(title) {
            try {
                const response = await api.post(`/todolist/${id}/task`, {
                    title: title
                });

                const newTodos = [...todos, response.data.task]

                setTodos(newTodos);
            } catch (err) {
                console.log('Erro inesperado');
            }
        }
        
        postTodo(todo.title);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.title || /^\s*$/.test(newValue.title)) {
            return;
        }

        async function putTodo(todoId, newValue) {
            try {
                await api.put(`/task/${todoId}/title`, {
                    title: newValue.title
                });

                setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
            } catch (err) {
                console.log('Erro inesperado');
            }
        }
        
        putTodo(todoId, newValue);
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);

        async function deleteTask(id) {
            try {
                await api.delete(`/task/${id}`);

                setTodos(removeArr);
            } catch (err) {
                console.log('Erro inesperado');
            }
        }

        deleteTask(id);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        async function updateTaskStatus(id) {
            try {
                await api.put(`/task/${id}/status`);

                setTodos(updatedTodos);
            } catch (err) {
                console.log('Erro inesperado');
            }
        }

        updateTaskStatus(id);
    }

    return (
        <div>
            <h1>{todoTitle ? todoTitle : ' - '}</h1>
            <TaskForm onSubmit={addTodo} />
            <Task 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default TodoList;
