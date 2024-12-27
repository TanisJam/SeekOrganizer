export interface Task {
  id: number;
  title: string;
  description: string;
  important: boolean;
  status: 'pending' | 'in-progress' | 'completed';
}
