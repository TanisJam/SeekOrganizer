'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SearchForm } from '@/components/search-form';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Tasks } from './tasks';
import { AddEditForm } from '@/components/add-edit-form';
import { TaskFormValuesTypes, TaskSchema } from '@/types/add-edit-form';
import { useTaskStore } from '@/store/useTaskStore';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { DeleteTaskDialog } from '@/components/delete-taks-dialog';

export default function Page() {
  const [loading, setLoading] = useState(false);

  const {
    addTask,
    formOpen,
    toggleFormOpen,
    selectedTask,
    setSelectTask,
    updateTask,
    deleteDialogOpen,
    toggleDeleteDialog,
    removeTask,
  } = useTaskStore();

  const form = useForm<TaskFormValuesTypes>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      important: false,
    },
  });

  useEffect(() => {
    form.reset({
      title: '',
      important: false,
    });
    if (selectedTask?.id) {
      const editTask = {
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        important: selectedTask.important,
      };
      form.reset(editTask);
    }
  }, [selectedTask, form]);

  const handleCancel = () => {
    setSelectTask(null);
    form.reset();
    toggleFormOpen();
  };

  const handleRemove = async () => {
    setLoading(true);
    if (selectedTask?.id) {
      await removeTask(selectedTask.id);
    }
    setLoading(false);
    toggleDeleteDialog();
  };

  const onSubmit = form.handleSubmit(async (values: TaskFormValuesTypes) => {
    setLoading(true);
    const newTask = {
      title: values.title,
      description: values.description,
      important: values.important ?? false,
      status: values.status,
    };
    if (selectedTask?.id) {
      await updateTask(selectedTask.id, { ...newTask, id: selectedTask.id });
    } else {
      await addTask(newTask);
    }
    setLoading(false);
    form.reset();
    toggleFormOpen();
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <SearchForm />
          <Button
            className="ml-auto"
            onClick={() => {
              setSelectTask(null);
              form.reset();
              toggleFormOpen();
            }}
          >
            <Plus /> Add Task
          </Button>
          <AddEditForm
            onSubmit={onSubmit}
            open={formOpen}
            handleCancel={handleCancel}
            form={form}
            selectedTask={selectedTask}
            loading={loading}
          />
          <DeleteTaskDialog
            open={deleteDialogOpen}
            handleCancel={toggleDeleteDialog}
            onDelete={handleRemove}
            loading={loading}
          />
        </header>
        <Tasks />
      </SidebarInset>
    </SidebarProvider>
  );
}
