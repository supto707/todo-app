export type Priority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
  dueDate?: Date;
  category?: string;
  notes?: string;
  subtasks: Subtask[];
  dependencies: string[];
  tags: string[];
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, priority?: Priority, dueDate?: Date, category?: string, notes?: string, tags?: string[]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addSubtask: (todoId: string, title: string) => void;
  toggleSubtask: (todoId: string, subtaskId: string) => void;
  deleteSubtask: (todoId: string, subtaskId: string) => void;
  updateNotes: (todoId: string, notes: string) => void;
  addDependency: (todoId: string, dependencyId: string) => void;
  removeDependency: (todoId: string, dependencyId: string) => void;
  addTag: (todoId: string, tag: string) => void;
  removeTag: (todoId: string, tag: string) => void;
  sortBy: 'priority' | 'dueDate' | 'createdAt';
  setSortBy: (value: 'priority' | 'dueDate' | 'createdAt') => void;
  filterBy: { priority?: Priority; category?: string; completed?: boolean; tags?: string[] };
  setFilterBy: (value: { priority?: Priority; category?: string; completed?: boolean; tags?: string[] }) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSubtask?: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask?: (todoId: string, subtaskId: string) => void;
  onUpdateNotes?: (todoId: string, notes: string) => void;
  onAddSubtask?: (todoId: string, title: string) => void;
  onAddTag?: (todoId: string, tag: string) => void;
  onRemoveTag?: (todoId: string, tag: string) => void;
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