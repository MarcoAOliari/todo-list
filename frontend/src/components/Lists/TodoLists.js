import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import ListForm from './ListForm';
import List from './List';

function TodoLists() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function getLists() {
            try {
                const response = await api.get('/todolist');
                
                if (response.status === 200) {
                    setLists(response.data.todolists);
                }
            } catch (err) {
                console.log('Erro inesperado');
            }
        }

        getLists();
    }, [])
    
    const addList = list => {
        if (!list.title || /^\s*$/.test(list.title)) {
            return;
        }

        async function postList(title) {
            try {
                const response = await api.post('/todolist', {
                    title: title
                });

                const newLists = [...lists, response.data.todolist]

                setLists(newLists);
            } catch (err) {
                console.log('Erro inesperado');
            }
        }

        postList(list.title);
    }

    const updateList = (listId, newValue) => {
        if (!newValue.title || /^\s*$/.test(newValue.title)) {
            return;
        }

        async function putList(listId, newValue) {
            try {
                await api.put(`/todolist/${listId}`, {
                    title: newValue.title
                });

                setLists(prev => prev.map(item => (item.id === listId ? newValue : item)));
            } catch (err) {
                console.log('Erro inesperado');
            }
        }
        
        putList(listId, newValue);
    }

    const removeList = id => {
        const removeArr = [...lists].filter(list => list.id !== id);

        async function deleteList(id) {
            try {
                await api.delete(`/todolist/${id}`);

                setLists(removeArr);
            } catch (err) {
                console.log('Erro inesperado');
            }
        }

        deleteList(id);
    }

    return (
        <div>
            <h1>To-do Lists</h1>
            <ListForm onSubmit={addList} />
            <List 
                lists={lists} 
                removeList={removeList}
                updateList={updateList}
            />
        </div>
    );
}

export default TodoLists;
