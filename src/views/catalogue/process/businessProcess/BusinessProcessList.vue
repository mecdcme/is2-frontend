<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Processes
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'BusinessProcessNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="businessProcesses"
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
                  @click="editProcess(item)"
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
                  @click="deleteProcess(item)"
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
      ]
    };
  },
  computed: {
    ...mapGetters("businessProcess", ["businessProcesses"]),
    ...mapGetters("businessProcess", ["businessProcess"])
  },
  created() {
    this.$store.dispatch("businessProcess/findAll");
  },
  methods: {
    deleteProcess(item) {
      /* var myitem = item;
      var mystore = this.$store; */
      this.globalItem = item;
      this.warningModal = true;
      /* this.$dialog.confirm("Please confirm to continue").then(function() {
        console.log("Clicked on proceed" + item);
        mystore.dispatch("businessProcess/delete", myitem.id);
      }); */
      /*  .catch(function() {
          console.log("Clicked on cancel");
        }); */
    },

    editProcess(item) {
      this.$router.push("/catalogue/process/processedit/" + item.id);
    },
    onWarningModalCloseClick() {
      this.warningModal = false;
    },
    onWarningModalSubmitClick(item) {
      console.log("Clicked on proceed" + item);
      this.$store.dispatch("businessProcess/delete", item.id);
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
