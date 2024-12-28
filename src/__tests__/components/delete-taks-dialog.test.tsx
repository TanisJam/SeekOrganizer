import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteTaskDialog } from '@/components/delete-taks-dialog';

describe('DeleteTaskDialog', () => {
  const mockHandleCancel = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog content when open', () => {
    render(
      <DeleteTaskDialog
        open={true}
        handleCancel={mockHandleCancel}
        onDelete={mockOnDelete}
        loading={false}
      />
    );

    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This action cannot be undone. This will permanently delete the task.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls handleCancel when Cancel button is clicked', () => {
    render(
      <DeleteTaskDialog
        open={true}
        handleCancel={mockHandleCancel}
        onDelete={mockOnDelete}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <DeleteTaskDialog
        open={true}
        handleCancel={mockHandleCancel}
        onDelete={mockOnDelete}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('disables Delete button when loading', () => {
    render(
      <DeleteTaskDialog
        open={true}
        handleCancel={mockHandleCancel}
        onDelete={mockOnDelete}
        loading={true}
      />
    );

    expect(screen.getByText('Delete').closest('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(
      <DeleteTaskDialog
        open={true}
        handleCancel={mockHandleCancel}
        onDelete={mockOnDelete}
        loading={true}
      />
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
