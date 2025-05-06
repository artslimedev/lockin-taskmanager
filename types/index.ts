export type Status = "Open" | "In Progress" | "Completed" | "";

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: Status;
  created_at?: string;
  updated_at?: string;
  userId?: string;
}
