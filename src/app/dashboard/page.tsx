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

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <SearchForm />
          <AddEditForm className="ml-auto" />
        </header>
        <Tasks />
      </SidebarInset>
    </SidebarProvider>
  );
}
