import { axiosIs2 } from "@/http";
import { util } from "../../common";
import qs from "querystring";

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
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      name: formData.name,
      acronym: formData.acronym,
      description: formData.description,
      owner: formData.owner,
      maintainer: formData.maintainer,
      contact: formData.contact,
      status: "CURRENT",
      budget: 0,
      dateInitiated: "2018-05-10T10:00:00",
      dateEnded: "2018-08-10T10:00:00"
    };

    const legislativeReferences = formData.legislativeReferences;

    axiosIs2
      .put(
        "close/referential/statistical/programs/" +
          formData.localId +
          "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //save legislative references
          for (var legislativeReference of legislativeReferences) {
            updateLegislativeReference({
              id: response.data.id,
              legislative: legislativeReference.id
            });
          }
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

    const requestBody = {
      name: formData.name,
      acronym: formData.acronym,
      description: formData.description,
      status: "CURRENT",
      budget: 0,
      dateInitiated: "2018-05-10T10:00:00",
      dateEnded: "2018-08-10T10:00:00"
    };

    const agents = {
      owner: formData.owner,
      maintainer: formData.maintainer,
      contact: formData.contact
    };

    const legislativeReferences = formData.legislativeReferences;

    axiosIs2
      .put(
        "/processes/" + formData.id + "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          const statisticalProgram = response.data;
          //console.log(response.data);
          if (agents.owner.id != statisticalProgram.owner.id) {
            updateOwner({
              id: response.data.id,
              owner: agents.owner.id
            });
          }
          if (agents.maintainer.id != statisticalProgram.maintainer.id) {
            updateMaintainer({
              id: response.data.id,
              maintainer: agents.maintainer.id
            });
          }
          if (agents.contact.id != statisticalProgram.contact.id) {
            updateContact({
              id: response.data.id,
              contact: agents.contact.id
            });
          }
          for (var legislativeReference of legislativeReferences) {
            updateLegislativeReference({
              id: response.data.id,
              legislative: legislativeReference.id
            });
          }
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function updateLegislativeReference(formData) {
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
}

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
