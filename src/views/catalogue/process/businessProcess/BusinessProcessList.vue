<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Processes
          <router-link
            tag="a"
            :to="{
              name: 'BusinessProcessNew'
            }"
          >
            <span class="pl-1"
              ><plus-icon class="fas fa plus" />New Process</span
            >
          </router-link>
        </header>
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
          >
            <template #show_update="{item, index}">
              <td class="py-2">
                <CButton
                  color="primary"
                  square
                  size="sm"
                  @click="editProcess(item, index)"
                  >Modifica</CButton
                >
              </td>
            </template>
            <template #show_delete="{item, index}">
              <td class="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  square
                  size="sm"
                  @click="deleteProcess(item, index)"
                  >Elimina</CButton
                >
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
const fields = [
  { key: "id", _style: "width:5%" },
  { key: "name", _style: "width:15%" },
  { key: "description", _style: "width:15%;" },
  { key: "label", _style: "width:20%;" },
  { key: "organization", _style: "width:10%;" },
  {
    key: "show_update",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  {
    key: "show_delete",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];
import { axiosIs2 } from "@/http";
export default {
  name: "processlist",
  data() {
    return {
      processes: [],
      fields
    };
  },
  created() {
    axiosIs2.get("/processes").then(response => {
      console.log(response);
      this.processes = response.data;
    });
  },
  methods: {
    deleteProcess(item, index) {
      // var index = this.processes.indexOf(item);
      this.processes.splice(index, 1);
    },

    editProcess(item) {
      // eslint-disable-next-line no-redeclare
      var index = this.processes.indexOf(item);
      // this.processes.splice(index, 1);
      this.$router.push(
        "/catalogue/process/processedit/" + this.processes[index].id
      );
    }
  }
};
</script>
