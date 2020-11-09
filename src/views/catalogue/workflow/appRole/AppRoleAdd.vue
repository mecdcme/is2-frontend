<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">New App Role</header>
        <CCardBody>
          <CInput label="Name" placeholder="Name" v-model="approle.name" />
          <p
            class="error"
            v-if="!$v.approle.name.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.approle.name.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.approle.name.$params.minLength.min }}
            characters.
          </p>
          <CTextarea
            rows="5"
            label="Description"
            placeholder="Description"
            v-model="approle.descr"
          />
          <p
            class="error"
            v-if="!$v.approle.descr.required && uiState === 'FORM_SUBMITTED'"
          >
            This field is required
          </p>
          <p
            class="error"
            v-if="!$v.approle.descr.minLength && uiState === 'FORM_SUBMITTED'"
          >
            Field must have at least
            {{ $v.approle.descr.$params.minLength.min }}
            characters.
          </p>
          <CInput
            label="Order Code"
            placeholder="Order Code"
            v-model="approle.order_code"
          />
          <p
            class="error"
            v-if="
              !$v.approle.order_code.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <CInput
            label="Cls Data Type Id"
            placeholder="Cls Data Type Id"
            v-model="approle.cls_data_type_id"
          />
          <p
            class="error"
            v-if="
              !$v.approle.cls_data_type_id.required &&
                uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
          </p>
          <CInput
            label="Parameter Id"
            placeholder="Parameter Id"
            v-model="approle.parameter_id"
          />
          <p
            class="error"
            v-if="
              !$v.approle.parameter_id.required && uiState === 'FORM_SUBMITTED'
            "
          >
            This field is required
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
      approle: {
        name: "",
        label: "",
        descr: "",
        order_code: "",
        cls_data_type_id: "",
        parameter_id: ""
      }
    };
  },
  validations: {
    approle: {
      name: {
        required,
        minLength: minLength(3)
      },
      descr: {
        required,
        minLength: minLength(3)
      },
      order_code: {
        required
      },
      cls_data_type_id: {
        required
      },
      parameter_id: {
        required
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/components/approle");
    },
    handleSubmit() {
      this.formTouched = !this.$v.approle.$anyDirty;
      this.error = this.$v.approle.$invalid;
      this.uiState = "FORM_SUBMITTED";

      if (this.error === false) {
        this.$store.dispatch("approle/save", this.approle);
        this.$router.push("/components/approle");
      }
    }
  }
};
</script>
