<template>
  <v-dialog width="400" v-model="confirmModal">
    <v-card>
      <v-card-title>
        <v-card-title>{{ $t("deleteMessage") }}</v-card-title>
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="onConfirm">{{ $t("deleteAll") }}</v-btn>
        <v-btn color="error" @click="confirmModal = false">{{
          $t("cancel")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    onConfirm: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      confirmModal: false
    };
  }
};
</script>
