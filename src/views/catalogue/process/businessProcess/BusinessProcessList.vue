<template>
  <CCardBody>
    <CDataTable
      :items="items"
      :fields="fields"
      column-filter
      table-filter
      items-per-page-select
      :items-per-page="5"
      hover
      sorter
      pagination
    >
      <template #status="{item}">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{ item.status }}
          </CBadge>
        </td>
      </template>
      <template #show_details="{item}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item)"
          >
            {{ Boolean(item._toggled) ? "Hide" : "Show" }}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <h4>
                {{ item.name }}
              </h4>
              <p class="text-muted">Registered: {{ item.registered }}</p>
              <CButton size="sm" color="info" class="">
                User Settings
              </CButton>
              <CButton
                size="sm"
                color="danger"
                class="ml-1"
                @click="deleteItem(item)"
              >
                Delete
              </CButton>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
</template>
<script>
var items = [
  {
    id: 1,
    name: "Probabilistic record linkage",
    description: "Probabilistic record linkage",
    label: "PRL",
    organization: "Istat",
    registered: "10/10/2020",
    status: "Active"
  },
  {
    id: 2,
    name: "Deterministic record linkage",
    description: "Deterministic record linkage",
    label: "DRL",
    organization: "Istat",
    registered: "10/10/2020",
    status: "Active"
  },
  {
    id: 3,
    name: "Probabilistic record linkage with blocking",
    description: "Probabilistic record linkage with blocking",
    label: "PRLBlock",
    organization: "Istat",
    registered: "10/10/2020",
    status: "Inactive"
  },
  {
    id: 4,
    name: "Data validation in R",
    description: "Data validation in R",
    label: "ValidateR",
    organization: "Istat",
    registered: "10/10/2020",
    status: "Pending"
  }
];
const fields = [
  { key: "name", _style: "width:20%" },
  { key: "description", _style: "width:30%" },
  { key: "label", _style: "width:10%" },
  { key: "organization", _style: "width:20%" },
  "registered",
  { key: "status", _style: "width:20%;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];
export default {
  name: "AdvancedTables",
  data() {
    return {
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
      collapseDuration: 0
    };
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    deleteItem(item) {
      item.splice();
    }
  }
};
</script>
