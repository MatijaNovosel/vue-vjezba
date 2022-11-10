import { ItemStatusEnum } from "./../models/ItemStatusEnum";
import { Item } from "@/models/Item";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const active = ref(true);
  const archived = ref(false);

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
      isArchived: false
    }
  ]);

  const filteredItems = computed(() =>
    items.value.filter((x) => {
      return (
        (active.value ? x.status === ItemStatusEnum.Active : x.status === ItemStatusEnum.Done) &&
        x.isArchived === archived.value
      );
    })
  );

  function addItem(item: Item) {
    items.value.push(item);
  }

  const changeFlag = () => {
    active.value = !active.value;
  };

  return { filteredItems, addItem, changeFlag, active };
});
