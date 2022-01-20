import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit, TiArrowRightThick } from 'react-icons/ti';
import ListForm from './ListForm';

function List({ lists, removeList, updateList }) {
    const [edit, setEdit] = useState({ 
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateList(edit.id, value);
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <ListForm edit={edit} onSubmit={submitUpdate} />
    }

    return lists.map((list, index) => (
        <div 
            className={'todo-row'} 
            key={index}
        >
            <div key={list.id}>
                {list.title}
            </div>
            <div className="icons">
                <RiCloseCircleLine 
                    onClick={() => removeList(list.id)}
                    className='delete-icon'
                />
                <TiEdit 
                    onClick={() => setEdit({ id: list.id, value: list.title })}
                    className='edit-icon'
                />
                <Link to={`/todo/${list.id}`}>
                    <TiArrowRightThick
                        className='redirect-icon'
                    />
                </Link>
            </div>
        </div>
    ));
}

export default List;
