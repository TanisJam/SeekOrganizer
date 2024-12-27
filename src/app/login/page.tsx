'use client';

import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/login-form';
import { AuthService } from '@/core/services/auth.service';
import { useEffect } from 'react';

export default function Page() {
  const isAuthenticated = AuthService.isAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      redirect('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
