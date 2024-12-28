import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/dashboard/page';
import { useTaskStore } from '@/store/useTaskStore';

import { useForm } from 'react-hook-form';

jest.mock('@/store/useTaskStore', () => ({
  useTaskStore: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
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

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

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
      getTasks: jest.fn().mockResolvedValue([]),
    });

    (useForm as jest.Mock).mockReturnValue({
      reset: jest.fn(),
      formState: { errors: {} },
      handleSubmit: (fn: (data: unknown) => void) => fn,
      register: jest.fn(),
      control: {},
      setError: jest.fn(),
      clearErrors: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn(),
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
  });

  it('renders the Add Task button', () => {
    render(<Page />);
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('opens the add form when Add Task button is clicked', () => {
    render(<Page />);
    fireEvent.click(screen.getByText('Add Task'));
    expect(mockToggleFormOpen).toHaveBeenCalled();
  });
});
