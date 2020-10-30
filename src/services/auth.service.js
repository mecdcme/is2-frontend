import { axiosAuth } from "@/http";
import { config } from "@/common";

export const authService = {
  login
};

function login({ username, password }) {
  return new Promise((resolve, reject) => {
    const requestBody = {
      username: username,
      password: password
    };

    axiosAuth.post("/login", requestBody, config).then(
      response => {
        console.log(response.data);
        const token = response.data.accessToken;
        const data = {
          token: token
        };
        resolve(data);
      },
      error => {
        console.log(error.response.data.code);
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
