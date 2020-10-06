<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Processes
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'ProcessStepNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="processSteps"
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
                  @click="editProcessStep(item)"
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
                  @click="deleteProcessStep(item)"
                  >Elimina</CButton
                >
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </div>
    </div>
    <CModal title="Attenzione!" color="warning" :show.sync="warningModal">
      <template #footer>
        <button class="btn btn-secondary" @click="onWarningModalCloseClick()">
          Annulla
        </button>
        <button
          class="btn btn-warning"
          @click="onWarningModalSubmitClick(globalItem)"
        >
          Conferma
        </button>
      </template>
      Sei sicuro di voler eliminare il processo?
    </CModal>
  </div>
</template>
<script>
// import { axiosIs2 } from "@/http";
import { mapGetters } from "vuex";
export default {
  name: "processlist",
  data() {
    return {
      globalItem: [],
      warningModal: false,
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:15%" },
        { key: "label", _style: "width:20%;" },
        { key: "descr", _style: "width:15%;" },
        /* { key: "organization", _style: "width:10%;" }, */
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
    ...mapGetters("processStep", ["processSteps"]),
    ...mapGetters("processStep", ["processStep"])
  },
  created() {
    this.$store.dispatch("processStep/findAll");
  },
  methods: {
    deleteProcessStep(item) {
      this.globalItem = item;
      this.warningModal = true;
    },

    editProcessStep(item) {
      this.$router.push("/catalogue/step/processstepedit/" + item.id);
    },
    onWarningModalCloseClick() {
      this.warningModal = false;
    },
    onWarningModalSubmitClick(item) {
      console.log("Clicked on proceed" + item);
      this.$store.dispatch("ProcessStep/delete", item.id);
      this.warningModal = false;
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
