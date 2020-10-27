import { parameterService } from "@/services";

const state = {
  parameters: [],
  parameter: {}
};

const mutations = {
  SET_PARAMETERS(state, processSteps) {
    state.processSteps = processSteps;
  },
  SET_PARAMETER(state, processStep) {
    state.processStep = processStep;
  }
};

const actions = {
  findAll({ commit }) {
    parameterService.findAll().then(
      data => {
        commit("SET_PROCESS_STEPS", data);
        commit("SET_PROCESS_STEP", null); //clear process step
      },
      error => {
        console.log(error);
      }
    );
  },
  findById({ commit }, id) {
    parameterService.findById(id).then(
      data => {
        commit("SET_PROCESS_STEP", data);
      },
      error => {
        console.log(error);
      }
    );
  },
  save({ dispatch }, formData) {
    parameterService.save(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Process step saved!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  delete({ dispatch }, id) {
    parameterService.delete(id).then(
      data => {
        console.log(data);
        dispatch("findAll");
        dispatch("message/success", "Process step deleted!", {
          root: true
        });
      },
      error => {
        console.log(error);
      }
    );
  },
  update({ dispatch }, formData) {
    parameterService.update(formData).then(
      data => {
        console.log(data);
        dispatch("message/success", "Process step updated!", {
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
  parameters: state => {
    return state.parameters;
  },
  parameter: state => {
    return state.parameter;
  }
};

export const processStep = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
