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
                  color="primary"
                  type="submit"
                  value="Submit"
                  @click.prevent="handleSubmit"
                  >Update</CButton
                >
                <CButton @click="goBusinessServiceList()">Cancel</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosIs2 } from "@/http";
import { config } from "@/common";
// eslint-disable-next-line no-unused-vars
import { required, minLength, between } from "vuelidate/lib/validators";
const querystring = require("querystring");

export default {
  name: "ServiceEdit",
  data() {
    return {
      uiState: "submit not clicked",
      errore: false,
      formTouched: false,
      empty: true,
      service: {
        name: "",
        description: "",        
        organization: ""
      },
      /*  service: [], */
      errors: []
    };
  },
  validations: {
    service: {
      name: {
        required,
        minLength: minLength(4),
        checkName(name) {
          return (
            /[a-z]/.test(name) && !/[0-9]/.test(name) // checks for a-z
          );
        }
      },
      description: {
        required,
        minLength: minLength(4)
      },
      label: {
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
    axiosIs2.get("/services/" + this.$route.params.id).then(response => {
      console.log(response);
      this.service = response.data;
    });
  },
  methods: {
    updateBusinessService() {
      axiosIs2
        .put(
          "/services/" + this.service.id,
          querystring.stringify(this.service),
          config
        )
        .then(response => {
          console.log(response);
          this.service = response.data;
        });
    },
    goBusinessServiceList() {
      this.$router.push("/catalogue/service");
    },
    handleSubmit() {
      this.formTouched = !this.$v.service.$anyDirty;
      this.errore = this.$v.service.$invalid;

      if (this.errore === false) {
        axiosIs2
          .put(
            "/services/" + this.service.id,
            querystring.stringify(this.service),
            config
          )
          .then(response => {
            console.log(response);
            this.service = response.data;
          });

        //this is where you send the responses
        this.uiState = "form submitted";
        this.$router.push("/catalogue/service");
        return true;
      }


    }
  }
};
</script>
