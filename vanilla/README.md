# Vanilla JS To-Do List

A lightweight, dependency-free To-Do List application built with semantic HTML5, modern CSS3, and ES6+ JavaScript.

## Architecture Decisions

-   **State Management**: A central `todos` array serves as the single source of truth. Any change to this state triggers a re-render of the list and a sync to `localStorage`.
-   **Event Delegation**: Instead of attaching event listeners to every single delete or edit button, a single listener on the parent `<ul>` handles clicks. This improves performance and simplifies memory management as items are added/removed.
-   **CSS Variables**: Design tokens (colors, spacing) are defined in `:root` to ensure consistency and easy theming. The same tokens are used in the React version to guarantee visual parity.
-   **Module System**: ES modules (`type="module"`) are used to organize code, separating the storage logic (`storage.js`) from the UI logic (`app.js`).

## Installation & Usage

1.  **Clone/Download** the repository.
2.  **Open** `index.html` in any modern web browser.
    *   No build step or server is required for this version.
    *   *Optional*: Serve with a local server (e.g., `npx serve .`) if you encounter CORS issues with modules (though usually fine for local files in modern browsers).

## Testing

Since this project uses plain JavaScript without a build pipeline, we recommend manual testing or a simple script injection for verification.

### Manual QA Checklist
1.  **Add**: Type a task and press Enter. Verify it appears at the top.
2.  **Toggle**: Click the checkbox. Verify text strikes through and it persists after refresh.
3.  **Filter**: Click "Active". Completed items should disappear. Click "Completed". Active items should disappear.
4.  **Delete**: Click the trash icon. Verify the item slides out and is removed.
5.  **Edit**: Click the edit icon. Modify text in the prompt and save.

### Automated Test Concept
You can test the core logic by importing the functions in a test environment (like Jest) or running a script in the browser console:

```javascript
// Console Test Script
import { storage } from './js/storage.js';

// Test Storage
const mockData = [{ id: '1', text: 'Test', completed: false }];
storage.saveTodos(mockData);
const loaded = storage.getTodos();
console.assert(loaded[0].text === 'Test', 'Storage save/load failed');
console.log('Storage test passed');
```
