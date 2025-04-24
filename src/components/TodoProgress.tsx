'use client';

import { motion } from 'framer-motion';
import { TodoProgressProps } from '@/types/todo';

export function TodoProgress({ completed, total }: TodoProgressProps) {
  const progress = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Progress</span>
        <span>{completed}/{total} completed</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </div>
    </div>
  );
}