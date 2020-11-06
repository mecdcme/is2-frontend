<template>
  <CCard>
    <CCardBody class="pt-0 pb-0">
      <CInput
        label="Name*"
        placeholder="Name"
        :class="{ 'is-invalid': $v.localProcess.name.$error }"
        v-model="localProcess.name"
        @change="fieldChanged = true"
      />
      <div class="help-block" :class="{ show: $v.localProcess.name.$error }">
        This field is required
      </div>
      <CInput
        label="Label*"
        placeholder="Label"
        :class="{ 'is-invalid': $v.localProcess.label.$error }"
        v-model="localProcess.label"
        @change="fieldChanged = true"
      />
      <div class="help-block" :class="{ show: $v.localProcess.label.$error }">
        This field is required
      </div>
      <CTextarea
        rows="3"
        label="Description*"
        placeholder="Description"
        :class="{ 'is-invalid': $v.localProcess.description.$error }"
        v-model="localProcess.description"
        @change="fieldChanged = true"
      />
      <div
        class="help-block"
        :class="{ show: $v.localProcess.description.$error }"
      >
        This field is required
      </div>
      <CInput
        label="Organization*"
        placeholder="Organization"
        :class="{ 'is-invalid': $v.localProcess.organization.$error }"
        v-model="localProcess.organization"
        @change="fieldChanged = true"
      />
      <div
        class="help-block"
        :class="{ show: $v.localProcess.organization.$error }"
      >
        This field is required
      </div>
      <div class="form-mandatory">*Mandatory fields</div>
    </CCardBody>
    <CCardFooter>
      <CButton
        shape="square"
        size="sm"
        color="primary"
        style="margin-right:0.3rem"
        @click.prevent="handleSubmit"
        >Next</CButton
      >
    </CCardFooter>
  </CCard>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProcessDomain",
  props: {
    process: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      localProcess: { ...this.process },
      fieldChanged: false //do nothing if nothing changes
    };
  },
  validations: {
    localProcess: {
      name: {
        required
      },
      description: {
        required
      },
      label: {
        required
      },
      organization: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.$emit("update", this.localProcess, this.fieldChanged);
        this.fieldChanged = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
