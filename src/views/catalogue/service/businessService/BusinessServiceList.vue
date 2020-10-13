<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Services
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'BusinessServiceAdd' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="businessServices"
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
              <td>
                <a href="#" @click="editService(item)"><edit-icon /></a>
              </td>
            </template>
            <template #show_delete="{item}">
              <td>
                <a href="#" @click="modalOpen(item)"><delete-icon /></a>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
    <CModal title="Attenzione!" color="warning" :show.sync="warningModal">
      <template #footer>
        <CButton shape="square" size="sm" color="primary" @click="modalClose()">
          Close
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="deleteService()"
        >
          Delete
        </CButton>
      </template>
      Sei sicuro di voler eliminare il servizio?
    </CModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "servicelist",
  data() {
    return {
      services: [],
      warningModal: false,
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
  computed: {
    ...mapGetters("businessService", ["businessServices"]),
    ...mapGetters("businessService", ["businessService"])
  },
  methods: {
    deleteService() {
      this.$store.dispatch("businessService/delete", this.selectedService.id);
      this.warningModal = false;
    },
    editService(item) {
      // eslint-disable-next-line no-redeclare
      var index = this.services.indexOf(item);
      // this.services.splice(index, 1);
      this.$router.push("/catalogue/service/edit/" + this.services[index].id);
    },
    modalOpen(service) {
      this.selectedService = service;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.$store.dispatch("businessService/findAll");
    this.$store.dispatch("coreui/setContext", Context.Service);
  }
};
</script>
