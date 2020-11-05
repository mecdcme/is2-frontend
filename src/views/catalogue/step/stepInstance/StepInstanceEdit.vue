<template>
  <div class="row" v-if="stepInstance">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">Edit Step Instance</header>
        <form>
          <CCardBody>
            <CInput label="Id" placeholder="Id" disabled />
            <CInput
              label="Method"
              placeholder="Method"
              v-model="stepInstance.method"
            />
            <p class="error" v-if="!$v.stepInstance.method.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.stepInstance.method.minLength">
              Field must have at least
              {{ $v.stepInstance.method.$params.minLength.min }}
              characters.
            </p>
            <CInput
              label="Label"
              placeholder="Label"
              v-model="stepInstance.label"
            />
            <p class="error" v-if="!$v.stepInstance.label.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.stepInstance.label.minLength">
              Field must have at least
              {{ $v.stepInstance.label.$params.minLength.min }}
              characters.
            </p>
            <CTextarea
              rows="5"
              label="Description"
              placeholder="Description"
              v-model="stepInstance.descr"
            />
            <p class="error" v-if="!$v.stepInstance.descr.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.stepInstance.descr.minLength">
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
  name: "stepInstanceEdit",
  data() {
    return {
      error: false,
      formTouched: false
    };
  },
  computed: {
    ...mapGetters("stepInstance", ["stepInstance"])
  },
  validations: {
    stepInstance: {
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

      if (this.error === false) {
        this.$store.dispatch("stepInstance/update", this.stepInstance);
        this.$router.push("/components/stepInstance");
      }
    }
  },
  created() {
    this.$store.dispatch("stepInstance/findById", this.$route.params.id);
  }
};
</script>
