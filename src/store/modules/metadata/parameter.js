import { parameterService } from "@/services";

const state = {
  parameters: [],
  parameter: {}
};

const mutations = {
  SET_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },
  SET_PARAMETER(state, parameter) {
    state.parameter = parameter;
  }
};

const actions = {
  findAll({ commit }) {
    return parameterService
      .findAll()
      .then(data => {
        commit("SET_PARAMETERS", data);
        commit("SET_PARAMETER", null); //clear process step
      })
      .catch(err => {
        console.log(err);
      });
  },
  findById({ commit }, id) {
    return parameterService
      .findById(id)
      .then(data => {
        commit("SET_PARAMETER", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  save({ commit, dispatch }, formData) {
    return parameterService
      .save(formData)
      .then(data => {
        commit("SET_PARAMETER", data);
        dispatch("message/success", "Parameter saved!", {
          root: true
        });
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete({ dispatch }, id) {
    return parameterService
      .delete(id)
      .then(() => {
        dispatch("findAll");
        dispatch("message/success", "Parameter deleted!", {
          root: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  update({ dispatch }, formData) {
    return parameterService
      .update(formData)
      .then(data => {
        console.log(data);
        dispatch("message/success", "Parameter updated!", {
          root: true
        });
        return data;
      })
      .catch(err => {
        console.log(err);
      });
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

export const parameter = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
