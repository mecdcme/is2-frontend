<template>
  <div class="row">
    <div class="col-sm-9 col-md-9">
      <div class="card">
        <header class="card-header">Processes</header>
        <CCardBody>
          <CDataTable
            :items="processes"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          ></CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosIs2 } from "@/http";
export default {
  name: "processlist",
  data() {
    return {
      processes: []
    };
  },
  created() {
    axiosIs2.get("/processes").then(response => {
      console.log(response);
      this.processes = response.data;
    });
  },
  methods: {
    deleteItem(item) {
      var index = this.processes.indexOf(item);
      this.processes.splice(index, 1);
    }
  }
};
</script>
