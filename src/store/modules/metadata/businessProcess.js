import { businessProcessService } from "@/services";

const state = {
  businessProcesses: null,
  businessProcess: {}
};

const mutations = {
  SET_BUSINESS_PROCESSES(state, businessProcesses) {
    state.businessProcesses = businessProcesses;
  },
  SET_BUSINESS_PROCESS(state, businessProcess) {
    state.businessProcess = businessProcess;
  }
};

const actions = {
  findAll({ commit }) {
    businessProcessService.findAll().then(
      data => {
        commit("SET_BUSINESS_PROCESSES", data);
        commit("SET_BUSINESS_PROCESS", null); //clear business process
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    businessProcessService.findById(id).then(
      data => {
        commit("SET_BUSINESS_PROCESS", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    businessProcessService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process saved!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    businessProcessService.delete(id).then(
      data => {
        console.log(data);
        dispatch("findAll");
        dispatch("message/success", "Business process deleted!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    businessProcessService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process updated!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  businessProcesses: state => {
    return state.businessProcesses;
  },
  businessProcess: state => {
    return state.businessProcess;
  }
};

export const businessProcess = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
