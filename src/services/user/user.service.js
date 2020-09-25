import { axiosIs2 } from "@/http";
import qs from "querystring";

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
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axiosIs2.post("/users/", qs.stringify(data), config).then(
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
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const user = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role
    };
    axiosIs2.put("/users/" + data.id, qs.stringify(user), config).then(
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
