import { ItemStatusEnum } from "./../models/ItemStatusEnum";
import { Item } from "@/models/Item";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const active = ref(true);
  const archived = ref(false);
  const searchString = ref("");
  const items = ref<Item[]>([]);

  JSON.parse(localStorage.getItem("items") || "[]").forEach((element: any) => {
    let item: Item = {
      id: element.id,
      description: element.description,
      createdAt: new Date(element.createdAt),
      status: element.status,
      isArchived: element.isArchived
    };
    items.value.push(item);
  });

  const filteredItems = computed(() =>
    items.value.filter((x) => {
      return (
        (archived.value
          ? x.isArchived
          : (active.value
              ? x.status === ItemStatusEnum.Active
              : x.status === ItemStatusEnum.Done) && !x.isArchived) &&
        x.description.toLowerCase().includes(searchString.value.toLowerCase())
      );
    })
  );

  function addItem(item: Item) {
    items.value.push(item);
    localStorage.setItem("items", JSON.stringify(items.value));
  }

  function updateItem(item: Item) {
    let index = items.value.findIndex((x) => x.id === item.id);
    items.value.splice(index, 1, item);
    localStorage.setItem("items", JSON.stringify(items.value));
  }

  const changeFlag = (name: string) => {
    switch (name) {
      case "active":
        active.value = true;
        archived.value = false;
        break;
      case "done":
        active.value = false;
        archived.value = false;
        break;
      case "archived":
        archived.value = true;
        break;
    }
  };

  const archiveAll = () => {
    items.value.map(function (x) {
      x.isArchived = true;
      return x;
    });
    localStorage.setItem("items", JSON.stringify(items.value));
  };

  function unarchiveItem(item: Item) {
    let element = items.value.find((x) => x === item);
    if (element) {
      element.isArchived = false;
    }
    localStorage.setItem("items", JSON.stringify(items.value));
  }

  function finishTask(item: Item) {
    let element = items.value.find((x) => x === item);
    if (element) {
      element.status = ItemStatusEnum.Done;
    }
    localStorage.setItem("items", JSON.stringify(items.value));
  }

  return {
    filteredItems,
    active,
    searchString,
    addItem,
    changeFlag,
    archiveAll,
    finishTask,
    unarchiveItem,
    updateItem
  };
});
