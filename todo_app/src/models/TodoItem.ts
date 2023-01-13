export interface TodoItem {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  active: boolean;
  isArchived: boolean;
}
