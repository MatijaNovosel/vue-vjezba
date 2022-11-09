<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <v-spacer></v-spacer>
        <div class="nav">
            <v-btn elevation="2" class="btn" @click.stop="showAddEditDialog=true">
                Add Item
            </v-btn>
            <AddEditItemDIalog v-model="showAddEditDialog"/>
            <v-btn elevation="2" class="btn">
                Clear Archive
            </v-btn>
        </div>
    </v-app-bar>
    <v-main>
      <Tabs/>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import Tabs from './components/Tabs';
import AddEditItemDIalog from '@/components/AddEditItemDialog'


export default defineComponent({
  name: 'App',

  components: {
    Tabs,
    AddEditItemDIalog
  },

  data () {
    return {
      showAddEditDialog: false
    }
  },
});
</script>
<style scoped lang="scss">
.nav {
  display: flex;
  gap: 20px;
}
</style>