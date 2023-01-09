import { TodoItem } from "@/models/TodoItem";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import { useStorage } from "@vueuse/core";

export const useTodoStore = defineStore(
  "todoStore",
  () => {
    const todos = ref([] as TodoItem[]);
    const todosArchive = ref([] as TodoItem[]);
    const openDialog = ref(false);

    const activeTodos = computed(() => {
      if (todos.value.length == 0) {
        return [];
      }
      return todos.value.filter((item) => {
        return item.active === true;
      });
    });

    const doneTodos = computed(() => {
      if (!todos.value) {
        console.log("Empty")
        return [];
      }
      return todos.value.filter((item) => {
        return item.active === false;
      });
    });

    const createNewItem = (payload: TodoItem) => {
      todos.value.push(payload);
      console.log("create")
    };

    const getTaskById = (id: string) => {
      return todos.value.find((item) => item.id === id);
    };

    const finishTask = (id: string) => {
      const targetTask = getTaskById(id);
      if (targetTask) {
        targetTask.active = false;
      }
    };

    const archiveAllTodos = () => {
      todos.value.forEach((el) => {
        todosArchive.value.push(el);
      });
      todos.value = [];
    };

    const handleDialog = () => {
      openDialog.value = !openDialog.value
    }

    // const deleteItem = () => {};

    return {
      todos,
      todosArchive,
      activeTodos,
      doneTodos,
      openDialog,
      createNewItem,
      archiveAllTodos,
      getTaskById,
      finishTask,
      handleDialog
    };
  },
  {
    persist: true,
  }
);
