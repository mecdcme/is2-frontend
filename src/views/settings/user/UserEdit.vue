<template>
  <form>
    <div class="row">
      <div class="col-sm-6 col-md-6">
        <div class="card ">
          <header class="card-header">
            Users
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
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >id</span
                >
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="user.id"
              />
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >email</span
                >
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="user.email"
              />
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >name</span
                >
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="user.name"
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >surname</span
                >
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="user.surname"
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default"
                  >role</span
                >
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                v-model="user.role"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { axiosIs2 } from "@/http";
export default {
  name: "UserEdit",
  data() {
    return {
      user: null
    };
  },
  created() {
    axiosIs2.get("/users/" + this.$route.params.id).then(response => {
      console.log(response);
      this.user = response.data;
    });
  }
};
</script>
