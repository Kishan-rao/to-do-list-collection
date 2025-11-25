# React To-Do List

A modern, component-based To-Do List application built with React, Vite, and Hooks.

## Architecture Decisions

-   **Component Structure**: Broken down into atomic components (`TodoItem`, `TodoInput`, `TodoFilter`) for reusability and separation of concerns.
-   **Custom Hook (`useTodos`)**: All business logic (state management, CRUD operations, filtering) is encapsulated in a custom hook. This keeps the UI components pure and presentational.
-   **CSS Modules/Global**: We use a global `index.css` to share design tokens with the Vanilla version, ensuring exact visual parity.
-   **Vite**: Chosen for its fast dev server and optimized build process.

## Installation & Usage

1.  **Navigate** to the directory:
    ```bash
    cd react-todo
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

## Testing

A sample unit test is provided in `src/utils/storage.test.js`.

To run tests, you would typically need to install a test runner like Vitest or Jest.
Example setup for Vitest:
1. `npm install -D vitest`
2. Add `"test": "vitest"` to `package.json` scripts.
3. Run `npm test`.

## Deployment

### Vercel / Netlify
1.  Push this repository to GitHub.
2.  Import the project in Vercel/Netlify dashboard.
3.  The build settings will be auto-detected (Framework: Vite, Build Command: `npm run build`, Output Directory: `dist`).
4.  Click Deploy.
