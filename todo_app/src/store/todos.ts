import { TodoItem } from "@/models/TodoItem";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodoStore = defineStore(
  "todoStore",
  () => {
    const todos = ref([] as TodoItem[]);
    const todosArchive = ref([] as TodoItem[]);
    const filteredTodos = ref([] as TodoItem[]);
    const selectedTodo = ref({} as TodoItem);
    const openDialog = ref(false);
    const showDialogEditElements = ref(false);

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
        return [];
      }
      return todos.value.filter((item) => {
        return item.active === false;
      });
    });

    const createTask = (item: TodoItem) => {
      todos.value.push(item);
    };

    const getTaskById = (id: string) => {
      const task = todos.value.find((item) => item.id === id) || {} as TodoItem;
      return task;
    };

    const getTaskByIdFromArchive = (id: string) => {
      return todosArchive.value.find((item) => item.id === id) || {} as TodoItem;
    };

    const finishTask = (id: string) => {
      const targetTask = getTaskById(id);
      if (targetTask) {
        targetTask.active = false;
      }
    };

    const editTask = (item: TodoItem) => {
      const targetTask = getTaskById(item.id);
      if(targetTask){
        const targetTaskIndex = todos.value.indexOf(targetTask);
        if (targetTaskIndex > -1) {
          todos.value[targetTaskIndex] = item;
        }
      }
    };

    const archiveAllTodos = () => {
      todos.value.forEach((el) => {
        todosArchive.value.push(el);
      });
      todos.value = [];
    };

    const archiveSingleTodo = (id: string) => {
      const targetTask = getTaskById(id);
      if (targetTask) {
        todosArchive.value.push(targetTask);
        const targetTaskIndex = todos.value.indexOf(targetTask);
        if (targetTaskIndex > -1) {
          todos.value.splice(targetTaskIndex, 1);
        }
      }
    };

    const deleteTodoFromArhive = (id: string) => {
      const targetTask = getTaskByIdFromArchive(id);
      if (targetTask) {
        const targetTaskIndex = todosArchive.value.indexOf(targetTask);
        if (targetTaskIndex > -1) {
          todosArchive.value.splice(targetTaskIndex, 1);
        }
      }
    };

    const restoreTodoFromArchive = (id: string) => {
      const targetTask = getTaskByIdFromArchive(id);
      if (targetTask) {
        todos.value.push(targetTask);
        const targetTaskIndex = todosArchive.value.indexOf(targetTask);
        if (targetTaskIndex > -1) {
          todosArchive.value.splice(targetTaskIndex, 1);
        }
      }
    };

    const handleDialog = () => {
      openDialog.value = !openDialog.value;
    };

    const filterTodos = (searchParam: string) => {
        filteredTodos.value = computed(()=>{
          return todos.value.filter((item) => {
            return item.name.includes(searchParam);
          });
        }).value
    };

    return {
      todos,
      todosArchive,
      activeTodos,
      selectedTodo,
      doneTodos,
      filteredTodos,
      openDialog,
      showDialogEditElements,
      createTask,
      editTask,
      archiveAllTodos,
      archiveSingleTodo,
      deleteTodoFromArhive,
      restoreTodoFromArchive,
      getTaskById,
      getTaskByIdFromArchive,
      finishTask,
      handleDialog,
      filterTodos
    };
  },
  {
    persist: true,
  }
);
