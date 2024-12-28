import * as React from 'react';
import {
  Home,
  Clock,
  Check,
  CircleAlert,
  LayoutGrid,
  List,
} from 'lucide-react';

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
    icon: <Home />,
    isActive: true,
  },
  {
    title: 'Pending',
    icon: <Clock />,
  },
  {
    title: 'Completed',
    icon: <Check />,
  },
  {
    title: 'Important',
    icon: <CircleAlert />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold">Seek Organizer</h1>
        <h3 className="text-sm font-normal">View</h3>
        <div className="flex gap-2 ">
          <Button className="w-full">
            <LayoutGrid />
            Grid
          </Button>
          <Button className="w-full">
            <List />
            List
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <h3 className="text-sm font-normal">Filters</h3>
          <SidebarMenu>
            {filters.map((filter) => (
              <SidebarMenuItem key={filter.title}>
                <SidebarMenuButton asChild isActive={filter.isActive}>
                  <Button variant="ghost" className="justify-start">
                    {filter.icon}
                    {filter.title}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <LogoutButton />
      <SidebarRail />
    </Sidebar>
  );
}
