<template>
  <div class="row" v-if="service">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Service</header>
        <form>
          <CCardBody>
            <div>
              <CRow>
                <CCol sm="9">
                  <CInput label="Id" placeholder="Id" disabled />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Name"
                    placeholder="Name"
                    v-model="service.name"
                  />
                  <p class="error" v-if="!$v.service.name.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.service.name.minLength">
                    Field must have at least
                    {{ $v.service.name.$params.minLength.min }}
                    characters.
                  </p>
                  <p class="error" v-if="!$v.service.name.checkName">
                    invalid character in field name.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Description"
                    placeholder="Description"
                    v-model="service.description"
                  />
                  <p class="error" v-if="!$v.service.description.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.service.description.minLength">
                    Field must have at least
                    {{ $v.service.description.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Organization"
                    placeholder="Organization"
                    v-model="service.organization"
                  />
                  <p class="error" v-if="!$v.service.organization.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.service.organization.minLength">
                    Field must have at least
                    {{ $v.service.organization.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
            </div>
          </CCardBody>
          <CCardFooter>
            <CRow class="d-flex justify-content-middle">
              <CCol sm="9">
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
              </CCol>
            </CRow>
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
  name: "ServiceEdit",
  data() {
    return {
      error: false,
      formTouched: false,
      errors: []
    };
  },
  computed: {
    ...mapGetters("businessService", {
      service: "businessService"
    })
  },
  validations: {
    service: {
      name: {
        required,
        minLength: minLength(4)
      },
      description: {
        required,
        minLength: minLength(4)
      },
      organization: {
        required,
        minLength: minLength(4)
      }
    }
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
  },
  methods: {
    goBack() {
      this.$router.push("/catalogue/service");
    },
    goBusinessServiceList() {
      this.$router.push("/catalogue/service");
    },
    handleSubmit() {
      this.formTouched = !this.$v.service.$anyDirty;
      this.error = this.$v.service.$invalid;

      if (this.error === false) {
        this.$store.dispatch("businessService/update", this.service);
        this.$router.push("/catalogue/service");
      }
    }
  }
};
</script>
