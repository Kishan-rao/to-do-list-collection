import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { BulkActions } from './components/BulkActions';

function App() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    isSelectionMode,
    selectedIds,
    toggleSelectionMode,
    toggleSelect,
    bulkDelete,
    bulkComplete,
    bulkActivate
  } = useTodos();

  return (
    <div className="app-container">
      <header>
        <div className="header-top">
          <h1>To-Do List</h1>
          <button
            className={`btn btn-sm ${isSelectionMode ? 'active' : ''}`}
            onClick={toggleSelectionMode}
          >
            {isSelectionMode ? 'Cancel' : 'Select'}
          </button>
        </div>
      </header>

      {!isSelectionMode && <TodoInput onAdd={addTodo} />}

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        isSelectionMode={isSelectionMode}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelect}
      />

      {isSelectionMode && (
        <BulkActions
          selectedCount={selectedIds.size}
          onDelete={bulkDelete}
          onComplete={bulkComplete}
          onActivate={bulkActivate}
        />
      )}
    </div>
  );
}

export default App;
