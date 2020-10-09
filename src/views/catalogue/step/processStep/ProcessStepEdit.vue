<template>
  <div class="row" v-if="step">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process Step</header>
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
                  <CInput label="Name" placeholder="Name" v-model="step.name" />
                  <p class="error" v-if="!$v.step.name.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.step.name.minLength">
                    Field must have at least
                    {{ $v.step.name.$params.minLength.min }}
                    characters.
                  </p>
                  <p class="error" v-if="!$v.step.name.checkName">
                    invalid character in field name.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Label"
                    placeholder="Label"
                    v-model="step.label"
                  />
                  <p class="error" v-if="!$v.step.label.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.step.label.minLength">
                    Field must have at least
                    {{ $v.step.label.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Description"
                    placeholder="Description"
                    v-model="step.descr"
                  />
                  <p class="error" v-if="!$v.step.descr.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.step.descr.minLength">
                    Field must have at least
                    {{ $v.step.descr.$params.minLength.min }}
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
                <CButton @click="goProcessStepList()">Cancel</CButton>
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
      step: {
        name: "",
        label: "",
        descr: ""
      }
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
      label: {
        required,
        minLength: minLength(4)
      },
      descr: {
        required,
        minLength: minLength(4)
      }
    }
  },
  created() {
    axiosIs2.get("/process_steps/" + this.$route.params.id).then(response => {
      console.log(response);
      this.step = response.data;
    });
  },
  methods: {
    updateBusinessProcess() {
      this.$store.dispatch("processStep/update", this.step);
    },
    goProcessStepList() {
      this.$router.push("/catalogue/processstep");
    },
    handleSubmit() {
      this.formTouched = !this.$v.step.$anyDirty;
      this.errore = this.$v.step.$invalid;

      if (this.errore === false) {
        this.$store.dispatch("processSteps/update", this.step);

        this.uiState = "form submitted";

        return true;
      }
    }
  }
};
</script>
