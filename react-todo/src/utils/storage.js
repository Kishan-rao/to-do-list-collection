/**
 * Shared Storage Utility
 * Handles persistence of todos to localStorage.
 */

const STORAGE_KEY = 'todo-app-data';

export const storage = {
    /**
     * Get all todos from storage
     * @returns {Array} Array of todo objects
     */
    getTodos: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from storage:', error);
            return [];
        }
    },

    /**
     * Save todos to storage
     * @param {Array} todos Array of todo objects
     */
    saveTodos: (todos) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
};
