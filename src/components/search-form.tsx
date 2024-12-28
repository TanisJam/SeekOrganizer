'use client';
import { useTaskStore } from '@/store/useTaskStore';
import { Search, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  const { searchQuery, setSearchQuery } = useTaskStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const debouncedSearch = useCallback(
    (value: string) => {
      debounce((searchValue: string) => {
        setSearchQuery(searchValue);
      }, 300)(value);
    },
    [setSearchQuery]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="pl-8 pr-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          {localSearch && (
            <Button
              type="button"
              variant="ghost"
              className="absolute right-1 top-1/2 size-6 -translate-y-1/2 p-0 hover:bg-transparent"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <X className="size-4" />
            </Button>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
