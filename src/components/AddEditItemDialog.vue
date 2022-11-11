<template>
  <div class="text-center">
    <v-dialog width="500" v-model="state.show">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Privacy Policy </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.stop="closeDialog()"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, watch } from "vue";

export default defineComponent({
  props: {
    showDialog: Boolean
  },
  setup(props, context) {
    const state = reactive({ show: props.showDialog });

    function closeDialog() {
      state.show = false;
      context.emit("close", state.show);
    }

    watch(
      () => props.showDialog,
      (val) => (state.show = val)
    );
    return { state, closeDialog };
  }
});
</script>
