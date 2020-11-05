import { axiosIs2 } from "@/http";
import { config } from "@/common";

export const stepInstanceService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/step_instance").then(
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
    axiosIs2.get("/step_instance/" + id).then(
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
    axiosIs2.post("/step_instance", formData, config).then(
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
    axiosIs2.put("/step_instance/" + formData.id, formData, config).then(
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
    axiosIs2.delete("/step_instance/" + id).then(
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
