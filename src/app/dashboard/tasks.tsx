'use client';
import { TaskCard } from '@/components/task-card';
import { useTaskStore } from '@/store/useTaskStore';
import { useEffect } from 'react';

export function Tasks() {
  const loadTasks = useTaskStore((state) => state.getTasks);
  const tasks = useTaskStore((state) => state.tasks);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            important={task.important}
          />
        ))}
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
