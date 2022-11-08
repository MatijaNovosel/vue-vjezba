<template>
    <div>
        <ItemComponent v-for="item of items" v-bind:key="item"></ItemComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Item } from '@/models/Item'
import { ItemStatusEnum } from '@/models/ItemStatusEnum'
import ItemComponent from '@/components/Item.vue'

const items: Item[] = [
    {
        description: "Test description 1",
        createdAt: new Date(),
        status: ItemStatusEnum.Active,
        isArchived: false
    },
    {
        description: "Test description 2",
        createdAt: new Date(),
        status: ItemStatusEnum.Active,
        isArchived: false
    }
]

export default defineComponent({
  components: { ItemComponent },
})
</script>