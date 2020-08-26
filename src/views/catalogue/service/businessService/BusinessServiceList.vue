<template>
  <div class="row">
    <div class="col-sm-6 col-md-6">
      <div class="card ">
        <header class="card-header">
          Services
        </header>
        <div class="card-body">
          <table class="table table-striped ">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>description</th>
                <th>organization</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableData" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.organization }}</td>
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
export default {
  name: "BusinessProcessList",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "Relais",
          description: "Record Linkage at Istat",
          organization: "Istat",
          modifica: '<a class="badge badge-warning" href="1">modifica</a>',
          elimina: '<a class="badge badge-warning" href="1">elimina</a>'
        },
        {
          id: 2,
          name: "Validate",
          description: "Data validation in R",
          organization: "Istat",
          modifica: '<a class="badge badge-warning" href="2">modifica</a>',
          elimina: '<a class="badge badge-warning" href="2">elimina</a>'
        },
        {
          id: 3,
          name: "ARC loader",
          description: "Arc file loader",
          organization: "Istat",
          modifica: '<a class="badge badge-warning" href="3">modifica</a>',
          elimina: '<a class="badge badge-warning" href="3">elimina</a>'
        }
      ]
    };
  }
};
</script>
