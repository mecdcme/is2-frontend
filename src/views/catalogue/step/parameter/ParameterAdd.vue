<template>
  <div class="row">
    <div class="col-12">
      <CCard>
        <CCardHeader>
          Parameter
        </CCardHeader>
        <CCardBody>
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-2', content: 'col-md-10' }"
            :active-tab="0"
          >
            <CTab>
              <template #title>
                <span>Basic</span>
              </template>
              <div class="row">
                <div class="col-6">
                  <CCard class="card-no-border">
                    <CCardBody>
                      <CInput
                        label="Name*"
                        placeholder="Name"
                        :class="{ 'is-invalid': $v.parameter.name.$error }"
                        v-model="parameter.name"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.parameter.name.$error }"
                      >
                        This field is required
                      </div>
                      <CInput
                        label="Default value"
                        placeholder="Default value"
                        v-model="parameter.default_val"
                      />
                      <div class="help-block">
                        This field is required
                      </div>
                      <CTextarea
                        rows="3"
                        label="Description*"
                        placeholder="Description"
                        :class="{ 'is-invalid': $v.parameter.descr.$error }"
                        v-model="parameter.descr"
                      />
                      <div
                        class="help-block"
                        :class="{ show: $v.parameter.descr.$error }"
                      >
                        This field is required
                      </div>
                    </CCardBody>
                    <CCardFooter>
                      <CButton
                        shape="square"
                        size="sm"
                        color="primary"
                        class="mr-2"
                        @click.prevent="handleSubmit"
                        >Next</CButton
                      >
                    </CCardFooter>
                  </CCard>
                </div>
              </div>
            </CTab>
            <CTab title="Json template" disabled> </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ParameterNew",
  data() {
    return {
      parameter: {
        name: "",
        descr: "",
        default_val: ""
      }
    };
  },
  validations: {
    parameter: {
      name: {
        required
      },
      descr: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.parameter.$invalid) {
        var localParameter = { ...this.parameter, json_template: {} };
        this.$store.dispatch("parameter/save", localParameter).then(data => {
          this.$router.push(
            "/components/parameter/edit/" + data.id + "?step=2"
          );
        });
      }
    }
  }
};
</script>
