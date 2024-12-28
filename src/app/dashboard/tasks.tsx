'use client';
import SkeletonCard from '@/components/skeleton-card';
import { TaskCard } from '@/components/task-card';

import { useTaskStore } from '@/store/useTaskStore';
import { useEffect } from 'react';

export function Tasks() {
  const {
    tasks,
    getTasks,
    setSelectTask,
    toggleFormOpen,
    toggleDeleteDialog,
    getFilteredTasks,
  } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const filteredTasks = getFilteredTasks();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min mx-auto md:mx-0 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            important={task.important}
            onEdit={() => {
              setSelectTask(task);
              toggleFormOpen();
            }}
            onDelete={() => {
              setSelectTask(task);
              toggleDeleteDialog();
            }}
          />
        ))}
        {tasks.length === 0 &&
          Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </div>
  );
}
