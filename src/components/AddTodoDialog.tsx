'use client';

import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddTodoDialogProps, Priority } from '@/types/todo';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function AddTodoDialog({ open, onOpenChange, onAdd }: AddTodoDialogProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<Date>();
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority, dueDate, category);
      setTitle('');
      setPriority('medium');
      setDueDate(undefined);
      setCategory('');
      onOpenChange(false);
      toast.success('Todo added successfully');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full fixed bottom-6 right-6 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full p-2 border rounded-md bg-background"
            autoFocus
          />
          <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low" className="text-muted-foreground">Low Priority</SelectItem>
              <SelectItem value="medium" className="text-primary">Medium Priority</SelectItem>
              <SelectItem value="high" className="text-destructive">High Priority</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, 'PPP') : <span>Pick a due date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Add a category (optional)"
            className="w-full p-2 border rounded-md bg-background"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Add Todo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}