<template>
  <div class="row">
    <div class="col-sm-4 col-md-5">
      <div class="card ">
        <header class="card-header">
          Users
        </header>
        <div class="card-body">
          <b-table class="userList table table-striped">
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
              <tr v-for="item in tableData" v-bind:key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.role }}</td>
                <td v-html="item.modifica"></td>
                <td v-html="item.elimina"></td>
              </tr>
            </tbody>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userList",
  data() {
    return {
      tableData: [
        {
          id: 1,
          email: "framato@istat.it",
          name: "Francesco",
          surname: "Amato",
          role: "ADMIN",
          modifica: '<a class="badge badge-warning" href="1">modifica</a>',
          elimina: '<a class="badge badge-warning" href="1">elimina</a>'
        },
        {
          id: 2,
          email: "iannacone@istat.it",
          name: "Renzo",
          surname: "Iannacone",
          role: "USER",
          modifica: '<a class="badge badge-warning" href="2">modifica</a>',
          elimina: '<a class="badge badge-warning" href="2">elimina</a>'
        },
        {
          id: 3,
          email: "macone@istat.it",
          name: "Stefano",
          surname: "Macone",
          role: "ADMIN",
          modifica: '<a class="badge badge-warning " href="3">modifica</a>',
          elimina: '<a class="badge badge-warning" href="3">elimina</a>'
        },
        {
          id: 4,
          email: "papizzo@istat.it",
          name: "Paolo",
          surname: "Pizzo",
          role: "USER",
          modifica: '<a class="badge badge-warning" href="4">modifica</a>',
          elimina: '<a class="badge badge-warning" href="4">elimina</a>'
        }
      ]
    };
  }
};
</script>
