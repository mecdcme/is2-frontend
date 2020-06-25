<template>
  <div>
    <form class>
      <h1>Register</h1>
      <p class="text-muted">Create your account</p>
      <div role="group" class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                class="c-icon"
              >
                <path
                  d="M19.294 16.109l-3.414-2.219 1.287-2.359c0.288-0.519 0.457-1.137 0.458-1.796v-3.735c0-2.9-2.351-5.25-5.25-5.25s-5.25 2.351-5.25 5.25v0 3.735c0.001 0.658 0.17 1.277 0.468 1.815l-0.010-0.019 1.287 2.359-3.414 2.219c-1.033 0.676-1.706 1.828-1.706 3.137 0 0.002 0 0.005 0 0.007v-0 3.997h17.25v-3.997c0-0.002 0-0.005 0-0.007 0-1.309-0.673-2.461-1.692-3.128l-0.014-0.009zM19.5 21.75h-14.25v-2.497c0-0.001 0-0.003 0-0.004 0-0.785 0.404-1.477 1.015-1.877l0.009-0.005 4.578-2.976-1.952-3.578c-0.173-0.311-0.274-0.682-0.275-1.077v-3.735c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75v0 3.735c-0 0.395-0.102 0.766-0.281 1.089l0.006-0.012-1.952 3.579 4.578 2.976c0.62 0.406 1.024 1.097 1.024 1.882 0 0.001 0 0.003 0 0.004v-0z"
                />
              </svg>
            </span>
          </div>
          <input
            id="uid-vh7uijpwzrn"
            type="text"
            placeholder="Username"
            autocomplete="username"
            class="form-control"
          />
        </div>
      </div>
      <div role="group" class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">@</span>
          </div>
          <input
            id="uid-368ofpw7ass"
            type="text"
            placeholder="Email"
            autocomplete="email"
            class="form-control"
          />
        </div>
      </div>
      <div role="group" class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                class="c-icon"
              >
                <path
                  d="M18 9.375v-2.625c0-3.314-2.686-6-6-6s-6 2.686-6 6v0 2.625h-1.875v6c0 4.342 3.533 7.875 7.875 7.875s7.875-3.533 7.875-7.875v-6zM7.5 6.75c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5v0 2.625h-9zM18.375 15.375c0 3.515-2.86 6.375-6.375 6.375s-6.375-2.86-6.375-6.375v-4.5h12.75z"
                />
              </svg>
            </span>
          </div>
          <input
            id="uid-45smixvlyne"
            type="password"
            placeholder="Password"
            autocomplete="new-password"
            class="form-control"
          />
        </div>
      </div>
      <div role="group" class="mb-4 form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                class="c-icon"
              >
                <path
                  d="M18 9.375v-2.625c0-3.314-2.686-6-6-6s-6 2.686-6 6v0 2.625h-1.875v6c0 4.342 3.533 7.875 7.875 7.875s7.875-3.533 7.875-7.875v-6zM7.5 6.75c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5v0 2.625h-9zM18.375 15.375c0 3.515-2.86 6.375-6.375 6.375s-6.375-2.86-6.375-6.375v-4.5h12.75z"
                />
              </svg>
            </span>
          </div>
          <input
            id="uid-mt4g3i7iu6n"
            type="password"
            placeholder="Repeat password"
            autocomplete="new-password"
            class="form-control"
          />
        </div>
      </div>
      <button type="button" class="btn btn-success btn-block">
        Create Account
      </button>
    </form>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { axiosIs2 } from "@/http";
export default {
  name: "UserEdit",
  data() {
    return {
      process: null
    };
  },
  created() {
    axiosIs2.get("/processes/" + this.$route.params.id).then(response => {
      console.log(response);
      this.process = response.data;
    });
  }
};
</script>
