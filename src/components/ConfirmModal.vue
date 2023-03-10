<template>
  <v-dialog v-model="confirmModal">
    <v-card-title>
      <v-card-title>{{ $t("deleteMessage") }}</v-card-title>
    </v-card-title>
    <v-card-actions>
      <v-btn @click="onConfirm">{{ $t("deleteAll") }}</v-btn>
      <v-btn @click="confirmModal = false">{{ $t("cancel") }}</v-btn>
    </v-card-actions>
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
