<link href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css" rel="stylesheet">

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="navigateTo(item.route)">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="blue" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="searchText" placeholder="Search" hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
    </v-app-bar>

    <v-main>
      <router-view :search-text="searchText"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { debounce } from 'lodash';

export default {
  data() {
    return {
      drawer: false,
      title: 'My App',
      items: [
        { icon: 'mdi-view-dashboard', title: 'Active', route: '/active' },
        { icon: 'mdi-clock', title: 'Inactive', route: '/inactive' },
        { icon: 'mdi-archive', title: 'Archived', route: '/archived' }
      ],
      searchText: ''
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.drawer = false;
    }
  },
  watch: {
    searchText: debounce(function(value) {
      this.$router.push({ path: this.$route.path, query: { q: value } });
    }, 500)
  },
  created() {
    this.searchText = this.$route.query.q || '';
  }
};
</script>
