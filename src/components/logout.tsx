import * as React from 'react';
import { useState, useEffect } from 'react';
import { AuthService } from '@/core/services/auth.service';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';

const LogoutButton = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timeoutId, setTimeoutId] = useState<number>();

  const handleLogout = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      setCountdown(3);
      const id = window.setTimeout(() => {
        setIsConfirming(false);
        setCountdown(3);
      }, 3000);
      setTimeoutId(id);
    } else {
      if (timeoutId) window.clearTimeout(timeoutId);
      await AuthService.logout();
      redirect('/login');
    }
  };

  useEffect(() => {
    if (isConfirming) {
      const intervalId = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        window.clearInterval(intervalId);
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }
  }, [isConfirming, timeoutId]);

  return (
    <Button className="m-4" onClick={handleLogout} variant="outline">
      {isConfirming ? `Click again to confirm (${countdown})` : 'Logout'}
    </Button>
  );
};

export default LogoutButton;
