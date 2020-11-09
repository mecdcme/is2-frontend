<template>
  <div class="row" v-if="parameter">
    <div class="col-sm-12 col-md-6">
      <CCard>
        <CCardHeader>
          Parameter
        </CCardHeader>
        <CCardBody>
          <CInput
            label="Name*"
            placeholder="Name"
            :class="{ 'is-invalid': $v.parameter.name.$error }"
            v-model="parameter.name"
          />
          <div class="help-block" :class="{ show: $v.parameter.name.$error }">
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
          <div class="help-block" :class="{ show: $v.parameter.descr.$error }">
            This field is required
          </div>
          <CTextarea
            rows="3"
            label="Json template"
            placeholder="Json template"
            v-model="parameter.json_template"
          />
          <div class="help-block">
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
            >Save</CButton
          >
          <CButton shape="square" size="sm" color="light" @click="goBack"
            >Back</CButton
          >
        </CCardFooter>
      </CCard>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ParameterEdit",
  computed: {
    ...mapGetters("parameter", ["parameter"])
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
        this.$store.dispatch("parameter/update", this.parameter).then(() => {
          this.goBack();
        });
      }
    },
    goBack() {
      this.$router.push("/components/parameter");
    }
  },
  created() {
    this.$store.dispatch("parameter/findById", this.$route.params.id);
  }
};
</script>
