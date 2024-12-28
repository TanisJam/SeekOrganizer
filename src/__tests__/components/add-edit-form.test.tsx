import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;
import { AddEditForm } from '@/components/add-edit-form';
import { useForm } from 'react-hook-form';
import { TaskFormValuesTypes, TaskSchema } from '@/types/add-edit-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@/core/entities/task';

const mockHandleCancel = jest.fn();
const mockOnSubmit = jest.fn();
function MockFormWrapper({
  selectedTask,
  loading,
}: {
  selectedTask?: Task | null;
  loading?: boolean;
}) {
  const mockForm = useForm<TaskFormValuesTypes>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      important: false,
    },
  });

  const defaultProps = {
    onSubmit: mockOnSubmit,
    open: true,
    handleCancel: mockHandleCancel,
    form: mockForm,
    selectedTask: null,
    loading: false,
  };

  return (
    <AddEditForm
      {...defaultProps}
      selectedTask={selectedTask}
      loading={loading || false}
    />
  );
}

describe('AddEditForm Component', () => {
  // const mockHandleCancel = jest.fn();
  // const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders add task form when no task is selected', () => {
    render(<MockFormWrapper />);
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('renders edit task form when task is selected', () => {
    const selectedTask = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending' as const,
      important: false,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    render(<MockFormWrapper selectedTask={selectedTask} />);
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByText('Update Task')).toBeInTheDocument();
  });

  it('disables buttons when loading', () => {
    render(<MockFormWrapper loading={true} />);
    expect(screen.getByText('Add Task').closest('button')).toBeDisabled();
    expect(screen.getByText('Cancel').closest('button')).toBeDisabled();
  });

  it('calls handleCancel when cancel button is clicked', () => {
    render(<MockFormWrapper />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandleCancel).toHaveBeenCalled();
  });

  it('renders form fields', () => {
    render(<MockFormWrapper />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Mark as important')).toBeInTheDocument();
  });

  it('submits form when submit button is clicked', () => {
    render(<MockFormWrapper />);
    fireEvent.submit(screen.getByRole('form'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
