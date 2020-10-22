<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <CCardBody>
          <CInput label="Name" placeholder="Name" v-model="process.name" />
          <p
            class="error"
            v-if="!$v.process.name.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.process.name.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.process.name.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Description"
            placeholder="Description"
            v-model="process.description"
          />
          <p
            class="error"
            v-if="
              !$v.process.description.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="
              !$v.process.description.minLength && uiState === 'FORM_SUBMITTED'
            "
          >
            Field must have at least
            {{ $v.process.description.$params.minLength.min }}
            characters.
          </p>
          <CInput label="Label" placeholder="Label" v-model="process.label" />
          <p
            class="error"
            v-if="!$v.process.label.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.process.label.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.process.label.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Organization"
            placeholder="Organization"
            v-model="process.organization"
          />
          <p
            class="error"
            v-if="
              !$v.process.organization.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="
              !$v.process.organization.minLength && uiState === 'FORM_SUBMITTED'
            "
          >
            Field must have at least
            {{ $v.process.organization.$params.minLength.min }}
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
      id: {},
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      label: {
        required,
        minLength: minLength(3)
      },
      organization: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/catalogue/process");
    },
    handleSubmit() {
      this.formTouched = !this.$v.process.$anyDirty;
      this.errore = this.$v.process.$invalid;
      this.uiState = "FORM_SUBMITTED";

      if (this.errore === false) {
        this.$store.dispatch("businessProcess/save", this.process);
        this.$router.push("/catalogue/process");
      }
    }
  }
};
</script>
