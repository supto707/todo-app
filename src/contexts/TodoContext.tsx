'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Todo, TodoContextType, Priority } from '@/types/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('createdAt');
  const [filterBy, setFilterBy] = useState<{ priority?: Priority; category?: string; completed?: boolean }>({});

  const addTodo = (title: string, priority: Priority = 'medium', dueDate?: Date, category?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      priority,
      dueDate,
      category,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos.filter((todo) => {
      if (filterBy.priority && todo.priority !== filterBy.priority) return false;
      if (filterBy.category && todo.category !== filterBy.category) return false;
      if (filterBy.completed !== undefined && todo.completed !== filterBy.completed) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [todos, sortBy, filterBy]);

  return (
    <TodoContext.Provider 
      value={{ 
        todos: filteredAndSortedTodos, 
        addTodo, 
        toggleTodo, 
        deleteTodo,
        sortBy,
        setSortBy,
        filterBy,
        setFilterBy
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}