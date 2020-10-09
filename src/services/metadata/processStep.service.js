import { axiosIs2 } from "@/http";
import { config } from "@/common";
import { util } from "../../common";

const querystring = require("querystring");
export const processStepService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/process_steps").then(
      response => {
        var data = response.data ? util.mapKeysToLower(response.data) : [];
        console.log(data);
        resolve(data);
      },
      error => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/process_steps/" + id).then(
      response => {
        var data = response.data ? util.mapKeysToLower(response.data) : null;
        console.log(data);
        resolve(data);
      },
      error => {
        reject(error);
      }
    );
  });
}

function save(formData) {
  return new Promise((resolve, reject) => {
    axiosIs2
      .post("/process_steps", querystring.stringify(formData), config)
      .then(
        response => {
          var data = response.data ? util.mapKeysToLower(response.data) : null;
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function update(formData) {
  return new Promise((resolve, reject) => {
    axiosIs2
      .put(
        "/process_steps/" + formData.id,
        querystring.stringify(formData),
        config
      )
      .then(
        response => {
          var data = response.data ? util.mapKeysToLower(response.data) : null;
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function _delete(id) {
  return new Promise((resolve, reject) => {
    axiosIs2.delete("/process_steps/" + id).then(
      response => {
        var data = response.data ? util.mapKeysToLower(response.data) : null;
        console.log(data);
        resolve(data);
      },
      error => {
        reject(error);
      }
    );
  });
}
