import { create } from 'zustand';
import api from '@/core/services/api';

import { Task } from '@/core/entities/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, task: Task) => void;
  getTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
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
    await api.delete(`/tasks/${id}`);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  updateTask: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    const updatedTask = response.data;
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
    }));
  },
}));
