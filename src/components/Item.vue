<template>
    <v-card width="fit-content" padding="10px">
        <div class="container">
            <div class="left">
                <v-card-title>
                    <span class="headline font-weight-bold">{{item.description}}</span>
                </v-card-title>
                <v-card-text class="font-weight-light">
                    {{item.createdAt}}
                </v-card-text>
            </div>
            <div class="right">
                <v-card-actions class="justify-center">
                    <v-btn color="primary">Done</v-btn>
                    <v-btn color="primary">Edit</v-btn>
                </v-card-actions>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { Item } from '@/models/Item'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Item>,
            required: true,
            default: {}
        }
    }
})
</script>

<style scoped lang="scss">
.container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 1;
}
.left{
    padding-right: 10px;
}
.right{
    display: flex;
}
</style>
