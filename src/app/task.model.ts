import {Priority} from './priority.enum';

export interface TaskModel {
  id: number | null;
  title: string;
  description: string;
  completed: boolean;
  deadline: string;
  priority: Priority;
}
