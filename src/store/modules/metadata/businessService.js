import router from "@/router";
import { businessServiceService } from "@/services";

const state = {
  businessServices: [],
  businessService: null
};

const mutations = {
  SET_BUSINESS_SERVICES(state, businessServices) {
    state.businessServices = businessServices;
  },
  SET_BUSINESS_SERVICE(state, businessService) {
    state.businessService = businessService;
  }
};

const actions = {
  findAll({ commit }) {
    businessServiceService.findAll().then(
      data => {
        commit("SET_BUSINESS_SERVICES", data);
        commit("SET_BUSINESS_SERVICE", null); //clear businessService
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    businessServiceService.findById(id).then(
      data => {
        commit("SET_BUSINESS_SERVICE", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    businessServiceService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business service saved!", {
          root: true
        });
        router.push("/catalogue/service");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    businessServiceService.delete(id).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business service deleted!", {
          root: true
        });
        router.push("/catalogue/service");
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    businessServiceService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business service updated!", {
          root: true
        });
        router.push("/catalogue/service");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  businessServices: state => {
    return state.businessServices;
  },
  businessService: state => {
    return state.businessService;
  }
};

export const businessService = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
