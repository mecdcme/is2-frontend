<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <CCardBody>
          <div>
            <CRow>
              <CCol sm="9">
                <CInput label="Id" placeholder="Id" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="9">
                <CInput
                  label="Name"
                  placeholder="Name"
                  v-model="process.name"
                />
                <p class="error" v-if="!$v.process.name.required">
                  This field is required
                </p>
                <p class="error" v-if="!$v.process.name.minLength">
                  Field must have at least
                  {{ $v.process.name.$params.minLength.min }}
                  characters.
                </p>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="9">
                <CInput
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
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="9">
                <CInput
                  label="Label"
                  placeholder="Label"
                  v-model="process.label"
                />
                <p class="error" v-if="!$v.process.label.required">
                  This field is required
                </p>
                <p class="error" v-if="!$v.process.label.minLength">
                  Field must have at least
                  {{ $v.process.label.$params.minLength.min }}
                  characters.
                </p>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="9">
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
              </CCol>
            </CRow>
          </div>
        </CCardBody>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { axiosIs2 } from "@/http";
// eslint-disable-next-line no-unused-vars
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  name: "ProcessNew",
  data() {
    return {
      process: {
        name: "",
        description: "",
        label: "",
        organization: ""
      }
    };
  },
  validations: {
    process: {
      name: {
        required,
        minLength: minLength(4)
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
  }
  /*  created() {
    axiosIs2.get("/processes/" + this.$route.params.id).then(response => {
      console.log(response);
      this.process = response.data;
    });
  } */
};
</script>
