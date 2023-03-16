import { randInt } from "@/utils/helpers";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { Task, TasksState } from "../models/Index";

export const useTasksStore = defineStore("tasks", () => {
  const state: TasksState = reactive({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    searchTerm: "",
    editModal: false,
    newTaskId: -1,
    newTask: {
      description: "",
      title: ""
    },
    lang: "en"
  });

  const updateTaskListData = () => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  };

  const openTaskDialog = (task?: Task) => {
    if (task !== undefined) {
      state.newTask = {
        title: task.title,
        description: task.description
      };
      state.newTaskId = task.id;
    }
    state.editModal = true;
  };

  const confirmChanges = () => {
    if (state.newTaskId === -1) {
      state.tasks.push({
        createdAt: new Date().toISOString(),
        deleted: false,
        description: state.newTask.description,
        title: state.newTask.title,
        id: randInt(1, 9999),
        done: false
      });
    } else {
      const idx = state.tasks.findIndex((t) => t.id === state.newTaskId);
      state.tasks[idx].title = state.newTask.title;
      state.tasks[idx].description = state.newTask.description;
    }
    closeEditModal();
    updateTaskListData();
  };

  const deleteTask = (task: Task) => {
    task.deleted = true;
    updateTaskListData();
  };

  const markAsDone = (task: Task) => {
    task.done = true;
    updateTaskListData();
  };

  const restoreTask = (task: Task) => {
    task.deleted = false;
    updateTaskListData();
  };

  const changeLanguage = (lang: string) => {
    if (state.lang !== lang) {
      state.lang = lang;
    }
  };

  const hideConfirmDialog = () => {
    state.confirmModal = false;
  };

  const showConfirmModal = () => {
    state.confirmModal = !state.confirmModal;
  };

  const archiveAll = (taskList: Task[]) => {
    taskList.forEach((task) => (task.deleted = true));
    updateTaskListData();
    hideConfirmDialog();
  };
  const filterTasks = (tasks: Task[]): Task[] => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  };

  const setSearchTerm = (searchTerm: string) => {
    state.searchTerm = searchTerm;
  };

  const closeEditModal = () => {
    state.editModal = false;
    state.newTaskId = -1;
    state.newTask = {
      description: "",
      title: ""
    };
  };

  const currentLanguage = () => {
    return state.lang;
  };

  const deletedTasks = computed(() => {
    return state.tasks.filter((task) => task.deleted);
  });

  const doneTasks = computed(() => {
    return state.tasks.filter((task) => task.done && !task.deleted);
  });

  const activeTasks = computed(() => {
    return state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        !task.deleted &&
        !task.done
    );
  });

  return {
    setSearchTerm,
    archiveAll,
    hideConfirmDialog,
    activeTasks,
    changeLanguage,
    closeEditModal,
    doneTasks,
    currentLanguage,
    confirmChanges,
    deletedTasks,
    restoreTask,
    filterTasks,
    state,
    markAsDone,
    openTaskDialog,
    deleteTask,
    showConfirmModal
  };
});
