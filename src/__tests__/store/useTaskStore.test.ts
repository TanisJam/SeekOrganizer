import { act } from '@testing-library/react';
import { useTaskStore } from '@/store/useTaskStore';
import api from '@/core/services/api';

jest.mock('@/core/services/api');

describe('TaskStore', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending' as const,
    important: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useTaskStore.setState({
      tasks: [],
      formOpen: false,
      deleteDialogOpen: false,
      selectedTask: null,
      searchQuery: '',
      statusFilter: 'all',
      importantFilter: false,
    });
  });

  describe('Basic State Actions', () => {
    it('should set selected task', () => {
      act(() => {
        useTaskStore.getState().setSelectTask(mockTask);
      });
      expect(useTaskStore.getState().selectedTask).toEqual(mockTask);
    });

    it('should toggle form open state', () => {
      act(() => {
        useTaskStore.getState().toggleFormOpen();
      });
      expect(useTaskStore.getState().formOpen).toBe(true);
    });

    it('should toggle delete dialog state', () => {
      act(() => {
        useTaskStore.getState().toggleDeleteDialog();
      });
      expect(useTaskStore.getState().deleteDialogOpen).toBe(true);
    });
  });

  describe('API Actions', () => {
    it('should fetch tasks', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({ data: [mockTask] });

      await act(async () => {
        await useTaskStore.getState().getTasks();
      });

      expect(api.get).toHaveBeenCalledWith('tasks');
      expect(useTaskStore.getState().tasks).toEqual([mockTask]);
    });

    it('should add task', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...newTask } = mockTask;

      (api.post as jest.Mock).mockResolvedValueOnce({ data: mockTask });

      await act(async () => {
        await useTaskStore.getState().addTask(newTask);
      });

      expect(api.post).toHaveBeenCalledWith('/tasks', newTask);
      expect(useTaskStore.getState().tasks).toEqual([mockTask]);
    });

    it('should update task', async () => {
      useTaskStore.setState({ tasks: [mockTask] });
      const updatedTask = { ...mockTask, title: 'Updated Task' };
      (api.put as jest.Mock).mockResolvedValueOnce({ data: updatedTask });

      await act(async () => {
        await useTaskStore.getState().updateTask(mockTask.id, updatedTask);
      });

      expect(api.put).toHaveBeenCalledWith('/tasks', updatedTask);
      expect(useTaskStore.getState().tasks).toContainEqual(updatedTask);
    });

    it('should remove task', async () => {
      useTaskStore.setState({ tasks: [mockTask] });

      await act(async () => {
        await useTaskStore.getState().removeTask(mockTask.id);
      });

      expect(api.delete).toHaveBeenCalledWith('/tasks');
      expect(useTaskStore.getState().tasks).toEqual([]);
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      useTaskStore.setState({
        tasks: [
          mockTask,
          { ...mockTask, id: '2', title: 'Important Task', important: true },
          { ...mockTask, id: '3', status: 'completed' as const },
        ],
      });
    });

    it('should filter by search query', () => {
      act(() => {
        useTaskStore.getState().setSearchQuery('Important');
      });

      const filtered = useTaskStore.getState().getFilteredTasks();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe('Important Task');
    });

    it('should filter by status', () => {
      act(() => {
        useTaskStore.getState().setStatusFilter('completed');
      });

      const filtered = useTaskStore.getState().getFilteredTasks();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('completed');
    });

    it('should filter by importance', () => {
      act(() => {
        useTaskStore.getState().setImportantFilter(true);
      });

      const filtered = useTaskStore.getState().getFilteredTasks();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].important).toBe(true);
    });

    it('should reset filters', () => {
      useTaskStore.setState({
        searchQuery: 'test',
        statusFilter: 'completed',
        importantFilter: true,
      });

      act(() => {
        useTaskStore.getState().resetFilters();
      });

      expect(useTaskStore.getState().searchQuery).toBe('');
      expect(useTaskStore.getState().statusFilter).toBe('all');
      expect(useTaskStore.getState().importantFilter).toBe(false);
    });
  });
});
