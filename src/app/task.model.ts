interface TaskModel {
  id: number | null;
  description: string;
  completed: boolean;
  deadline: string;
  priority: Priority;
}
