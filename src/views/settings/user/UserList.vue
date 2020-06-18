<template>
  <div class="row">
    <div class="col-sm-6 col-md-6">
      <div class="card ">
        <header class="card-header">
          Users
        </header>
        <div class="card-body">
          <table class="table table-striped ">
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
                <th>name</th>
                <th>surname</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.role }}</td>
                <td v-html="item.modifica"></td>
                <td v-html="item.elimina"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosIs2 } from "@/http";

export default {
  name: "userList",
  data() {
    return {
      users: []
    };
  },
  created() {
    axiosIs2.get("/users").then(response => {
      console.log(response);
      this.users = response;
    });
  }
};
</script>
