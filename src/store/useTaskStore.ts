import { create } from 'zustand';
import api from '@/core/services/api';

import { Task } from '@/core/entities/task';

interface TaskStore {
  tasks: Task[];
  formOpen: boolean;
  deleteDialogOpen: boolean;
  selectedTask: Task | null;
  searchQuery: string;
  statusFilter: 'all' | 'pending' | 'in-progress' | 'completed';
  importantFilter: boolean;

  setSelectTask: (Task: Task | null) => void;
  toggleFormOpen: () => void;
  toggleDeleteDialog: () => void;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: Task) => Promise<void>;
  getTasks: () => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (
    status: 'all' | 'pending' | 'in-progress' | 'completed'
  ) => void;
  setImportantFilter: (important: boolean) => void;
  getFilteredTasks: () => Task[];
  resetFilters: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  formOpen: false,
  deleteDialogOpen: false,
  selectedTask: null,
  searchQuery: '',
  statusFilter: 'all',
  importantFilter: false,

  setSelectTask: (task) => set({ selectedTask: task }),
  toggleFormOpen: () => set((state) => ({ formOpen: !state.formOpen })),
  toggleDeleteDialog: () =>
    set((state) => ({ deleteDialogOpen: !state.deleteDialogOpen })),
  getTasks: async () => {
    const response = await api.get('tasks');
    const tasks = response.data;
    set({ tasks });
  },
  addTask: async (task) => {
    const response = await api.post('/tasks', task);
    const newTask = response.data;
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  removeTask: async (id) => {
    await api.delete('/tasks');
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  updateTask: async (id, task) => {
    const response = await api.put('/tasks', task);
    const updatedTask = response.data;
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
    }));
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setImportantFilter: (important) => set({ importantFilter: important }),
  getFilteredTasks: (): Task[] => {
    const { tasks, searchQuery, statusFilter, importantFilter } =
      useTaskStore.getState();

    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;

      const matchesImportant = !importantFilter || task.important;

      return matchesSearch && matchesStatus && matchesImportant;
    });
  },
  resetFilters: () =>
    set({
      searchQuery: '',
      statusFilter: 'all',
      importantFilter: false,
    }),
}));
