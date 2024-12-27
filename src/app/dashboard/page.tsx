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
import { TaskFormValuesTypes } from '@/types/add-edit-form';
import { useTaskStore } from '@/store/useTaskStore';
import { useState } from 'react';

export default function Page() {
  const { addTask } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (values: TaskFormValuesTypes) => {

    const newTask = {
      title: values.title,
      description: values.description,
      important: values.important ?? false,
      status: values.status,
    };
    addTask(newTask);
    setModalOpen(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <SearchForm />
          <AddEditForm
            className="ml-auto"
            onSubmit={onSubmit}
            open={modalOpen}
            handleOpen={setModalOpen}
          />
        </header>
        <Tasks />
      </SidebarInset>
    </SidebarProvider>
  );
}
