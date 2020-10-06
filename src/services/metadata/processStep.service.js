import { axiosIs2 } from "@/http";
/* import qs from "querystring"; */
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
    axiosIs2.get("/process_step").then(
      response => {
        console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/process_step/" + id + "?language=en").then(
      response => {
        var data = response.data ? response.data : null;
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
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axiosIs2
      .post("/process_step", querystring.stringify(formData), config)
      .then(
        response => {
          console.log(response.data);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function update(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axiosIs2
      .put(
        "/process_step/" + formData.id + "?language=en",
        querystring.stringify(formData),
        config
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function _delete(id) {
  return new Promise((resolve, reject) => {
    axiosIs2.delete("/process_step/" + id + "?language=en").then(
      response => {
        console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
}
