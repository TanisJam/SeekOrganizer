import { NextResponse } from 'next/server';
import { generateId } from '@/lib/generateId';
import { Task } from '@/core/entities/task';
import { fakeDelay } from '@/lib/mockUtils';

const tasksMock: Task[] = [
  {
    id: '1',
    title: 'Create a new project',
    description:
      'Start a new project using React and TypeScript to enhance user experience.',
    important: true,
    status: 'pending' as const,
  },
  {
    id: '2',
    title: 'Develop a navigation component',
    description:
      'Create a navigation component that allows users to move between different sections of the project.',
    important: true,
    status: 'in-progress' as const,
  },
  {
    id: '3',
    title: 'Implement user authentication',
    description:
      'Add a user authentication system so users can register and access their accounts.',
    important: true,
    status: 'pending' as const,
  },
  {
    id: '4',
    title: 'Optimize project performance',
    description:
      'Make improvements to the project’s performance to ensure faster load times.',
    important: false,
    status: 'completed' as const,
  },
  {
    id: '5',
    title: 'Create a contact page',
    description:
      'Develop a contact page that allows users to send inquiries and feedback.',
    important: false,
    status: 'in-progress' as const,
  },
  {
    id: '6',
    title: 'Update project documentation',
    description:
      'Review and update the documentation to reflect recent changes in the project.',
    important: true,
    status: 'completed' as const,
  },
  {
    id: '7',
    title: 'Conduct user testing',
    description:
      'Organize user testing sessions to gather feedback on the interface and usability.',
    important: true,
    status: 'pending' as const,
  },
  {
    id: '8',
    title: 'Create a reusable form component',
    description: 'Develop a reusable form component for user data input.',
    important: false,
    status: 'in-progress' as const,
  },
  {
    id: '9',
    title: 'Integrate third-party API',
    description:
      'Connect the project with an external API to fetch real-time data.',
    important: true,
    status: 'pending' as const,
  },
  {
    id: '10',
    title: 'Review and refactor code',
    description:
      'Conduct a review of the existing code and apply refactoring where necessary to improve quality.',
    important: true,
    status: 'in-progress' as const,
  },
  {
    id: '11',
    title: 'Set up production environment',
    description:
      'Prepare and configure the production environment for project deployment.',
    important: true,
    status: 'pending' as const,
  },
  {
    id: '12',
    title: 'Create a notification system',
    description:
      'Implement a notification system to keep users informed about important updates.',
    important: false,
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

  await fakeDelay();
  return NextResponse.json(tasksMock);
}

export async function POST(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  await fakeDelay();
  const task = await req.json();
  const newTask = { ...task, id: generateId() };
  return NextResponse.json(newTask);
}

export async function PUT(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  await fakeDelay();
  const task = await req.json();
  return NextResponse.json(task);
}

export async function DELETE(req: Request) {
  const authError = verifyToken(req);
  if (authError) return authError;

  await fakeDelay();
  return new NextResponse(null, { status: 204 });
}
