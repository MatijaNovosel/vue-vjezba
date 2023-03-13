import { randInt } from "@/utils/helpers";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { Task, TasksState } from "../interfaces/Interfaces";

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

  const archiveAllActive = () => {
    state.tasks.forEach((task) => {
      if (task.done == false) task.deleted = true;
    });
    updateTaskListData();
  };

  const archiveAllDone = () => {
    state.tasks.forEach((task) => {
      if (task.done == true) task.deleted = true;
    });
    updateTaskListData();
  };

  const filterNotDoneTasks = (searchTerm: string): Task[] => {
    return state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.deleted &&
        !task.done
    );
  };

  const filterDeletedTasks = (searchTerm: string): Task[] => {
    return state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        task.deleted &&
        !task.done
    );
  };

  const filterInactiveTasks = (searchTerm: string): Task[] => {
    return state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.deleted &&
        task.done
    );
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

  const notDoneTasks = computed(() => {
    const filtered = state.tasks.filter((task) => !task.done && !task.deleted);
    console.log("filtriran", filtered);
    return filtered;
  });

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
    activeTasks,
    archiveAllActive,
    archiveAllDone,
    changeLanguage,
    closeEditModal,
    doneTasks,
    currentLanguage,
    confirmChanges,
    notDoneTasks,
    filterInactiveTasks,
    deletedTasks,
    filterDeletedTasks,
    restoreTask,
    filterNotDoneTasks,
    state,
    markAsDone,
    openTaskDialog,
    deleteTask
  };
});
