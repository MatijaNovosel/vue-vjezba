<template>
  <div class="text-center">
    <v-dialog width="500" v-model="state.show" @click:outside="closeDialog()">
      <v-card>
        <ValidationObserver v-slot="{ handleSubmit }" ref="addEditItemForm">
          <form @submit.prevent="handleSubmit(saveData)">
            <v-card-title class="text-h5 grey lighten-2">Add/Edit item</v-card-title>

            <v-card-text>
              <ValidationProvider name="Description" rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Description"
                  prepend-icon="mdi-clock-time-four-outline"
                  v-model="state.formData.description"
                ></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <v-menu
                v-if="isEditMode"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Date"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker></v-date-picker>
              </v-menu>
              <v-menu
                v-if="isEditMode"
                ref="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker full-width></v-time-picker>
              </v-menu>
              <v-radio-group row v-if="isEditMode" v-model="state.formData.status">
                <v-radio label="Active" :value="status.Active"></v-radio>
                <v-radio label="Done" :value="status.Done"></v-radio>
              </v-radio-group>
              <v-checkbox
                label="Archived"
                v-if="isEditMode"
                v-model="state.formData.isArchived"
              ></v-checkbox>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text type="submit">Save</v-btn>
              <v-btn color="primary" text @click="closeDialog()">Cancel</v-btn>
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
        //date: isEditMode ? (props.item?.description as string) : null,
        //time: isEditMode ? (props.item?.description as string) : null,
        status: isEditMode ? props.item?.status : null,
        isArchived: isEditMode ? props.item?.isArchived : null
      }
    });
    const addEditItemForm: any = ref(null);

    function closeDialog() {
      state.show = false;
      debugger;
      addEditItemForm.value.reset();
      context.emit("close");
    }

    function saveData() {
      if (!isEditMode) {
        let element: Item = {
          description: state.formData.description as string,
          createdAt: new Date(),
          status: ItemStatusEnum.Active,
          isArchived: false
        };
        state.formData.description = "";
        store.addItem(element);
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
