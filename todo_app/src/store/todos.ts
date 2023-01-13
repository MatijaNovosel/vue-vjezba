import { TodoItem } from "@/models/TodoItem";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export const useTodoStore = defineStore(
  "todoStore",
  () => {
    const todos = ref<TodoItem[]>([]);
    const selectedTodo = ref<TodoItem>({} as TodoItem);
    const openDialog = ref(false);
    const showDialogEditElements = ref(false);
    const searchValue = ref("");
    const route = useRoute();

    const showTodoItems = computed(() => {
      const { state } = route.params;
      const showArchivedTasks = state === "archived";
      const showActiveTasks = state === "active";

      return todos.value.filter((item) => {
        const searchInputExist = searchValue.value
          ? item.name.includes(searchValue.value)
          : true;
        return showArchivedTasks
          ? item.isArchived && searchInputExist
          : showActiveTasks
          ? item.active && !item.isArchived && searchInputExist
          : !item.active && !item.isArchived && searchInputExist;
      });
    });

    const createTask = (item: TodoItem) => {
      todos.value.push(item);
    };

    const getTaskById = (id: string) => {
      const task =
        todos.value.find((item) => item.id === id) || ({} as TodoItem);
      return task;
    };

    const finishTask = (id: string) => {
      const targetTask = getTaskById(id);
      if (targetTask) {
        targetTask.active = false;
      }
    };

    const editTask = (item: TodoItem) => {
      const targetTask = getTaskById(item.id);
      if (targetTask) {
        const targetTaskIndex = todos.value.indexOf(targetTask);
        if (targetTaskIndex > -1) {
          todos.value[targetTaskIndex] = item;
        }
      }
    };

    const archiveAllTodos = () => {
      todos.value.forEach((todo) => {
        todo.isArchived = true;
      });
    };

    const archiveSingleTodo = (id: string) => {
      const targetTask = getTaskById(id);
      if (targetTask) {
        targetTask.isArchived = true;
      }
    };

    const deleteTodoFromArhive = (id: string) => {
      const targetTaskIndex = todos.value.findIndex((todo) => todo.id === id);
      if (targetTaskIndex > -1) {
        todos.value.splice(targetTaskIndex, 1);
      }
    };

    const restoreTodoFromArchive = (id: string) => {
      const targetTask = getTaskById(id);
      if (targetTask) {
        targetTask.isArchived = false;
      }
    };

    const handleDialog = () => {
      openDialog.value = !openDialog.value;
    };

    const copySelectedTask = (id: string) => {
      selectedTodo.value = JSON.parse(JSON.stringify(getTaskById(id)));
    };

    return {
      todos,
      selectedTodo,
      openDialog,
      showDialogEditElements,
      searchValue,
      showTodoItems,
      createTask,
      editTask,
      archiveAllTodos,
      archiveSingleTodo,
      deleteTodoFromArhive,
      restoreTodoFromArchive,
      finishTask,
      handleDialog,
      copySelectedTask,
    };
  },
  {
    persist: true,
  }
);
