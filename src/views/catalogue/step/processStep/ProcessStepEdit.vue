<template>
  <div class="row" v-if="process">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <form>
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
                  <p class="error" v-if="!$v.process.name.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.name.minLength">
                    Field must have at least
                    {{ $v.process.name.$params.minLength.min }}
                    characters.
                  </p>
                  <p class="error" v-if="!$v.process.name.checkName">
                    invalid character in field name.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Description"
                    placeholder="Description"
                    v-model="process.description"
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
                    v-model="process.label"
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
                    v-model="process.organization"
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
import { axiosIs2 } from "@/http";
/* import { config } from "@/common";
// eslint-disable-next-line no-unused-vars
const querystring = require("querystring"); */
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ProcessEdit",
  data() {
    return {
      uiState: "submit not clicked",
      errore: false,
      formTouched: false,
      empty: true,
      process: {
        name: "",
        description: "",
        label: "",
        organization: ""
      },
      errors: []
    };
  },
  validations: {
    process: {
      name: {
        required,
        minLength: minLength(4),
        checkName(name) {
          return (
            /[a-z]/.test(name) && !/[0-9]/.test(name) // checks for a-z
          );
        }
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
    updateBusinessProcess() {
      this.$store.dispatch("businessProcess/update", this.process);
    },
    goBusinessProcessList() {
      this.$router.push("/catalogue/process");
    },
    handleSubmit() {
      this.formTouched = !this.$v.process.$anyDirty;
      this.errore = this.$v.process.$invalid;

      if (this.errore === false) {
        this.$store.dispatch("businessProcess/update", this.process);

        this.uiState = "form submitted";

        return true;
      }
    }
  }
};
</script>
