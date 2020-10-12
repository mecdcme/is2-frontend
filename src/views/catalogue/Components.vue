<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Process steps</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of process steps available in the
          catalogue.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'ProcessStepList' }"
              ><span>Go to process steps <chevron-right-icon /></span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Roles</span>
        </header>
        <div class="card-body">
          This section contains the list of roles available in the catalogue.
          <p class="section-link section-link-disabled">
            <span>Go to roles <chevron-right-icon /></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Context } from "@/common";

export default {
  name: "Components",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  }
};
</script>

<style scoped>
.material-design-icon > .material-design-icon__svg {
  bottom: -0.17rem;
}
</style>
