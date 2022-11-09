import { ItemStatusEnum } from './../models/ItemStatusEnum';
import { Item } from '@/models/Item'
import { defineStore } from 'pinia'

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
          status: ItemStatusEnum.Active,
          isArchived: false
      },
      {
          description: "Test 3",
          createdAt: new Date(),
          status: ItemStatusEnum.Done,
          isArchived: false
      }
  ]

  function getActiveItems(route: string){
    switch(route){
      case("/active"):
        return items.filter((x) => {
          return x.status === ItemStatusEnum.Active && !x.isArchived
        })
      case("/done"):
        return items.filter((x) => {
          return x.status === ItemStatusEnum.Done && !x.isArchived
        })
      case("/archived"):
        return items.filter((x) => {
          return x.isArchived
        })
    }
  }

  return { items, getActiveItems}
})