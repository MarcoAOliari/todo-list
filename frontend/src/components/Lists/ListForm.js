import React, { useState, useEffect, useRef } from 'react';

function ListForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const handleSubmit = e => {
        e.preventDefault();

        if (props.edit) {
            props.onSubmit({
                id: props.edit.id,
                title: input
            })
        } else {
            props.onSubmit({
                title: input
            })
        }

        setInput('');
    }

    const handleChange = e => {
        setInput(e.target.value);
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                    type="text" 
                    placeholder="Edite uma Lista" value={input}
                    name="text" 
                    className="todo-input" 
                    onChange={handleChange}
                    ref={inputRef}
                    />
                    <button className="todo-button edit">Atualizar</button>
                </>
            ) : (
                <>
                    <input
                    type="text" 
                    placeholder="Adicione uma Lista" value={input}
                    name="text" 
                    className="todo-input" 
                    onChange={handleChange}
                    ref={inputRef}
                    />
                    <button className="todo-button">Adicionar</button>
                </>
            )}
        </form>
    );
}

export default ListForm;
