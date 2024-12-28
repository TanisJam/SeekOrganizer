import * as React from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { Home, Clock, Play, Check, CircleAlert } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import LogoutButton from './logout';

const filters = [
  {
    title: 'All Tasks',
    filter: 'all' as const,
    icon: <Home />,
  },
  {
    title: 'Pending',
    filter: 'pending' as const,
    icon: <Clock />,
  },
  {
    title: 'In Progress',
    filter: 'in-progress' as const,
    icon: <Play />,
  },
  {
    title: 'Completed',
    filter: 'completed' as const,
    icon: <Check />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setStatusFilter, setImportantFilter, statusFilter, importantFilter } =
    useTaskStore();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold">Seek Organizer</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filters.map((filter) => (
              <SidebarMenuItem key={filter.title}>
                <SidebarMenuButton
                  asChild
                  isActive={filter.filter === statusFilter}
                >
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      if (filter.filter === statusFilter) {
                        setImportantFilter(false);
                      }
                      setStatusFilter(filter.filter);
                    }}
                  >
                    {filter.icon}
                    {filter.title}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={importantFilter}>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setImportantFilter(!importantFilter);
                  }}
                >
                  <CircleAlert />
                  Important
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <LogoutButton />
      <SidebarRail />
    </Sidebar>
  );
}
