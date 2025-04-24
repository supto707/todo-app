'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Trash, Calendar, Tag, ChevronDown, ChevronUp, ListTodo, FileText, Link } from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { TodoItemProps } from '@/types/todo';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function TodoItem({ todo, onToggle, onDelete, onToggleSubtask, onDeleteSubtask, onUpdateNotes, onAddSubtask, onAddTag, onRemoveTag }: TodoItemProps) {
  const [expanded, setExpanded] = useState(false);
  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-destructive';
      case 'medium':
        return 'border-l-primary';
      case 'low':
        return 'border-l-muted';
      default:
        return 'border-l-border';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20';
      case 'medium':
        return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'low':
        return 'bg-muted/50 text-muted-foreground hover:bg-muted';
      default:
        return '';
    }
  };

  const isOverdue = (date: Date) => {
    return !todo.completed && isAfter(new Date(), date);
  };
  const handleDelete = () => {
    onDelete(todo.id);
    toast.success('Todo deleted successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center justify-between p-4 bg-card text-card-foreground rounded-lg shadow-sm border border-l-4 ${getPriorityBorderColor(todo.priority)}`}
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="data-[state=checked]:bg-primary"
          />
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {todo.title}
              </span>
              <Badge variant="outline" className={getPriorityBadgeColor(todo.priority)}>
                {todo.priority}
              </Badge>
              {todo.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <span>Created {format(todo.createdAt, 'PPp')}</span>
              {todo.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className={isOverdue(todo.dueDate) ? 'text-destructive' : ''}>
                    Due {format(todo.dueDate, 'PPp')}
                  </span>
                </div>
              )}
              {todo.category && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>{todo.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {expanded && (
          <div className="pl-12 space-y-3">
            {todo.notes && (
              <div className="flex items-start gap-2 text-sm">
                <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                <p className="text-muted-foreground whitespace-pre-wrap">{todo.notes}</p>
              </div>
            )}

            {todo.dependencies.length > 0 && (
              <div className="flex items-start gap-2">
                <Link className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Dependencies: {todo.dependencies.join(', ')}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ListTodo className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Subtasks</span>
              </div>
              {todo.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2 pl-6">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => onToggleSubtask?.(todo.id, subtask.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <span className={`text-sm ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {subtask.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-auto"
                    onClick={() => onDeleteSubtask?.(todo.id, subtask.id)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => {
                  const title = prompt('Enter subtask title');
                  if (title) onAddSubtask?.(todo.id, title);
                }}
              >
                Add Subtask
              </Button>
            </div>
          </div>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-muted"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={handleDelete}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}