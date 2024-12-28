import { fakeDelay } from '@/lib/mockUtils';
import { NextResponse } from 'next/server';

const tokenMock =
  'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImVtYWlsQGVtYWlsLmNvbSIsImV4cCI6MTczNTMyODcwNSwiaWF0IjoxNzM1MzI4NzA1fQ.rTrUl9lzJUtLbEBjA59o50VEeZbZB0_dOjaYmZ5d768';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await fakeDelay();

  if (email === 'email@email.com' && password === 'password') {
    return new NextResponse(JSON.stringify({ token: tokenMock }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}
