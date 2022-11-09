import { ItemStatusEnum } from './../models/ItemStatusEnum';
import { Item } from '@/models/Item'
import { defineStore } from 'pinia'
import { computed } from 'vue';

export const TodoStore = defineStore('todo', () => {
  
    const items: Item[] = [
      {
          description: "Test description 1",
          createdAt: new Date(),
          status: ItemStatusEnum.Active,
          isArchived: false
      },
      {
          description: "2",
          createdAt: new Date(),
          status: ItemStatusEnum.Done,
          isArchived: false
      },
      {
          description: "Test 3",
          createdAt: new Date(),
          status: ItemStatusEnum.Done,
          isArchived: false
      }
  ]

  const activeItems = computed(() => items.filter((x) => {
      return x.status === ItemStatusEnum.Active && !x.isArchived
  }))

  const doneItems = computed(() => items.filter((x) => {
    return x.status === ItemStatusEnum.Done && !x.isArchived
  }))

  const archivedItems = computed(() => items.filter((x) => {
    return x.isArchived
  }))

  return { items, activeItems, doneItems, archivedItems}
})