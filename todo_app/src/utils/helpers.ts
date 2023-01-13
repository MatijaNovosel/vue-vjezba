import { TodoItem } from "@/models/TodoItem";

const createDebounce = () => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (fn: Function, delayMs: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, delayMs || 500);
  };
};

const randomId = () => {
  return "id_" + Math.random().toString(16).slice(2);
};

const generateUniqueId = (existingListOfTasks: TodoItem[]) => {
  const id = randomId();
  for (const task of existingListOfTasks) {
    if (task.id === id) {
      generateUniqueId(existingListOfTasks);
    }
  }
  return id;
};

const getCurrentDateInCustomFormat = () => {
  const today = new Date();
  return  `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours().toString().length > 1 ? "" : "0"}${today.getHours()}:${today.getMinutes().toString().length > 1 ? "" : "0"}${today.getMinutes()}`;
};

export { createDebounce, generateUniqueId, getCurrentDateInCustomFormat };
