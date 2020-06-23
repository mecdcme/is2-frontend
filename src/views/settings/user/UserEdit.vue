<template>
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
          <div>
            <label>id</label>
            <input :value="user.id" :placeholder="user.id" />
            <label>email</label>
            <input :value="user.email" :placeholder="user.email" />
            <label>name</label>
            <input :value="user.name" :placeholder="user.name" />
            <label>surname</label>
            <input :value="user.surname" :placeholder="user.surname" />
            <label>role</label>
            <input :value="user.role" :placeholder="user.role" />
          </div>
        </div>
      </div>
    </div>
  </div>
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
    axiosIs2.get("/users/" & this.$route.params.id).then(response => {
      console.log(response);
      this.user = response.data;
    });
  }
};
</script>
