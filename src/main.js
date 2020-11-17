import Vue from "vue";

//Vue core
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

//Vue global plugins
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import VueSpinners from "vue-spinners";

//Icons
import { iconsSet as icons } from "@/assets/icons/coreui.js";
import "@/assets/icons/material";

//CoreUI components
import "@/coreui";

Vue.config.productionTip = false;

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
  render: h => h(App)
}).$mount("#app");
