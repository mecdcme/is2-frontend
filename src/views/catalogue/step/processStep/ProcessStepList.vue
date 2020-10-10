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
              <td>
                <a href="#" @click="editStep(item)"><edit-icon /></a>
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
    <CModal title="Warning!" :show.sync="warningModal">
      <template #footer>
        <CButton shape="square" size="sm" color="light" @click="modalClose">
          Close
        </CButton>
        <CButton shape="square" size="sm" color="primary" @click="deleteStep">
          Delete
        </CButton>
      </template>
      Delete process '{{ selectedProcessStep.name }}'?
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "processStepList",
  data() {
    return {
      selectedProcessStep: {},
      warningModal: false,
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:10%" },
        { key: "label", _style: "width:10%;" },
        { key: "descr", _style: "width:25%;" },
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
    editStep(step) {
      this.$router.push("/catalogue/step/processstepedit/" + step.id);
    },
    modalOpen(step) {
      this.selectedProcessStep = step;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    },
    deleteStep() {
      this.$store.dispatch("processStep/delete", this.selectedProcessStep.id);
      this.warningModal = false;
    }
  }
};
</script>
