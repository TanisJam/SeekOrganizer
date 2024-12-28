import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '@/app/dashboard/page';
import { useTaskStore } from '@/store/useTaskStore';
import { toast } from 'sonner';

jest.mock('@/store/useTaskStore', () => ({
  useTaskStore: jest.fn(),
}));
jest.mock('sonner');

describe('Page Component', () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockRemoveTask = jest.fn();
  const mockToggleFormOpen = jest.fn();
  const mockToggleDeleteDialog = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
      updateTask: mockUpdateTask,
      removeTask: mockRemoveTask,
      tasks: [],
      formOpen: false,
      toggleFormOpen: mockToggleFormOpen,
      selectedTask: null,
      setSelectTask: jest.fn(),
      deleteDialogOpen: false,
      toggleDeleteDialog: mockToggleDeleteDialog,
      getFilteredTasks: jest.fn().mockReturnValue([]),
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
  });

  xit('renders the Add Task button', () => {
    render(<Page />);
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  xit('opens the add form when Add Task button is clicked', () => {
    render(<Page />);
    fireEvent.click(screen.getByText('Add Task'));
    expect(mockToggleFormOpen).toHaveBeenCalled();
  });

  xit('submits the add task form', async () => {
    render(<Page />);
    fireEvent.click(screen.getByText('Add Task'));

    // Assuming the form fields have placeholder texts
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Task' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith({
        title: 'Test Task',
        description: '',
        important: false,
        status: undefined,
      });
      expect(toast.success).toHaveBeenCalledWith('Task added');
    });
  });

  xit('handles task deletion', async () => {
    (useTaskStore as jest.Mock).mockReturnValue({
      ...useTaskStore(),
      selectedTask: { id: 1, title: 'Task 1' },
    });

    render(<Page />);
    fireEvent.click(screen.getByText('Delete'));

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockRemoveTask).toHaveBeenCalledWith(1);
      expect(toast.success).toHaveBeenCalledWith('Task deleted');
      expect(mockToggleDeleteDialog).toHaveBeenCalled();
    });
  });
});
