<template>
  <div class="row" v-if="parameter">
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
            <CTextarea
              rows="5"
              default_val="default_val"
              placeholder="default_val"
              v-model="parameter.default_val"
            />
            <p class="error" v-if="!$v.parameter.default_val.required">
              This field is required
            </p>
            <!--  <p class="error" v-if="!$v.parameter.default_val.minLength">
              Field must have at least
              {{ $v.parameter.default_val.$params.minLength.min }}
              characters.
            </p> -->
            <!--  <div>
              <vue-json-editor
                name="pippo"
                v-model="parameter.json_template"
              ></vue-json-editor>
            </div> -->

            <!-- :show-btns="true" :expandedOnStart="true"
            @json-change="onJsonChange" -->
            <!-- <JsonEditor
              :options="{
                confirmText: 'confirm',
                cancelText: 'cancel'
              }"
              :objData="parameter.json_template"
              v-model="parameter.json_template"
            >
            </JsonEditor> -->

            <!--   <json-editor
              ref="JsonEditor"
              :schema="schema"
              v-model="parameter.json_template"
            >
              <button @click="submit">submit</button>
              <button @click="reset">Reset</button>
            </json-editor> -->

            <CTextarea
              rows="5"
              json_template="json_template"
              placeholder="json_template"
              v-model="parameter.json_template"
            />
            <p class="error" v-if="!$v.parameter.json_template.required">
              This field is required
            </p>
            <p class="error" v-if="!$v.parameter.json_template.minLength">
              Field must have at least
              {{ $v.parameter.json_template.$params.minLength.min }}
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
/* import vueJsonEditor from "vue-json-editor"; */

export default {
  name: "ParameterEdit",
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
    ...mapGetters("parameter", ["parameter"])
  },
  validations: {
    parameter: {
      name: {
        required,
        minLength: minLength(3)
      },
      descr: {
        required,
        minLength: minLength(3)
      },
      default_val: {
        required
      },
      json_template: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/components/parameter");
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
