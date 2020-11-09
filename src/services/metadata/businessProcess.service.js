import { axiosIs2 } from "@/http";
import { config } from "@/common";

export const businessProcessService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return axiosIs2
    .get("/processes")
    .then(res => {
      var data = res.data ? res.data : [];
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function findById(id) {
  return axiosIs2
    .get("/processes/" + id)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function save(formData) {
  return axiosIs2
    .post("/processes", formData, config)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function update(formData) {
  return axiosIs2
    .put("/processes/" + formData.id, formData, config)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function _delete(id) {
  return axiosIs2
    .delete("/processes/" + id)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
