import { TodoItem } from "@/models/TodoItem";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodoStore = defineStore({
  id: "todoStore",
  state: () =>
    ({
      todos: useStorage("todos", [] as TodoItem[]),
    }),
  actions: {
    createNewItem(item: TodoItem) {
      if (!item) return;
      this.todos.push(item);
    },

    //   updateItem(id: string, payload: TodoItem) {
    //     if (!id || !payload) return;

    //     const index = this.findIndexById(id);

    //     if (index !== -1) {
    //       this.items[index] = generateFakeData();
    //     }
    //   },

    deleteItem(id: string) {
      const targetTaskIndex:number = this.todos.findIndex((item) => item.id === id);

      this.todos.splice(targetTaskIndex, 1);
    },

    finishTask(id: string) {
      //@ts-ignore
      const targetTask:TodoItem = this.todos.find((item) => item.id === id);
      targetTask.active = false;
    },
  },
});
