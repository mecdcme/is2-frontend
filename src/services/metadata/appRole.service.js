import { axiosIs2 } from "@/http";
import { config } from "@/common";

export const appRoleService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/app_role").then(
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
    axiosIs2.get("/app_role/" + id).then(
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
    axiosIs2.post("/app_role", formData, config).then(
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
    axiosIs2.put("/app_role/" + formData.id, formData, config).then(
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
    axiosIs2.delete("/app_role/" + id).then(
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
