import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import VueSpinners from "vue-spinners";

import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(CoreuiVue);
Vue.use(Vuelidate);
Vue.use(VueSpinners);

Vue.component("v-select", vSelect);

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  icons,
  vuetify,
  render: h => h(App)
}).$mount("#app");
