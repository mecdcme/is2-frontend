<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">
          Parameters
          <div class="card-header-actions">
            <router-link tag="a" :to="{ name: 'ParameterNew' }">
              <add-icon />
            </router-link>
          </div>
        </header>
        <CCardBody>
          <CDataTable
            :items="paremeters"
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
                <router-link
                  tag="a"
                  :to="{ name: 'parameterEdit', params: { id: item.id } }"
                >
                  <edit-icon />
                </router-link>
              </td>
            </template>
            <template #show_delete="{item}">
              <td>
                <span class="icon-link" @click="modalOpen(item)"
                  ><delete-icon
                /></span>
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
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="parameterDelete"
        >
          Delete
        </CButton>
      </template>
      Delete step '{{ selectedParameter.name }}'?
    </CModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "parameterList",
  data() {
    return {
      selectedParameter: {},
      warningModal: false,
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:10%" },
        { key: "label", _style: "width:10%;" },
        { key: "descr", _style: "width:25%;" },
        { key: "default_val", _style: "width:10%;" },
        { key: "json_template", _style: "width:25%;" },

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
    ...mapGetters("parameter", ["parameters"])
  },
  methods: {
    parameterDelete() {
      this.$store.dispatch("parameter/delete", this.selectedParameter.id);
      this.warningModal = false;
    },
    modalOpen(parameter) {
      this.parameter = parameter;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    }
  },
  created() {
    this.$store.dispatch("parameter/findAll");
  }
};
</script>
