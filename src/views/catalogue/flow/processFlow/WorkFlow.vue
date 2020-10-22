<template>
  <div v-if="processes">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <CCard>
          <CCardHeader>
            Business processes
          </CCardHeader>
          <CCardBody>
            <v-select
              label="name"
              :options="processes"
              v-model="process"
              placeholder="Select a process"
              @input="handleSelectInput"
            ></v-select>
          </CCardBody>
        </CCard>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <app-flow
          :nodes="nodes"
          :connections="connections"
          @saveGraph="handleSaveGraph"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Flow from "@/components/Flow";

export default {
  name: "Workflow",
  components: {
    "app-flow": Flow
  },
  data: function() {
    return {
      process: null,
      nodes: [],
      connections: []
    };
  },
  computed: {
    ...mapGetters("businessProcess", { processes: "businessProcesses" })
  },
  methods: {
    handleSelectInput() {
      //if process has a graph
      if (this.process != null && this.process.graph) {
        this.nodes = this.process.graph.nodes;
        this.connections = this.process.graph.connections;
      }
    },
    handleSaveGraph(graph) {
      //check if process is selected
      if (this.process == null) {
        alert("Please select a process!");
      } else {
        this.process.graph = graph;
        this.$store.dispatch("businessProcess/update", this.process);
        return true;
      }
    }
  },
  created() {
    this.$store.dispatch("businessProcess/findAll");
  }
};
</script>
