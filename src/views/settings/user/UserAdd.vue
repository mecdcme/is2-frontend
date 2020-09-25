<template>
  <div class="row">
    <div class="col-sm-6 col-md-6">
      <div class="card ">
        <header class="card-header">
          User
          <router-link
            tag="a"
            :to="{
              name: 'UserList'
            }"
          >
            <span class="pl-1"
              ><users-icon class="pr-3" />back to user list</span
            >
          </router-link>
        </header>

        <div class="card-body">
          <form @submit.prevent="submit">
            <div
              class="input-group mb-3"
              :class="{ 'form-group--error': $v.name.$error }"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >Name</span
                >
              </div>
              <input
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="name"
              />
              <div class="row col-12">
                <div class="error" v-if="!$v.name.required">
                  Name is required
                </div>
                <div class="error" v-if="!$v.name.minLength">
                  Name must have at least
                  {{ $v.name.$params.minLength.min }} letters.
                </div>
              </div>
            </div>

            <div
              class="input-group mb-3"
              :class="{ 'form-group--error': $v.surname.$error }"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >Surname</span
                >
              </div>
              <input
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="surname"
              />
              <div class="row col-12">
                <div class="error" v-if="!$v.surname.required">
                  Surname is required
                </div>
                <div class="error" v-if="!$v.surname.minLength">
                  Name must have at least
                  {{ $v.surname.$params.minLength.min }} letters.
                </div>
              </div>
            </div>

            <div
              class="input-group mb-3"
              :class="{ 'form-group--error': $v.email.$error }"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >Email</span
                >
              </div>
              <input
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="email"
              />
              <div class="row col-12">
                <div class="error" v-if="!$v.email.required">
                  Email is required
                </div>
                <div class="error" v-if="!$v.email.email">
                  must have a valid
                  {{ $v.email.$params.email }}.
                </div>
              </div>
            </div>

            <div
              class="input-group mb-3"
              :class="{ 'form-group--error': $v.role.$error }"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >Role</span
                >
              </div>
              <input
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="role"
              />
              <div class="row col-12">
                <div class="error" v-if="!$v.role.required">
                  role is required
                </div>
                <div class="error" v-if="!$v.role.minLength">
                  role must have at least
                  {{ $v.role.$params.minLength.min }} letters.
                </div>
              </div>
            </div>
            <div
              class="input-group mb-3"
              :class="{ 'form-group--error': $v.password.$error }"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >Password</span
                >
              </div>
              <input
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="password"
              />
              <div class="row col-12">
                <div class="error" v-if="!$v.password.required">
                  password is required
                </div>
                <div class="error" v-if="!$v.password.minLength">
                  password must have at least
                  {{ $v.password.$params.minLength.min }} letters.
                </div>
              </div>
            </div>
            <div class="card-footer">
              <Button
                class="btn btn-outline-dark btn-sm"
                @click="userAdd()"
                :disabled="submitStatus === 'PENDING'"
                >Add</Button
              >
              <Button
                class="btn btn-outline-dark btn-sm"
                @click="userReset()"
                :disabled="submitStatus === 'PENDING'"
                >Reset</Button
              >
              <p class="typo__p" v-if="submitStatus === 'OK'">
                Thanks for your submission!
              </p>
              <p class="typo__p" v-if="submitStatus === 'ERROR'">
                Please fill the form correctly.
              </p>
              <p class="typo__p" v-if="submitStatus === 'PENDING'">
                Sending...
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosIs2 } from "@/http";
// eslint-disable-next-line no-unused-vars
import { required, minLength, email } from "vuelidate/lib/validators";
const querystring = require("querystring");
export default {
  name: "UserAdd",
  data() {
    return {
      //formTouched: false,
      submitStatus: null,
      id: "",
      name: "",
      surname: "",
      email: "",
      role: "",
      password: ""
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    surname: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    role: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    userReset() {
      this.name = "";
      this.surname = "";
      this.email = "";
      this.role = "";
      this.password = "";
    },
    userAdd() {
      console.log("submit!");
      //this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        return new Promise((resolve, reject) => {
          const config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          };
          const requestBody = {
            name: this.name,
            surname: this.surname,
            email: this.email,
            role: this.role,
            password: this.password
          };
          if (this.$v.$invalid) {
            this.submitStatus = "ERROR";
          } else {
            axiosIs2
              .post("/users/", querystring.stringify(requestBody), config)
              .then(
                response => {
                  console.log(response);
                  const token = response.headers["jwt-auth"];
                  const data = {
                    token: token,
                    user: response.data
                  };
                  resolve(data);
                  this.submitStatus = response.statusText;
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
            // do your submit logic here
            this.submitStatus = "PENDING";
            setTimeout(() => {
              this.submitStatus = "OK";
            }, 500);
          }
        });
      }
    }
  }
};
</script>
