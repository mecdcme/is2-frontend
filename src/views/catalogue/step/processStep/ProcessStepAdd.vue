<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">New Process Step</header>
        <CCardBody>
          <CInput label="Name" placeholder="Name" v-model="step.name" />
          <p
            class="error"
            v-if="!$v.step.name.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.step.name.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.step.name.$params.minLength.min }}
            characters.
          </p>
          <CInput label="Label" placeholder="Label" v-model="step.label" />
          <p
            class="error"
            v-if="!$v.step.label.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.step.label.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.step.label.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Description"
            placeholder="Description"
            v-model="step.descr"
          />
          <p
            class="error"
            v-if="!$v.step.descr.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.step.descr.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.step.descr.$params.minLength.min }}
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
  name: "ProcessNew",
  data() {
    return {
      uiState: "SUBMIT_NOT_CLICKED",
      error: false,
      formTouched: false,
      empty: true,
      step: {
        name: "",
        label: "",
        descr: "",
        business_service_id: "300"
      }
    };
  },
  validations: {
    step: {
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
      this.$router.push("/components/step");
    },
    handleSubmit() {
      this.formTouched = !this.$v.step.$anyDirty;
      this.error = this.$v.step.$invalid;
      this.uiState = "FORM_SUBMITTED";

      if (this.error === false) {
        this.$store.dispatch("processStep/save", this.step);
        return true;
      }
    }
  }
};
</script>
