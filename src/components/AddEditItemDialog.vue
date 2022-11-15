<template>
  <div class="text-center">
    <v-dialog width="500" v-model="state.show" @click:outside="closeDialog()">
      <v-card>
        <ValidationObserver v-slot="{ handleSubmit }" ref="addEditItemForm">
          <form @submit.prevent="handleSubmit(saveData)">
            <v-card-title v-if="!isEditMode" class="text-h5 grey lighten-2">{{
              $t("item.addItem")
            }}</v-card-title>
            <v-card-title v-if="isEditMode" class="text-h5 grey lighten-2">{{
              $t("item.editItem")
            }}</v-card-title>
            <v-card-text>
              <ValidationProvider name="Description" rules="required" v-slot="{ errors }">
                <v-text-field
                  :label="$t('item.description')"
                  prepend-icon="mdi-clock-time-four-outline"
                  v-model="state.formData.description"
                ></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <v-radio-group row v-if="isEditMode" v-model="state.formData.status">
                <v-radio :label="$t('item.active')" :value="status.Active"></v-radio>
                <v-radio :label="$t('item.done')" :value="status.Done"></v-radio>
              </v-radio-group>
              <v-checkbox
                :label="$t('item.archived')"
                v-if="isEditMode"
                v-model="state.formData.isArchived"
              ></v-checkbox>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text type="submit">{{ $t("buttons.save") }}</v-btn>
              <v-btn color="primary" text @click="closeDialog()">{{ $t("buttons.cancel") }}</v-btn>
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
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import { required } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
extend("required", required);

export default defineComponent({
  props: {
    showDialog: Boolean,
    item: {
      type: Object as PropType<Item>,
      required: false
    }
  },
  setup(props, context) {
    const isEditMode: boolean = props.item !== undefined;
    const store = useTodoStore();
    const status = ItemStatusEnum;
    const state = reactive({
      show: props.showDialog,
      formData: {
        description: isEditMode ? (props.item?.description as string) : null,
        status: isEditMode ? props.item?.status : null,
        isArchived: isEditMode ? props.item?.isArchived : null
      }
    });
    const addEditItemForm: any = ref(null);

    function closeDialog() {
      state.show = false;
      addEditItemForm.value.reset();
      context.emit("close");
    }

    function saveData() {
      if (!isEditMode) {
        let element: Item = {
          id: Math.random() * (9999 - 5) + 9999,
          description: state.formData.description as string,
          createdAt: new Date(),
          status: ItemStatusEnum.Active,
          isArchived: false
        };
        state.formData.description = "";
        store.addItem(element);
      } else {
        debugger;
        let element: Item = {
          id: props.item?.id as number,
          description: state.formData.description as string,
          createdAt: props.item?.createdAt as Date,
          status: state.formData.status as ItemStatusEnum,
          isArchived: state.formData.isArchived as boolean
        };
        store.updateItem(element);
      }
      closeDialog();
    }

    watch(
      () => props.showDialog,
      (val) => (state.show = val)
    );
    return { state, isEditMode, status, addEditItemForm, closeDialog, saveData };
  }
});
</script>
