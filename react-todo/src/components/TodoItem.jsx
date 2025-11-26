import { useState } from 'react';

export function TodoItem({ todo, onToggle, onDelete, onEdit, isSelectionMode, isSelected, onToggleSelection }) {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleDelete = () => {
        setIsRemoving(true);
    };

    const handleAnimationEnd = () => {
        if (isRemoving) {
            onDelete(todo.id);
        }
    };

    const handleEdit = () => {
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            onEdit(todo.id, newText.trim());
        }
    };

    const handleChange = () => {
        if (isSelectionMode) {
            onToggleSelection(todo.id);
        } else {
            onToggle(todo.id);
        }
    };

    return (
        <li
            className={`todo-item ${todo.completed ? 'completed' : ''} ${isRemoving ? 'removing' : ''} ${isSelected ? 'selected' : ''}`}
            onAnimationEnd={handleAnimationEnd}
            data-id={todo.id}
        >
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={isSelectionMode ? isSelected : todo.completed}
                onChange={handleChange}
                aria-label={isSelectionMode ? `Select ${todo.text}` : `Toggle completion for ${todo.text}`}
            />
            <span className="todo-text">{todo.text}</span>

            {!isSelectionMode && (
                <div className="todo-actions">
                    <button className="btn-icon btn-edit" onClick={handleEdit} aria-label="Edit task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                    <button className="btn-icon btn-delete" onClick={handleDelete} aria-label="Delete task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            )}
        </li>
    );
}
