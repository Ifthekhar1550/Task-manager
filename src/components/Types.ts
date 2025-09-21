export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'canceled';
  priority: 'low' | 'medium' | 'high';
  type: 'bug' | 'feature' | 'documentation';
}