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
          <home-icon class="c-sidebar-nav-icon" />
          <span class="icon-span">Home</span>
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
          <layer-icon class="c-sidebar-nav-icon" />
          <span class="icon-span">Service</span>
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'BusinessProcessList' }"
          class="c-sidebar-nav-link"
        >
          <layer-icon class="c-sidebar-nav-icon" />
          <span class="icon-span">Process</span>
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'WorkSessionList' }"
          class="c-sidebar-nav-link"
        >
          <layer-icon class="c-sidebar-nav-icon" />
          <span class="icon-span">Session</span>
        </router-link>
      </li>
    </ul>
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";
import nav from "./_nav";

export default {
  nav,
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
.c-sidebar-nav-icon {
  flex: 0 0 42px;
}

.icon-span {
  padding-left: 0.6rem;
}
.material-design-icon {
  vertical-align: middle;
  display: inline;
}

.material-design-icon > .material-design-icon__svg {
  height: 1.1rem;
  width: 1.1rem;
  bottom: 0rem;
}
</style>
