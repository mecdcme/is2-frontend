<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.dispatch('coreui/toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.dispatch('coreui/toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="img/istat-logo.png" height="20" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CDropdown
        inNav
        class="c-header-nav-items"
        placement="bottom"
        add-menu-classes="dropdown-menu-right pt-0"
      >
        <template #toggler>
          <CHeaderNavLink>
            <div class="c-header-nav-first">Settings</div>
          </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center" color="light">
          <strong>IS<sup>2</sup> Workbench</strong>
        </CDropdownHeader>
        <CDropdownItem>
          <router-link
            tag="a"
            :to="{
              name: 'UserList'
            }"
          >
            <span class="pl-1"><users-icon class="pr-4" />Users</span>
          </router-link>
        </CDropdownItem>
        <CDropdownItem>
          <router-link
            tag="a"
            :to="{
              name: 'Components'
            }"
          >
            <span class="pl-1"><block-icon class="pr-4" />Components</span>
          </router-link></CDropdownItem
        >
      </CDropdown>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <app-header-dropdown-account />
    </CHeaderNav>
    <CSubheader class="justify-content-between px-3">
      <!--CBreadcrumbRouter class="border-0 mb-0" /-->
      <app-header-breadcrumb></app-header-breadcrumb>
      <app-header-nav></app-header-nav>
    </CSubheader>
  </CHeader>
</template>

<script>
import { mapGetters } from "vuex";

import HeaderDropdownAccnt from "./HeaderDropdownAccnt";
import BreadCrumb from "./BreadCrumb";
import HeaderNav from "./HeaderNav";

export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },
  components: {
    "app-header-dropdown-account": HeaderDropdownAccnt,
    "app-header-breadcrumb": BreadCrumb,
    "app-header-nav": HeaderNav
  }
};
</script>

<style scoped>
.c-header-nav {
  padding-left: 0.5rem;
}
.c-icon {
  margin-right: 0.4rem;
}
.b-0 > .material-design-icon__svg {
  bottom: 0;
}
.dropdown-item a {
  color: #4f5d73;
}
.dropdown-item a:active,
.dropdown-item a:hover,
.dropdown-item a:focus {
  color: #321fdb;
  text-decoration: none;
}
.dropdown-item.active,
.dropdown-item:active {
  text-decoration: none;
  color: #321fdb;
  background-color: #fff;
}
.dropdown-item:hover,
.dropdown-item:focus {
  text-decoration: none;
  color: #321fdb;
  background-color: #fff;
}
</style>
