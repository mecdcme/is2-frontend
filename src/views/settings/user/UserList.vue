<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card ">
        <header class="card-header">
          Users
        </header>
        <div class="card-body">
          <CDataTable
            :items="users"
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
                  color="outline-dark"
                  square
                  size="sm"
                  @click="userEdit(item.id)"
                  >Update</CButton
                >
              </td>
            </template>
            <template #show_delete="{item}">
              <td class="py-2">
                <CButton
                  color="outline-dark"
                  square
                  size="sm"
                  @click="userDelete(item.id)"
                  >Delete</CButton
                >
              </td>
            </template>
          </CDataTable>

          <div class="card-footer">
            <Button class="btn btn-outline-dark btn-sm" @click="userAdd()"
              >Add</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "UserList",
  data() {
    return {
      fields: [
        { key: "id", _style: "width:5%" },
        { key: "name", _style: "width:15%" },
        { key: "surname", _style: "width:15%;" },
        { key: "email", _style: "width:20%;" },
        { key: "role", _style: "width:10%;" },
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
    ...mapGetters("user", ["users"])
  },
  methods: {
    userDelete(id) {
      this.$router.push("/settings/users/UserDelete/" + id);
    },
    userEdit(id) {
      this.$router.push("/settings/users/UserEdit/" + id);
    },
    userAdd() {
      this.$router.push("/settings/users/UserAdd/");
    }
  },
  created() {
    this.$store.dispatch("user/findAll");
  }
};
</script>
