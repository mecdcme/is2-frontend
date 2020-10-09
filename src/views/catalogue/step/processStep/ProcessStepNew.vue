<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">New Process Step</header>
        <CCardBody>
          <div>
            <CRow>
              <CCol sm="9">
                <CInput label="Name" placeholder="Name" v-model="step.name" />
                <p
                  class="error"
                  v-if="!$v.step.name.required && uiState === 'form submitted'"
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="!$v.step.name.minLength && uiState === 'form submitted'"
                >
                  Field must have at least
                  {{ $v.step.name.$params.minLength.min }}
                  characters.
                </p>
                <p
                  class="error"
                  v-if="!$v.step.name.checkName && uiState === 'form submitted'"
                >
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
                <p
                  class="error"
                  v-if="!$v.step.label.required && uiState === 'form submitted'"
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.step.label.minLength && uiState === 'form submitted'
                  "
                >
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
                <p
                  class="error"
                  v-if="!$v.step.descr.required && uiState === 'form submitted'"
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.step.descr.minLength && uiState === 'form submitted'
                  "
                >
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
                >Save</CButton
              >
              <CButton @click="goProcessStepList()">Cancel</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { axiosIs2 } from "@/http";
// eslint-disable-next-line no-unused-vars
import { required, minLength, between } from "vuelidate/lib/validators";
/* const querystring = require("querystring"); */
import { config } from "@/common";
export default {
  name: "ProcessNew",
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
    step: {
      id: {},
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

  methods: {
    handleSubmit() {
      this.formTouched = !this.$v.step.$anyDirty;
      this.errore = this.$v.step.$invalid;
      this.uiState = "form submitted";
      if (this.errore === false) {
        this.$store
          .dispatch("processStep/save", this.step, config)
          .then(response => {
            console.log(response);
            /* this.$router.push("/catalogue/process"); */
          });

        //this is where you send the responses

        return true;
      }
    },
    goProcessStepList() {
      this.$router.push("/catalogue/processstep");
    }
  }
};
</script>
