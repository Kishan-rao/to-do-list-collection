import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    // Load initial data
    useEffect(() => {
        const savedTodos = storage.getTodos();
        setTodos(savedTodos);
    }, []);

    // Save on change
    useEffect(() => {
        storage.saveTodos(todos);
    }, [todos]);

    const addTodo = useCallback((text) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setTodos(prev => [newTodo, ...prev]);
    }, []);

    const toggleTodo = useCallback((id) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() };
            }
            return todo;
        }));
    }, []);

    const deleteTodo = useCallback((id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    const editTodo = useCallback((id, newText) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText, updatedAt: new Date().toISOString() };
            }
            return todo;
        }));
    }, []);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return {
        todos,
        filteredTodos,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo
    };
}
