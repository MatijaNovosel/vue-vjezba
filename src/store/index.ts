import { ItemStatusEnum } from "./../models/ItemStatusEnum";
import { Item } from "@/models/Item";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const active = ref(true);
  const archived = ref(false);
  const searchString = ref("");

  const items = ref<Item[]>([
    {
      id: 1,
      description: "Test description 1",
      createdAt: new Date(),
      status: ItemStatusEnum.Active,
      isArchived: false
    },
    {
      id: 2,
      description: "2",
      createdAt: new Date(),
      status: ItemStatusEnum.Done,
      isArchived: false
    },
    {
      id: 3,
      description: "Test 3",
      createdAt: new Date(),
      status: ItemStatusEnum.Done,
      isArchived: false
    },
    {
      id: 4,
      description: "Test 4",
      createdAt: new Date(),
      status: ItemStatusEnum.Done,
      isArchived: true
    }
  ]);

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
  }

  function updateItem(item: Item) {
    debugger;
    let index = items.value.findIndex((x) => x.id === item.id);
    items.value.splice(index, 1, item);
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
  };

  function unarchiveItem(item: Item) {
    let element = items.value.find((x) => x === item);
    if (element) {
      element.isArchived = false;
    }
  }

  function finishTask(item: Item) {
    let element = items.value.find((x) => x === item);
    if (element) {
      element.status = ItemStatusEnum.Done;
    }
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
