import Vue from "vue";

import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "@/assets/icons/icons.js";
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import VueSpinners from "vue-spinners";
import VuejsDialog from "vuejs-dialog";
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

import "@/assets/icons/materialIcons";
Vue.config.productionTip = false;

Vue.use(CoreuiVue);
Vue.use(Vuelidate);
Vue.use(VueSpinners);
Vue.use(VuejsDialog);

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
