import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { businessProcess } from "./modules/metadata/businessProcess";
import { businessService } from "./modules/metadata/businessService";
import { user } from "./modules/user/user";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";
Vue.use(VuejsDialog);
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    coreui,
    message,
    businessProcess,
    businessService,
    user
  }
});
