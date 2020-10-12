<template>
  <div class="row" v-if="step">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">Edit Process Step</header>
        <form>
          <CCardBody>
            <CInput label="Id" placeholder="Id" disabled />
            <CInput label="Name" placeholder="Name" v-model="step.name" />
            <p class="error" v-if="!$v.step.name.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.step.name.minLength">
              Field must have at least
              {{ $v.step.name.$params.minLength.min }}
              characters.
            </p>
            <CInput label="Label" placeholder="Label" v-model="step.label" />
            <p class="error" v-if="!$v.step.label.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.step.label.minLength">
              Field must have at least
              {{ $v.step.label.$params.minLength.min }}
              characters.
            </p>
            <CTextarea
              rows="5"
              label="Description"
              placeholder="Description"
              v-model="step.descr"
            />
            <p class="error" v-if="!$v.step.descr.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.step.descr.minLength">
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
    ...mapGetters("processStep", {
      step: "processStep"
    })
  },
  validations: {
    step: {
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

      if (this.error === false) {
        this.$store.dispatch("processStep/update", this.step);
        return true;
      }
    }
  },
  created() {
    this.$store.dispatch("processStep/findById", this.$route.params.id);
  }
};
</script>
