<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol col="7" md="7" xl="4">
          <div class="card-group">
            <div class="card text-white bg-gradient-primary d-md-down-none">
              <div class="card-body text-center">
                <div class="mt-2">
                  <h2>IS<sup>2</sup> Workbench</h2>
                  <p style="margin-bottom:5rem">
                    Welcome to an open source environment that offers a set of
                    statistical services to process your data. Services are
                    classified according to GSBPM standard and can be chained in
                    processes.
                  </p>
                  <p class="mb-0">
                    The project has been developed in the context of SERV2
                    ESSNet.
                  </p>
                </div>
              </div>
            </div>
            <CCard class="mb-0">
              <CCardHeader align="center">
                <h3 class="mt-3">Sign in to IS<sup>2</sup> Workbench</h3>
              </CCardHeader>
              <CCardBody class="mb-0 mt-3">
                <CForm>
                  <CAlert color="danger" v-if="errorMsg" class="text-center">
                    <span>{{ errorMsg }}</span>
                  </CAlert>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <CIcon name="cilUser"></CIcon>
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        v-model.trim="username"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <CIcon name="cil-lock-locked"></CIcon>
                        </div>
                      </div>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="password"
                      />
                    </div>
                  </div>
                  <CRow>
                    <CCol col="12">
                      <CButton
                        shape="square"
                        size="sm"
                        color="primary"
                        @click.prevent="handleSubmit"
                        >Sign in</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["errorMsg"])
  },
  methods: {
    handleSubmit() {
      const formData = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("auth/login", formData).then(
        this.$router.push("/") //Go to main page
      );
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 0.4rem;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.logo {
  width: 30%;
  margin-bottom: 0.4rem;
  margin-top: 0.3rem;
}

.register {
  margin-top: 2rem;
  border-top: 1px solid #d8dbe0;
  padding-top: 0.8rem;
  text-align: center;
}

.btn:focus,
.btn-success:focus {
  box-shadow: none;
}

.btn-success:not(:disabled):not(.disabled):active:focus,
.btn-success:not(:disabled):not(.disabled).active:focus {
  box-shadow: none;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-control:focus {
  outline: 0;
  box-shadow: none;
  color: #768192;
  background-color: #fff;
  border-color: #d8dbe0;
}

.welcome {
  margin-bottom: 0px;
}
</style>
