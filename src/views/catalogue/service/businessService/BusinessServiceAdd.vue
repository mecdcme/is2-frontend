<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">New Service</header>
        <CCardBody>
          <div>
            <CRow>
              <CCol sm="9">
                <CInput
                  label="Name"
                  placeholder="Name"
                  v-model="service.name"
                />
                <p
                  class="error"
                  v-if="
                    !$v.service.name.required && uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.service.name.minLength && uiState === 'form submitted'
                  "
                >
                  Field must have at least
                  {{ $v.service.name.$params.minLength.min }}
                  characters.
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.service.name.checkName && uiState === 'form submitted'
                  "
                >
                  invalid character in field name.
                </p>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="9">
                <CInput
                  label="Description"
                  placeholder="Description"
                  v-model="service.description"
                />
                <p
                  class="error"
                  v-if="
                    !$v.service.description.required &&
                      uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.service.description.minLength &&
                      uiState === 'form submitted'
                  "
                >
                  Field must have at least
                  {{ $v.service.description.$params.minLength.min }}
                  characters.
                </p>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="9">
                <CInput
                  label="Organization"
                  placeholder="Organization"
                  v-model="service.organization"
                />
                <p
                  class="error"
                  v-if="
                    !$v.service.organization.required &&
                      uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.service.organization.minLength &&
                      uiState === 'form submitted'
                  "
                >
                  Field must have at least
                  {{ $v.service.organization.$params.minLength.min }}
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
                shape="square"
                size="sm"
                color="primary"
                style="margin-right:0.3rem"
                @click.prevent="handleSubmit"
                >Save
              </CButton>
              <CButton shape="square" size="sm" color="light" @click="goBack"
                >Back</CButton
              >
            </CCol>
          </CRow>
        </CCardFooter>
      </div>
    </div>
  </div>
</template>
<script>

import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "ServiceAdd",
  data() {
    return {
      uiState: "submit not clicked",
      errore: false,
      formTouched: false,
      empty: true,
      service: {
        name: "",
        description: "",
        organization: ""
      },
      errors: []
    };
  },
  validations: {
    service: {
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
      description: {
        required,
        minLength: minLength(4)
      },
      organization: {
        required,
        minLength: minLength(4)
      }
    }
  },

  methods: {
    goBack() {
      this.$router.push("/catalogue/service");
    },
    handleSubmit() {
      this.formTouched = !this.$v.service.$anyDirty;
      this.errore = this.$v.service.$invalid;
      this.uiState = "FORM_SUBMITTED";

      if (this.errore === false) {
        this.$store.dispatch("businessService/save", this.service);
        this.$router.push("/catalogue/service");        
      }
    }
  }
};
</script>
