<template>
  <div>
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
      process: {},
      nodes: [],
      connections: []
    };
  },
  computed: {
    ...mapGetters("businessProcess", ["businessProcesses"]),
    processes() {
      var procs = [];
      if (this.businessProcesses) {
        this.businessProcesses.forEach(element => {
          procs.push({
            id: element.id,
            name: element.name,
            graph: element.graph ? element.graph : {}
          });
        });
      }
      return procs;
    }
  },
  methods: {
    handleSelectInput() {
      //if process has a graph
      if (this.process) {
        this.nodes = this.process.graph.nodes;
        this.connections = this.process.graph.connections;
      }
    },
    handleSaveGraph(graph) {
      //check if process is selected
      if (this.process != null && Object.keys(this.process).length === 0) {
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
