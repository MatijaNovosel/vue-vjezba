import { ItemStatusEnum } from "./ItemStatusEnum"

export interface Item {
    description: string,
    createdAt: Date,
    status: ItemStatusEnum
    isArchived: boolean
}