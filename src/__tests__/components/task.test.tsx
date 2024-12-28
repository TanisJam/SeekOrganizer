import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tasks } from '@/app/dashboard/tasks';
import { useTaskStore } from '@/store/useTaskStore';

jest.mock('@/store/useTaskStore', () => ({
  useTaskStore: jest.fn(),
}));

describe('Tasks Component', () => {
  const mockGetTasks = jest.fn();
  const mockSetSelectTask = jest.fn();
  const mockToggleFormOpen = jest.fn();
  const mockToggleDeleteDialog = jest.fn();
  const mockGetFilteredTasks = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockTasks = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        important: false,
      },
    ];

    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      getTasks: mockGetTasks,
      setSelectTask: mockSetSelectTask,
      toggleFormOpen: mockToggleFormOpen,
      toggleDeleteDialog: mockToggleDeleteDialog,
      getFilteredTasks: mockGetFilteredTasks.mockReturnValue(mockTasks),
    });
  });

  it('calls getTasks on mount', () => {
    render(<Tasks />);
    expect(mockGetTasks).toHaveBeenCalled();
  });

  it('renders task cards for filtered tasks', () => {
    render(<Tasks />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders skeleton cards when tasks array is empty', () => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: [],
      getTasks: mockGetTasks,
      setSelectTask: mockSetSelectTask,
      toggleFormOpen: mockToggleFormOpen,
      toggleDeleteDialog: mockToggleDeleteDialog,
      getFilteredTasks: mockGetFilteredTasks.mockReturnValue([]),
    });

    render(<Tasks />);
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(9);
  });

  it('handles edit button click', () => {
    render(<Tasks />);
    const editButton = screen.getByTestId('edit-task');
    fireEvent.click(editButton);

    expect(mockSetSelectTask).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      important: false,
    });
    expect(mockToggleFormOpen).toHaveBeenCalled();
  });

  it('handles delete button click', () => {
    render(<Tasks />);
    const deleteButton = screen.getByTestId('delete-task');
    fireEvent.click(deleteButton);

    expect(mockSetSelectTask).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      important: false,
    });
    expect(mockToggleDeleteDialog).toHaveBeenCalled();
  });
});
