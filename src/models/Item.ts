import { ItemStatusEnum } from "./ItemStatusEnum";

export interface Item {
  id: number;
  description: string;
  createdAt: string;
  status: ItemStatusEnum;
  isArchived: boolean;
}
