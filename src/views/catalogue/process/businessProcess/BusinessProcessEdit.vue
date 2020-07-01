<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <form
          id="app"
          @submit="checkForm"
          action="https://vuejs.org/"
          method="post"
        >
          <CCardBody>
            <div>
              <CRow>
                <CCol sm="9">
                  <CInput label="Id" placeholder="Id" disabled />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Name"
                    placeholder="Name"
                    v-model="process.name"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Description"
                    placeholder="Description"
                    v-model="process.description"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Label"
                    placeholder="Label"
                    v-model="process.label"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Organization"
                    placeholder="Organization"
                    v-model="process.organization"
                  />
                </CCol>
              </CRow>
            </div>
          </CCardBody>
          <CCardFooter>
            <CRow class="d-flex justify-content-middle">
              <CCol sm="9">
                <CButton color="primary" type="submit" value="Submit"
                  >Update</CButton
                >
                <CButton @click="goBusinessProcessList()">Cancel</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { axiosIs2 } from "@/http";
export default {
  name: "UserEdit",
  data() {
    return {
      process: null
    };
  },
  created() {
    axiosIs2.get("/processes/" + this.$route.params.id).then(response => {
      console.log(response);
      this.process = response.data;
    });
  },
  methods: {
    goBusinessProcessList() {
      // eslint-disable-next-line no-redeclare

      // this.processes.splice(index, 1);
      this.$router.push("/catalogue/process");
    }
  }
};
</script>
