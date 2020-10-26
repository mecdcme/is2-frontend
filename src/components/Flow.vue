<template>
  <CCard>
    <CCardHeader>Workflow</CCardHeader>
    <CCardBody>
      <CButtonGroup class="pb-2" v-if="!readonly">
        <CButton
          shape="square"
          size="sm"
          color="primary"
          class="mr-2"
          @click="addNode"
        >
          Add node
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          class="mr-2"
          @click="$refs.chart.remove()"
        >
          Delete node
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="$refs.chart.save()"
        >
          Save graph
        </CButton>
      </CButtonGroup>
      <flowchart
        width="100%"
        height="600"
        :nodes="nodes"
        :connections="connections"
        @editnode="handleEditNode"
        @editconnection="handleEditConnection"
        @save="handleChartSave"
        :render="render"
        :readonly="readonly"
        ref="chart"
      >
      </flowchart>
    </CCardBody>

    <!-- Node modal-->
    <CModal :show.sync="nodeDialog" title="Node">
      <CInput label="Name" placeholder="Name" v-model="nodeName" class="mb-2" />
      <label for="ntype">Type</label>
      <select class="form-control" v-model="nodeType"
        ><option value="start"> Start </option
        ><option value="end"> End </option
        ><option value="operation">
          Operation
        </option></select
      >
      <template #footer>
        <CButton
          shape="square"
          size="sm"
          color="light"
          @click="nodeModalClose()"
        >
          Close
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="nodeModalOk()"
        >
          Update
        </CButton>
      </template>
    </CModal>

    <!-- Connection modal-->
    <CModal :show.sync="connectionDialog" title="Connection">
      <CInput
        label="Name"
        placeholder="Name"
        v-model="connectionName"
        class="mb-2"
      />
      <label>Type</label
      ><select class="form-control" v-model="connectionType"
        ><option value="pass"> Pass </option
        ><option value="reject">
          Reject
        </option></select
      >
      <template #footer>
        <CButton
          shape="square"
          size="sm"
          color="light"
          @click="connectionModalClose()"
        >
          Close
        </CButton>
        <CButton
          shape="square"
          size="sm"
          color="primary"
          @click="connectionModalOk()"
        >
          Update
        </CButton>
      </template>
    </CModal>
  </CCard>
</template>
<script>
import { render } from "@/common";
import { nodeType } from "@/common";

export default {
  name: "Flow",
  props: {
    nodes: {
      Type: Array,
      default: () => []
    },
    connections: {
      Type: Array,
      default: () => []
    },
    readonly: {
      Type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialog: false,
      connectionDialog: false,
      nodeName: "",
      nodeType: "",
      connectionName: "",
      connectionType: ""
    };
  },
  methods: {
    render,
    addNode() {
      this.$refs.chart.add({
        id: +new Date(),
        x: 10,
        y: 10,
        name: "New Step",
        type: nodeType.Operation,
        descr: null
      });
    },
    handleEditNode(node) {
      this.nodeName = node.name;
      this.nodeType = node.type;
      this.nodeForm.target = node;
      this.nodeDialog = true;
    },
    handleEditConnection(connection) {
      this.connectionName = connection.name;
      this.connectionType = connection.type;
      this.connectionForm.target = connection;
      this.connectionDialog = true;
    },
    nodeModalOk() {
      this.nodeForm.target.name = this.nodeName;
      this.nodeForm.target.type = this.nodeType;
      if (this.nodeType == "start") {
        this.nodeForm.target.name = "Start";
        this.nodeForm.target.id = 0;
      }
      if (this.nodeType == "end") {
        this.nodeForm.target.name = "End";
        this.nodeForm.target.id = 99;
      }
      if (this.nodeType == "operation") {
        this.nodeForm.target.name = "New Step";
        this.nodeForm.target.id = null;
      }
      this.nodeDialog = false;
    },
    nodeModalClose() {
      this.nodeDialog = false;
    },
    connectionModalOk() {
      this.connectionForm.target.name = this.connectionName;
      this.connectionForm.target.type = this.connectionType;
      this.connectionDialog = false;
    },
    connectionModalClose() {
      this.connectionDialog = false;
    },
    handleChartSave(nodes, connections) {
      var graph = {
        nodes: nodes,
        connections: connections
      };
      this.$emit("saveGraph", graph);
    }
  }
};
</script>

<style scoped>
.modal-header {
  padding: 0.75rem;
}
</style>
