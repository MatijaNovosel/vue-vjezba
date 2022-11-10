<template>
    <v-card width="fit-content" padding="10px">
        <div class="container">
            <div class="left">
                <v-card-title>
                    <span class="headline font-weight-bold" :class="{ 'doneTitle' : item.status === status.Done}">{{item.description}}</span>
                </v-card-title>
                <v-card-text class="font-weight-light">
                    {{item.createdAt}}
                </v-card-text>
            </div>
            <div class="right">
                <v-card-actions>
                    <v-btn v-if="item.status === status.Active" color="primary">Done</v-btn>
                    <v-btn color="primary">Edit</v-btn>
                </v-card-actions>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { Item } from '@/models/Item'
import { defineComponent, PropType } from 'vue'
import { ItemStatusEnum } from '@/models/ItemStatusEnum'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Item>,
            required: true,
            default: {}
        }
    },
    setup(){
        const status = ItemStatusEnum
        return{
            status
        }
    },
})
</script>

<style scoped lang="scss">
.container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-width: 500px;
}
.left{
    padding-right: 10px;
}
.right{
    display: flex;
}
.doneTitle{
    text-decoration: line-through;
}
</style>
