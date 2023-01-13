<template>
    <v-row justify="center">
        <v-dialog v-model="dialog.state.active" persistent max-width="500px">
            <v-card>
                <v-card-text>{{ dialog.state.message }}</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="green-darken-1" @click="dialog.ok" variant="text">
                        {{ dialog.state.okText }}
                    </v-btn>
                    <v-btn color="green-darken-1" @click="dialog.cancel" variant="text">
                        {{ dialog.state.cancelText }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts" setup>
import dialog from '@/utils/dialog';
</script>