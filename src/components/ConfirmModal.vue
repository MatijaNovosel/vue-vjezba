<template>
  <v-dialog width="600" v-model="confirmModal">
    <v-card>
      <v-card-title>
        <v-card-title>{{ $t("deleteMessage") }}</v-card-title>
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="onConfirm">{{ $t("deleteAll") }}</v-btn>
        <v-btn color="error" @click="onCancel">{{ $t("cancel") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    onConfirm: {
      required: false
    },
    onCancel: {
      required: false
    }
  },
  data() {
    return {
      confirmModal: false
    };
  }
};
</script>
