<template>
  <div class="row" v-if="step">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">Edit Parameter</header>
        <form>
          <CCardBody>
            <CInput label="Id" placeholder="Id" disabled />
            <CInput label="Name" placeholder="Name" v-model="parameter.name" />
            <p class="error" v-if="!$v.parameter.name.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.parameter.name.minLength">
              Field must have at least
              {{ $v.parameter.name.$params.minLength.min }}
              characters.
            </p>
            <CInput
              label="Label"
              placeholder="Label"
              v-model="parameter.label"
            />
            <p class="error" v-if="!$v.parameter.label.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.parameter.label.minLength">
              Field must have at least
              {{ $v.parameter.label.$params.minLength.min }}
              characters.
            </p>
            <CTextarea
              rows="5"
              label="Description"
              placeholder="Description"
              v-model="parameter.descr"
            />
            <p class="error" v-if="!$v.parameter.descr.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.parameter.descr.minLength">
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
              >Update</CButton
            >
            <CButton shape="square" size="sm" color="light" @click="goBack"
              >Back</CButton
            >
          </CCardFooter>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "ProcessEdit",
  data() {
    return {
      error: false,
      formTouched: false
    };
  },
  computed: {
    ...mapGetters("parameter", ["parameters"])
  },
  validations: {
    parameter: {
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
      this.formTouched = !this.$v.parameter.$anyDirty;
      this.error = this.$v.parameter.$invalid;

      if (this.error === false) {
        this.$store.dispatch("parameter/update", this.parameter);
        this.$router.push("/components/parameter");
      }
    }
  },
  created() {
    this.$store.dispatch("parameter/findById", this.$route.params.id);
  }
};
</script>
