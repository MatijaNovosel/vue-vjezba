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
      description: "Test description 1",
      createdAt: new Date(),
      status: ItemStatusEnum.Active,
      isArchived: false
    },
    {
      description: "2",
      createdAt: new Date(),
      status: ItemStatusEnum.Done,
      isArchived: false
    },
    {
      description: "Test 3",
      createdAt: new Date(),
      status: ItemStatusEnum.Done,
      isArchived: false
    },
    {
      description: "Test 4",
      createdAt: new Date(),
      status: ItemStatusEnum.Done,
      isArchived: true
    }
  ]);

  const filteredItems = computed(() =>
    items.value.filter((x) => {
      debugger;
      return (
        (archived.value
          ? x.isArchived
          : (active.value
              ? x.status === ItemStatusEnum.Active
              : x.status === ItemStatusEnum.Done) && !x.isArchived) &&
        x.description.toLowerCase().includes(searchString.value)
      );
    })
  );

  function addItem(item: Item) {
    items.value.push(item);
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

  function changeStatus(item: Item) {
    let element = items.value.find((x) => x === item);
    if (element) {
      element.status === ItemStatusEnum.Active ? ItemStatusEnum.Done : ItemStatusEnum.Active;
    }
  }

  return {
    filteredItems,
    addItem,
    changeFlag,
    active,
    archiveAll,
    changeStatus,
    unarchiveItem,
    searchString
  };
});
