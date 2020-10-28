<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">New Parameter</header>
        <CCardBody>
          <CInput label="Name" placeholder="Name" v-model="parameter.name" />
          <p
            class="error"
            v-if="!$v.parameter.name.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.parameter.name.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.parameter.name.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Description"
            placeholder="Description"
            v-model="parameter.descr"
          />
          <p
            class="error"
            v-if="!$v.parameter.descr.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.parameter.descr.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.parameter.descr.$params.minLength.min }}
            characters.
          </p>
        </CCardBody>
        <CCardFooter>
          <CButton
            shape="square"
            size="sm"
            color="primary"
            style="margin-right:0.3rem"
            @click.prevent="handleSubmit"
            >Save</CButton
          >
          <CButton shape="square" size="sm" color="light" @click="goBack"
            >Back</CButton
          >
        </CCardFooter>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "ParameterNew",
  data() {
    return {
      uiState: "SUBMIT_NOT_CLICKED",
      error: false,
      formTouched: false,
      empty: true,
      parameter: {
        name: "",
        label: "",
        descr: ""
      }
    };
  },
  validations: {
    parameter: {
      id: {},
      name: {
        required,
        minLength: minLength(3)
      },
      label: {
        required,
        minLength: minLength(3)
      },
      descr: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/components/parameter");
    },
    handleSubmit() {
      this.formTouched = !this.$v.parameter.$anyDirty;
      this.error = this.$v.parameter.$invalid;
      this.uiState = "FORM_SUBMITTED";

      if (this.error === false) {
        this.$store.dispatch("parameter/save", this.parameter);
        this.$router.push("/components/parameter");
      }
    }
  }
};
</script>
