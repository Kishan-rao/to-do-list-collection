export function BulkActions({ selectedCount, onDelete, onComplete, onActivate }) {
    return (
        <div className="bulk-actions">
            <span className="selected-count">{selectedCount} selected</span>
            <div className="bulk-buttons">
                <button className="btn btn-sm" onClick={onActivate}>Mark Active</button>
                <button className="btn btn-sm" onClick={onComplete}>Mark Completed</button>
                <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}
