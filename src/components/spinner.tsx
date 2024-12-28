import { Loader } from 'lucide-react';

interface LoaderProps {
  isLoading: boolean;
}

export function Spinner({ isLoading }: LoaderProps) {
  if (isLoading) {
    return <Loader className="animate-spin" />;
  }
  return null;
}
