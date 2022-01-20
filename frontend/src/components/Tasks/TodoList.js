import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import api from '../../services/api';

import TodoForm from './TodoForm';
import Todo from './Todo';

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
                await api.post(`/todolist/${id}/task`, {
                    title: title
                });

                const newTodos = [...todos, todo]

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

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
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
            <TodoForm onSubmit={addTodo} />
            <Todo 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default TodoList;
