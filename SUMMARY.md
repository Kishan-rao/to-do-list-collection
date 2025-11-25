# Project Summary & QA

## Comparison
**Vanilla JS Implementation**: Best for lightweight projects, simple widgets, or when minimizing dependencies is a priority. It offers the fastest initial load time and requires no build tools. Show this on your resume to demonstrate deep understanding of the DOM, event delegation, and core JavaScript concepts without crutches.

**React Implementation**: Best for scalable, interactive web applications. It provides a structured component model, declarative state management, and a vast ecosystem. Show this on your resume to demonstrate proficiency with modern frontend workflows, Hooks, and state management patterns.

## QA Checklist
Run these steps on both applications to verify functionality:

1.  **Add Task**:
    -   Enter text in the input field.
    -   Press Enter or click "Add".
    -   **Expected**: Task appears at the top of the list. Input clears.

2.  **Persistence**:
    -   Refresh the page.
    -   **Expected**: The task added in step 1 is still there.

3.  **Toggle Completion**:
    -   Click the checkbox of a task.
    -   **Expected**: Text gets a strikethrough style.
    -   **Verify**: Switch to "Active" filter (task should disappear). Switch to "Completed" filter (task should appear).

4.  **Edit Task**:
    -   Click the Edit (pencil) icon.
    -   Modify the text in the prompt and click OK.
    -   **Expected**: Task text updates immediately.

5.  **Delete Task**:
    -   Click the Delete (trash) icon.
    -   **Expected**: Task animates out (slides away) and is removed from the list.

6.  **Empty State**:
    -   Delete all tasks.
    -   **Expected**: "No all tasks found" message appears.
