import { axiosIs2 } from "@/http";
import { config } from "@/common";

export const parameterService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/parameter").then(
      response => {
        var data = response.data ? response.data : [];
        //console.log(data);
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
    axiosIs2.get("/parameter/" + id).then(
      response => {
        var data = response.data ? response.data : {};
        //console.log(data);
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
    axiosIs2.post("/parameter", formData, config).then(
      response => {
        var data = response.data ? response.data : {};
        //console.log(data);
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
    axiosIs2.put("/parameter/" + formData.id, formData, config).then(
      response => {
        var data = response.data ? response.data : {};
        //console.log(data);
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
    axiosIs2.delete("/parameter/" + id).then(
      response => {
        var data = response.data ? response.data : {};
        //console.log(data);
        resolve(data);
      },
      error => {
        reject(error);
      }
    );
  });
}
