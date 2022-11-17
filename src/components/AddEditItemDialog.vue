<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="store.addEditItemDialogState.showDialog"
      @click:outside="closeDialog"
    >
      <v-card>
        <ValidationObserver v-slot="{ handleSubmit }" ref="addEditItemForm">
          <form @submit.prevent="handleSubmit(saveData)">
            <v-card-title
              v-if="!store.addEditItemDialogState.isEditMode"
              class="text-h5 grey lighten-2"
              >{{ $t("item.addItem") }}</v-card-title
            >
            <v-card-title v-else class="text-h5 grey lighten-2">{{
              $t("item.editItem")
            }}</v-card-title>
            <v-card-text>
              <ValidationProvider name="Description" rules="required" v-slot="{ errors }">
                <v-text-field
                  :label="$t('item.description')"
                  prepend-icon="mdi-clock-time-four-outline"
                  v-model="state.formData.description"
                  :error-messages="errors"
                  hide-details
                ></v-text-field>
              </ValidationProvider>
              <template v-if="store.addEditItemDialogState.isEditMode">
                <v-radio-group row v-model="state.formData.status">
                  <v-radio :label="$t('item.active')" :value="status.Active"></v-radio>
                  <v-radio :label="$t('item.done')" :value="status.Done"></v-radio>
                </v-radio-group>
                <v-checkbox
                  :label="$t('item.archived')"
                  v-model="state.formData.isArchived"
                ></v-checkbox>
              </template>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text type="submit">{{ $t("buttons.save") }}</v-btn>
              <v-btn color="primary" text @click="closeDialog">{{ $t("buttons.cancel") }}</v-btn>
            </v-card-actions>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Item } from "@/models/Item";
import { ItemStatusEnum } from "@/models/ItemStatusEnum";
import { useTodoStore } from "@/store";
import { defineComponent, reactive, ref, watch } from "vue";
import { required } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import { randInt } from "@/helpers/helpers";
extend("required", required);

interface IForm {
  reset: () => void;
}

export default defineComponent({
  setup(props, context) {
    const store = useTodoStore();

    const status = ItemStatusEnum;
    const state = reactive({
      formData: {
        description: "",
        status: ItemStatusEnum.Active,
        isArchived: false
      }
    });
    const addEditItemForm = ref<IForm | null>(null);

    function closeDialog() {
      addEditItemForm.value?.reset();
      state.formData.description = "";
      state.formData.status = ItemStatusEnum.Active;
      state.formData.isArchived = false;
      context.emit("close");
    }

    function saveData() {
      if (!store.addEditItemDialogState.isEditMode) {
        const element: Item = {
          id: randInt(),
          description: state.formData.description as string,
          createdAt: new Date().toISOString(),
          status: ItemStatusEnum.Active,
          isArchived: false
        };
        store.addItem(element);
      } else {
        const element: Item = {
          id: store.addEditItemDialogState.item?.id as number,
          description: state.formData.description as string,
          createdAt: store.addEditItemDialogState.item?.createdAt as string,
          status: state.formData.status,
          isArchived: state.formData.isArchived
        };
        store.updateItem(element);
      }
      closeDialog();
    }

    watch(store.addEditItemDialogState, (val) => {
      state.formData.description = val.item?.description as string;
      state.formData.isArchived = val.item?.isArchived as boolean;
      state.formData.status = val.item?.status as number;
    });

    return { state, store, status, addEditItemForm, closeDialog, saveData };
  }
});
</script>
