<template>
  <div class="row" v-if="process">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <form>
          <CCardBody>
            <CInput label="Id" placeholder="Id" disabled />
            <CInput label="Name" placeholder="Name" v-model="process.name" />
            <p class="error" v-if="!$v.process.name.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.process.name.minLength">
              Field must have at least
              {{ $v.process.name.$params.minLength.min }}
              characters.
            </p>
            <CTextarea
              rows="3"
              label="Description"
              placeholder="Description"
              v-model="process.description"
            />
            <p class="error" v-if="!$v.process.description.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.process.description.minLength">
              Field must have at least
              {{ $v.process.description.$params.minLength.min }}
              characters.
            </p>
            <CInput label="Label" placeholder="Label" v-model="process.label" />
            <p class="error" v-if="!$v.process.label.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.process.label.minLength">
              Field must have at least
              {{ $v.process.label.$params.minLength.min }}
              characters.
            </p>
            <CInput
              label="Organization"
              placeholder="Organization"
              v-model="process.organization"
            />
            <p class="error" v-if="!$v.process.organization.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.process.organization.minLength">
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
      formTouched: false,
      errors: []
    };
  },
  computed: {
    ...mapGetters("businessProcess", {
      process: "businessProcess"
    })
  },
  validations: {
    process: {
      name: {
        required,
        minLength: minLength(4)
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
      this.error = this.$v.process.$invalid;

      if (this.error === false) {
        this.$store.dispatch("businessProcess/update", this.process);
        return true;
      }
    }
  },
  created() {
    this.$store.dispatch("businessProcess/findById", this.$route.params.id);
  }
};
</script>
