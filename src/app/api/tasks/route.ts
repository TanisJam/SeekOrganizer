import { NextResponse } from 'next/server';
import { generateId } from '@/lib/generateId';
import { Task } from '@/core/entities/task';

const tasksMock: Task[] = [
  {
    id: 1,
    title: 'Create a new project',
    description: 'Create a new project using React and TypeScript',
    important: true,
    status: 'pending' as const,
  },
  {
    id: 2,
    title: 'Create a new component',
    description: 'Create a new component for the project',
    important: false,
    status: 'in-progress' as const,
  },
  {
    id: 3,
    title: 'Update the project',
    description: 'Update the project with new features',
    important: true,
    status: 'completed' as const,
  },
];

const verifyToken = (req: Request) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return new NextResponse('Not Authorized', { status: 401 });
  }
  return null;
};

export async function GET(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  return NextResponse.json(tasksMock);
}

export async function POST(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  const task = req.body;
  const newTask = { ...task, id: generateId() };
  return NextResponse.json(newTask);
}
export async function PUT(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  return NextResponse.json(req.body);
}

export async function DELETE(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  return new NextResponse(null, { status: 204 });
}
