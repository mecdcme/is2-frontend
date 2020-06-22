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
          <div v-for="item in users" :key="item.id">
            <label>id</label>
            <input :value="item.id" />
            <label>email</label>
            <input :value="item.email" />
            <label>name</label>
            <input :value="item.name" />
            <label>surname</label>
            <input :value="item.surname" />
            <label>role</label>
            <input :value="item.role" />
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
      users: []
    };
  },
  created() {
    axiosIs2.get("/users/" & this.$route.params.id).then(response => {
      console.log(response);
      this.users = response.data;
    });
  }
};
</script>
