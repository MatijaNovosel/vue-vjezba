import { addEditItemDialog } from "./../models/addEditItemDialog";
import { ItemStatusEnum } from "./../models/ItemStatusEnum";
import { Item } from "@/models/Item";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";


export const useTodoStore = defineStore(
  "todo",
  () => {
    const items = ref<Item[]>([]);
    const active = ref(true);
    const archived = ref(false);
    const addEditItemDialogState: addEditItemDialog = reactive({
      showDialog: false,
      isEditMode: false,
      item: undefined
    });
    const searchString = ref("");

    function OpenAddEditDialog(isEditMode: boolean, item?: Item) {
      addEditItemDialogState.showDialog = true;
      addEditItemDialogState.isEditMode = isEditMode;
      addEditItemDialogState.item = item ?? undefined;
    }

    function CloseAddEditDialog() {
      addEditItemDialogState.showDialog = false;
      addEditItemDialogState.isEditMode = false;
      addEditItemDialogState.item = undefined;
    }

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

    function archiveAll() {
      items.value.forEach((x) => {
        x.isArchived = true;
      });
    }

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
      items,
      searchString,
      addEditItemDialogState,
      addItem,
      changeFlag,
      archiveAll,
      finishTask,
      unarchiveItem,
      updateItem,
      OpenAddEditDialog,
      CloseAddEditDialog
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["items.[]"]
    }
  }
);
