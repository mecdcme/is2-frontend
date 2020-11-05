<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">New Step Instance</header>
        <CCardBody>
          <CInput
            label="Method"
            placeholder="Method"
            v-model="stepInstance.method"
          />
          <p
            class="error"
            v-if="
              !$v.stepInstance.method.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="
              !$v.stepInstance.method.minLength && uiState === 'FORM_SUBMITTED'
            "
          >
            Field must have at least
            {{ $v.stepInstance.method.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Label"
            placeholder="Label"
            v-model="stepInstance.label"
          />
          <p
            class="error"
            v-if="
              !$v.stepInstance.label.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="
              !$v.stepInstance.label.minLength && uiState === 'FORM_SUBMITTED'
            "
          >
            Field must have at least
            {{ $v.Instance.label.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Description"
            placeholder="Description"
            v-model="stepInstance.descr"
          />
          <p
            class="error"
            v-if="
              !$v.stepInstance.descr.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="
              !$v.stepInstance.descr.minLength && uiState === 'FORM_SUBMITTED'
            "
          >
            Field must have at least
            {{ $v.stepInstance.descr.$params.minLength.min }}
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
  name: "StepInstanceNew",
  data() {
    return {
      uiState: "SUBMIT_NOT_CLICKED",
      error: false,
      formTouched: false,
      empty: true,
      stepInstance: {
        method: "",
        label: "",
        descr: "",
        app_service_id: "300"
      }
    };
  },
  validations: {
    stepInstance: {
      id: {},
      method: {
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
      this.$router.push("/components/stepInstance");
    },
    handleSubmit() {
      this.formTouched = !this.$v.stepInstance.$anyDirty;
      this.error = this.$v.stepInstance.$invalid;
      this.uiState = "FORM_SUBMITTED";

      if (this.error === false) {
        this.$store.dispatch("stepInstance/save", this.stepInstance);
        this.$router.push("/components/stepInstance");
      }
    }
  }
};
</script>
