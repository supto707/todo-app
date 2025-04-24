'use client';

import Image from "next/image";
import { TodoProvider } from '@/contexts/TodoContext';
import { TodoList } from '@/components/TodoList';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <TodoProvider>
        <TodoList />
        <Toaster position="bottom-right" />
      </TodoProvider>
    </main>
  );
}