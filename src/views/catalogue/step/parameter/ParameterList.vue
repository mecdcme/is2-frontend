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
            :items="viewParameters"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            sorter
            pagination
          >
            <template #show_update="{item}">
              <td>
                <router-link
                  tag="a"
                  :to="{ name: 'ParameterEdit', params: { id: item.id } }"
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
      Delete Parameter '{{ selectedParameter.name }}'?
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
        { key: "name", _style: "width:10%" },
        { key: "descr", _style: "width:20%;" },
        { key: "default_val", _style: "width:10%;" },
        { key: "json_template_truncate", _style: "width:30%;" },
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
    ...mapGetters("parameter", ["parameters"]),
    viewParameters() {
      return this.parameters.map(param => {
        return {
          ...param,
          json_template_truncate: this.truncate(param.json_template)
        };
      });
    }
  },
  methods: {
    parameterDelete() {
      this.$store.dispatch("parameter/delete", this.selectedParameter.id);
      this.warningModal = false;
    },
    modalOpen(parameter) {
      this.selectedParameter = parameter;
      this.warningModal = true;
    },
    modalClose() {
      this.warningModal = false;
    },
    truncate(field) {
      return field.length > 100 ? field.substring(0, 100) + "..." : field;
    }
  },
  created() {
    this.$store.dispatch("parameter/findAll");
  }
};
</script>
