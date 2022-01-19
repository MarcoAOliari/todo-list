import React, { useState } from 'react';

function TodoForm() {
    const [input, setInput] = useState('');

    return (
        <form className="todo-form">
            <input
             type="text" 
             placeholder="Adicione uma Tarefa" value={input}
             name="text" 
             className="todo-input" 
            />
            <button className="todo-button">Adicionar</button>
        </form>
    );
}

export default TodoForm;
