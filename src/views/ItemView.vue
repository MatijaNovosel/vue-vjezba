<template>
    <div class="container">
        <ItemComponent v-for="item in items" v-bind:key="item" :item="item"></ItemComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Item } from '@/models/Item'
import { ItemStatusEnum } from '@/models/ItemStatusEnum'
import ItemComponent from '@/components/Item.vue'

export default defineComponent({
    components: { ItemComponent },
     data() {
        return {
            items: [
                {
                    description: "Test description 1",
                    createdAt: new Date(),
                    status: ItemStatusEnum.Active,
                    isArchived: false
                },
                {
                    description: "2",
                    createdAt: new Date(),
                    status: ItemStatusEnum.Active,
                    isArchived: false
                },
                {
                    description: "Test 3",
                    createdAt: new Date(),
                    status: ItemStatusEnum.Active,
                    isArchived: false
                }
            ]
        }
    }
})
</script>
<style scoped lang="scss">
.container{
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-shrink: 1;
    gap: 10px;
}
</style>