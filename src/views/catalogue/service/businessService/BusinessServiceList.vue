<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Services
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'BusinessServiceNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="services"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          >
            <template #show_update="{item}">
              <td class="py-2">
                <CButton
                  color="primary"
                  square
                  size="sm"
                  @click="editService(item)"
                  >Modifica</CButton
                >
              </td>
            </template>
            <template #show_delete="{item}">
              <td class="py-2">
                <CButton
                  color="primary"
                  square
                  size="sm"
                  @click="deleteService(item)"
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
import { axiosIs2 } from "@/http";
export default {
  name: "servicelist",
  data() {
    return {
      services: [],
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:15%" },
        { key: "description", _style: "width:15%;" },        
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
      ]
    };
  },
  created() {
    axiosIs2.get("/services").then(response => {
      console.log(response);
      this.services = response.data;
    });
  },
  methods: {
    deleteService(item) {
      var index = this.services.indexOf(item);
      //this.services.splice(index, 1);
      axiosIs2
        .delete("/services/" + this.services[index].id)
        .then(response => {
          console.log(response);
        });
      axiosIs2.get("/services").then(response => {
        console.log(response);
        this.services = response.data;
      });
    },

    editService(item) {
      // eslint-disable-next-line no-redeclare
      var index = this.services.indexOf(item);
      // this.services.splice(index, 1);
      this.$router.push(
        "/catalogue/service/edit/" + this.services[index].id
      );
    }
  }
};
</script>

<style>
.card-header-actions {
  margin-right: 0;
}
.card-header-actions .material-design-icon > .material-design-icon__svg {
  width: 1.2rem;
  height: 1.2rem;
  bottom: auto;
}
</style>
