import { axiosIs2 } from "@/http";
import { config } from "@/common";

export default class AbstractService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  findAll() {
    return axiosIs2
      .get(this.endpoint + "/")
      .then(response => {
        var data = response.data ? response.data : [];
        //console.log(data);
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  findById(id) {
    return axiosIs2
      .get(this.endpoint + "/" + id)
      .then(response => {
        var data = response.data ? response.data : {};
        //console.log(data);
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  save(formData) {
    return axiosIs2
      .post(this.endpoint, formData, config)
      .then(response => {
        var data = response.data ? response.data : {};
        //console.log(data);
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  update(formData) {
    return axiosIs2
      .put(this.endpoint + "/" + formData.id, formData, config)
      .then(response => {
        var data = response.data ? response.data : {};
        //console.log(data);
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  delete(id) {
    return axiosIs2.delete(this.endpoint + "/" + id).then(
      response => {
        //console.log(response.data);
        return response.data;
      },
      error => {
        throw error;
      }
    );
  }
}
