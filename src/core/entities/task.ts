export interface Task {
  id: string;
  title: string;
  description: string;
  important: boolean;
  status: 'pending' | 'in-progress' | 'completed';
}
