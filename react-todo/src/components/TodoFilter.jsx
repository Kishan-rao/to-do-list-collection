export function TodoFilter({ currentFilter, onFilterChange }) {
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'active', label: 'Active' },
        { id: 'completed', label: 'Completed' }
    ];

    return (
        <div className="filters" role="group" aria-label="Task filters">
            {filters.map(f => (
                <button
                    key={f.id}
                    className={`filter-btn ${currentFilter === f.id ? 'active' : ''}`}
                    onClick={() => onFilterChange(f.id)}
                    aria-pressed={currentFilter === f.id}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}
