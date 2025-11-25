import { storage } from './storage';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('storage utility', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test('should save and retrieve todos', () => {
        const todos = [{ id: '1', text: 'Test Todo', completed: false }];

        storage.saveTodos(todos);
        const retrieved = storage.getTodos();

        expect(retrieved).toHaveLength(1);
        expect(retrieved[0].text).toEqual('Test Todo');
    });

    test('should return empty array if storage is empty', () => {
        const retrieved = storage.getTodos();
        expect(retrieved).toEqual([]);
    });
});
