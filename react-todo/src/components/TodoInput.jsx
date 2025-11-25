import { useState } from 'react';

export function TodoInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form className="todo-input-group" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                aria-label="New task name"
                autoComplete="off"
            />
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
}
