import { ItemStatusEnum } from "./ItemStatusEnum";

export interface Item {
  id: number;
  description: string;
  createdAt: Date;
  status: ItemStatusEnum;
  isArchived: boolean;
}
