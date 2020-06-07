<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="value => $store.commit('set', ['sidebarShow', 'responsive'])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon name="cil-terminal" size="lg"></CIcon>
      <span class="brand">IS2 Workbench</span>
    </CSidebarBrand>

    <ul class="c-sidebar-nav h-100 ps" style="position: relative;">
      <li class="c-sidebar-nav-item">
        <router-link tag="a" :to="{ name: 'Home' }" class="c-sidebar-nav-link">
          <v-icon small>mdi-home</v-icon> Home
          <span class="badge badge-primary">Alpha</span>
        </router-link>
      </li>
      <li class="c-sidebar-nav-title">Catalogue</li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'BusinessServiceList' }"
          class="c-sidebar-nav-link"
        >
          <v-icon small>mdi-layers-outline</v-icon> Service
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'BusinessProcessList' }"
          class="c-sidebar-nav-link"
        >
          <v-icon small>mdi-layers-outline</v-icon> Process
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'WorkSessionList' }"
          class="c-sidebar-nav-link"
        >
          <v-icon small>mdi-layers-outline</v-icon> Session
        </router-link>
      </li>
    </ul>
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", {
      show: "sidebarShow",
      minimize: "sidebarMinimize"
    })
  }
};
</script>
<style scoped>
.brand {
  font-size: 1.2em;
  padding-left: 1rem;
}
.c-sidebar-nav-link > i {
  flex: 0 0 42px;
  margin-left: -0.7rem;
  color: #fff;
}
</style>
