import router from "@/router";
import { processStepService } from "@/services";

const state = {
  processSteps: [],
  processStep: []
};

const mutations = {
  SET_PROCESS_STEPS(state, processSteps) {
    state.processSteps = processSteps;
  },
  SET_PROCESS_STEP(state, processStep) {
    state.processStep = processStep;
  }
};

const actions = {
  findAll({ commit }) {
    processStepService.findAll().then(
      data => {
        commit("SET_PROCESS_STEPS", data);
        commit("SET_PROCESS_STEP", null); //clear statistical process
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    processStepService.findById(id).then(
      data => {
        commit("SET_PROCESS_STEP", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    processStepService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process saved!", {
          root: true
        });
        router.push("/catalogue/processstep");
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    processStepService.delete(id).then(
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
    processStepService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Business process updated!", {
          root: true
        });
        router.push("/catalogue/processstep");
      },
      error => {
        console.log(error);
      }
    );
  }
};

const getters = {
  processSteps: state => {
    return state.processSteps;
  },
  processStep: state => {
    return state.processStep;
  }
};

export const processStep = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
