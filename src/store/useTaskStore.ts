import { create } from 'zustand';
import api from '@/core/services/api';

import { Task } from '@/core/entities/task';

interface TaskStore {
  tasks: Task[];
  formOpen: boolean;
  deleteDialogOpen: boolean;
  selectedTask: Task | null;
  setSelectTask: (Task: Task | null) => void;
  toggleFormOpen: () => void;
  toggleDeleteDialog: () => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, task: Task) => void;
  getTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  formOpen: false,
  deleteDialogOpen: false,
  selectedTask: null,
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
}));
