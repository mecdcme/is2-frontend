<template>
  <div v-if="processes">
    <div class="row">
      <div class="col-sm-12 col-md-12">
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
      <div class="col-sm-3 col-md-3">
        <CCard>
          <CCardHeader>
            Process steps
          </CCardHeader>
          <CCardBody>
            <draggable v-model="processSteps" ghost-class="ghost" @end="onEnd">
              <transition-group type="transition" name="step-list">
                <CAlert
                  color="secondary"
                  :id="element.id"
                  v-for="element in processSteps"
                  :key="element.id"
                >
                  <cog-icon class="mr-2" /><span>{{ element.name }} </span>
                </CAlert>
              </transition-group>
            </draggable>
          </CCardBody>
        </CCard>
      </div>

      <div class="col-sm-9 col-md-9">
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
import draggable from "vuedraggable";

export default {
  name: "Mergedflow",
  components: {
    "app-flow": Flow,
    draggable
  },
  data: function() {
    return {
      process: null,
      nodes: [],
      connections: [],
      offsetx: 0
    };
  },
  computed: {
    ...mapGetters("businessProcess", { processes: "businessProcesses" }),
    ...mapGetters("processStep", ["processSteps"])
  },
  methods: {
    handleSelectInput() {
      //if process has a graph
      if (this.process != null && this.process.graph) {
        this.nodes = this.process.graph.nodes;
        this.connections = this.process.graph.connections;
      } else {
        this.nodes = [];
        this.connections = [];
      }
    },
    handleSaveGraph(graph) {
      //check if process is selected
      if (this.process == null) {
        alert("Please select a process!");
      } else {
        var updatedProcess = {
          id: this.process.id,
          name: this.process.name,
          description: this.process.description,
          organization: this.process.organization,
          graph: graph
        };
        this.$store.dispatch("businessProcess/updateGraph", updatedProcess);
      }
    },
    onEnd(evt) {
      this.$children[2].$children[0].add({
        id: evt.item.id,
        x: evt.item.offsetWidth + this.offsetx,
        y: evt.item.offsetTop,

        name: evt.item.innerText,
        type: "operation",
        descr: null
      });
      this.offsetx = this.offsetx + 20;
    }
  },
  created() {
    this.$store.dispatch("businessProcess/findAll");
    this.$store.dispatch("processStep/findAll");
  }
};
</script>

<style scoped>
.alert {
  position: relative;
  padding: 0.5rem 1.25rem;
  margin-bottom: 0.8rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-color: #d8dbe0;
  font-size: 0.8rem;
}
.sortable-chosen {
  cursor: move;
}
/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.sortable-chosen:active {
  cursor: move;
}
</style>
