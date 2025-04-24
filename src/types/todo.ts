export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
  dueDate?: Date;
  category?: string;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, priority?: Priority, dueDate?: Date, category?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  sortBy: 'priority' | 'dueDate' | 'createdAt';
  setSortBy: (sort: 'priority' | 'dueDate' | 'createdAt') => void;
  filterBy: {
    priority?: Priority;
    category?: string;
    completed?: boolean;
  };
  setFilterBy: (filter: { priority?: Priority; category?: string; completed?: boolean }) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoProgressProps {
  completed: number;
  total: number;
}

export interface AddTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (title: string, priority: Priority, dueDate?: Date, category?: string) => void;
}