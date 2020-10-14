import { axiosIs2 } from "@/http";
import { util } from "../../common";
const querystring = require("querystring");

export const businessServiceService = {
  findAll,
  findById,
  save,
  update,
  updateOwner,
  updateMaintainer,
  updateContact,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIs2.get("/services/").then(
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
    axiosIs2.get("/referential/statistical/programs/" + id).then(
      response => {
        var data = response.data ? util.mapKeysToLower(response.data) : {};
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
    axiosIs2.post("/services", querystring.stringify(formData)).then(
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
    axiosIs2
      .put("/services/" + formData.id, querystring.stringify(formData))
      .then(
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

/* function updateLegislativeReference(formData) {
  return new Promise((resolve, reject) => {
    axiosIs2
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/legislative/" +
          formData.legislative +
          "?language=en"
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
} */

function updateOwner(formData) {
  return new Promise((resolve, reject) => {
    axiosIs2
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/owner/" +
          formData.owner +
          "?language=en"
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

function updateContact(formData) {
  return new Promise((resolve, reject) => {
    axiosIs2
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/contact/" +
          formData.contact +
          "?language=en"
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

function updateMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axiosIs2
      .put(
        "/processes/" + formData.id + "?language=en"
        /*querystring.stringify(formData),
        config*/
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
    axiosIs2.delete("/services/" + id + "?language=en").then(
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
