'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodo } from '@/contexts/TodoContext';
import { TodoItem } from '@/components/TodoItem';
import { TodoProgress } from '@/components/TodoProgress';
import { AddTodoDialog } from '@/components/AddTodoDialog';
import { Priority } from '@/types/todo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, sortBy, setSortBy, filterBy, setFilterBy } = useTodo();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const categories = Array.from(new Set(todos.map(todo => todo.category).filter(Boolean)));

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
        <p className="text-muted-foreground">
          Manage your tasks with a modern interface.
        </p>
      </div>

      <TodoProgress completed={completedTodos} total={todos.length} />

      <div className="flex flex-wrap gap-4 items-center">
        <Select defaultValue={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterBy.priority || "all"}
          onValueChange={(value: Priority | "all") => 
            setFilterBy({ ...filterBy, priority: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
          </SelectContent>
        </Select>

        {categories.length > 0 && (
          <Select
            value={filterBy.category || "all"}
            onValueChange={(value: string) => 
              setFilterBy({ ...filterBy, category: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button
          variant="outline"
          onClick={() => setFilterBy({ ...filterBy, completed: !filterBy.completed })}
          className={filterBy.completed ? 'bg-primary/10' : ''}
        >
          {filterBy.completed ? 'Show All' : 'Show Completed'}
        </Button>
      </div>

      <motion.div
        className="space-y-4"
        initial={false}
        layout
      >
        <AnimatePresence mode="popLayout">
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-muted-foreground"
            >
              <p>No todos yet. Add one to get started!</p>
            </motion.div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>

      <AddTodoDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addTodo}
      />
    </div>
  );
}