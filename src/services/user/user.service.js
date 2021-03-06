import { axiosIs2 } from "@/http";
import { config } from "@/common";

export const userService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};
function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/users/").then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/users/" + id).then(
      response => {
        //var data = response.data ? response.data : null;
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
function save(data) {
  return new Promise((resolve, reject) => {
    axiosIs2.post("/users/", data, config).then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}

function update(data) {
  return new Promise((resolve, reject) => {
    const user = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role
    };
    axiosIs2.put("/users/" + data.id, user, config).then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
function _delete(id) {
  return new Promise((resolve, reject) => {
    axiosIs2.delete("/users/" + id).then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
