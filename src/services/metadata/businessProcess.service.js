import { axiosIs2 } from "@/http";
/* import qs from "querystring"; */
const querystring = require("querystring");
export const businessProcessService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/processes").then(
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
    axiosIs2
      .get("/referential/statistical/standards/" + id + "?language=en")
      .then(
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

    /* const requestBody = {
      name: formData.name,
      description: formData.description,
      link: formData.link ? formData.link : "",
      version: formData.version ? formData.version : "",
      type: formData.type,
      localId: formData.localId
    }; */

    axiosIs2.post("/processes", querystring.stringify(formData), config).then(
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

    /* const requestBody = {
      name: formData.name,
      description: formData.description,
      link: formData.link ? formData.link : "",
      version: formData.version ? formData.version : "",
      type: formData.type,
      localId: formData.localId
    }; */

    axiosIs2
      .put(
        "/processes/" + formData.id + "?language=en",
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
    axiosIs2.delete("/processes/" + id + "?language=en").then(
      response => {
        console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
    /* axiosIs2.delete("/processes/" + id).then(response => {
      console.log(response);
      axiosIs2.get("/processes").then(response => {
        console.log(response);
        this.processes = response.data;
      });
    }); */
  });
}
