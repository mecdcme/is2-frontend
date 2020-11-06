<template>
  <div class="row" v-if="approle">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">Edit App Role</header>
        <form>
          <CCardBody>
            <CInput label="Id" placeholder="Id" disabled />
            <CInput label="Code" placeholder="Code" v-model="approle.code" />
            <p class="error" v-if="!$v.approle.code.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.approle.code.minLength">
              Field must have at least
              {{ $v.approle.code.$params.minLength.min }}
              characters.
            </p>
            <CInput label="Name" placeholder="Name" v-model="approle.name" />
            <p class="error" v-if="!$v.approle.name.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.approle.name.minLength">
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
            <p class="error" v-if="!$v.approle.descr.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.approle.descr.minLength">
              Field must have at least
              {{ $v.approle.descr.$params.minLength.min }}
              characters.
            </p>
            <CInput
              label="Order Code"
              placeholder="Order Code"
              v-model="approle.order_code"
            />
            <p class="error" v-if="!$v.approle.order_code.required">
              This field is required
            </p>
            <CInput
              label="Cls Data Type Id"
              placeholder="Cls Data Type Id"
              v-model="approle.cls_data_type_id"
            />
            <p class="error" v-if="!$v.approle.cls_data_type_id.required">
              This field is required
            </p>
            <CInput
              label="Parameter Id"
              placeholder="Parameter Id"
              v-model="approle.parameter_id"
            />
            <p class="error" v-if="!$v.approle.parameter_id.required">
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
/* import vueJsonEditor from "vue-json-editor"; */

export default {
  name: "appRoleEdit",
  /* components: {
    "vue-json-editor": vueJsonEditor
  }, */
  // components: { JsonEditor },
  data() {
    return {
      error: false,
      formTouched: false
    };
  },
  computed: {
    ...mapGetters("approle", ["approle"])
  },
  validations: {
    approle: {
      code: {
        required,
        minLength: minLength(1)
      },
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

      if (this.error === false) {
        this.$store.dispatch("approle/update", this.approle);
        this.$router.push("/components/approle");
      }
    }
  },
  created() {
    this.$store.dispatch("approle/findById", this.$route.params.id);
  }
};
</script>
