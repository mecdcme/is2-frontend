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
                    v-model="$v.process.name.$model"
                  />
                  <p class="error" v-if="!$v.process.name.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.name.minLength">
                    Field must have at least
                    {{ $v.process.name.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Description"
                    placeholder="Description"
                    v-model="$v.process.description.$model"
                  />
                  <p class="error" v-if="!$v.process.description.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.description.minLength">
                    Field must have at least
                    {{ $v.process.description.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Label"
                    placeholder="Label"
                    v-model="$v.process.label.$model"
                  />
                  <p class="error" v-if="!$v.process.label.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.label.minLength">
                    Field must have at least
                    {{ $v.process.label.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Organization"
                    placeholder="Organization"
                    v-model="$v.process.organization.$model"
                  />
                  <p class="error" v-if="!$v.process.organization.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.organization.minLength">
                    Field must have at least
                    {{ $v.process.organization.$params.minLength.min }}
                    characters.
                  </p>
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
      process: {
        name: "",
        description: "",
        label: "",
        organization: ""
      },
      /*  process: [], */
      errors: []
    };
  },
  validations: {
    process: {
      name: {
        required,
        minLength: minLength(4)
      },
      description: {
        required,
        minLength: minLength(4)
      },
      label: {
        required,
        minLength: minLength(4)
      },
      organization: {
        required,
        minLength: minLength(4)
      }
    }
  },
  created() {
    axiosIs2.get("/processes/" + this.$route.params.id).then(response => {
      console.log(response);
      this.process = response.data;
    });
  },
  methods: {
    /*  setName(value) {
      this.process.name = value;
      this.process.$v.name.$touch();
    },
    setDescription(value) {
      this.process.description = value;
      this.process.$v.description.$touch();
    },
    setLabel(value) {
      this.process.label = value;
      this.process.$v.label.$touch();
    },
    setOrganization(value) {
      this.process.organization = value;
      this.process.$v.organization.$touch();
    }, */
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
