<template>
  <div class="row" v-if="process">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <form>
          <CCardBody>
            <div>
              <CRow>
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                </p>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </CRow>

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
                <CButton
                  color="primary"
                  type="submit"
                  value="Submit"
                  @click.prevent="handleSubmit"
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
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
import { axiosIs2 } from "@/http";
// eslint-disable-next-line no-unused-vars
import { required, minLength, between } from "vuelidate/lib/validators";
const querystring = require("querystring");

export default {
  name: "ProcessEdit",
  data() {
    return {
      process: null,
      errors: []
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    description: {
      minLength: minLength(4)
    },
    label: {
      required,
      minLength: minLength(2)
    },
    organization: {
      minLength: minLength(4)
    }
  },
  created() {
    axiosIs2.get("/processes/" + this.$route.params.id).then(response => {
      console.log(response);
      this.process = response.data;
    });
  },
  methods: {
    updateBusinessProcess() {
      axiosIs2
        .put(
          "/processes/" + this.process.id,
          querystring.stringify(this.process),
          config
        )
        .then(response => {
          console.log(response);
          this.process = response.data;
        });
    },
    goBusinessProcessList() {
      // eslint-disable-next-line no-redeclare

      // this.processes.splice(index, 1);
      this.$router.push("/catalogue/process");
    },
    handleSubmit() {
      if (
        this.process.name &&
        this.process.description &&
        this.process.label &&
        this.process.organization
      ) {
        axiosIs2
          .put(
            "/processes/" + this.process.id,
            querystring.stringify(this.process),
            config
          )
          .then(response => {
            console.log(response);
            this.process = response.data;
          });
        this.$router.push("/catalogue/process");
        return true;
      }

      this.errors = [];

      if (!this.process.name) {
        this.errors.push("Name required.");
      }
      if (!this.process.description) {
        this.errors.push("Description required.");
      }
      if (!this.process.label) {
        this.errors.push("Label required.");
      }
      if (!this.process.organization) {
        this.errors.push("Organization required.");
      }
    }
  }
};
</script>
