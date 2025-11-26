import { TodoItem } from './TodoItem';

export function TodoList({ todos, filter, onToggle, onDelete, onEdit, isSelectionMode, selectedIds, onToggleSelection }) {
    if (todos.length === 0) {
        return <div className="empty-state">No {filter === 'all' ? '' : filter} tasks found.</div>;
    }

    return (
        <ul className="todo-list" aria-live="polite">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedIds?.has(todo.id)}
                    onToggleSelection={onToggleSelection}
                />
            ))}
        </ul>
    );
}
