<template>
  <CCard>
    <CCardHeader>Flow chart</CCardHeader>
    <CCardBody>
      <CButtonGroup class="pb-2">
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
        height="300"
        :nodes="nodes"
        :connections="connections"
        @editnode="handleEditNode"
        @editconnection="handleEditConnection"
        @dblclick="handleDblClick"
        @save="handleChartSave"
        :render="render"
        ref="chart"
      >
      </flowchart>
    </CCardBody>
    <CModal :show.sync="nodeDialog" title="Edit node">
      <CInput label="Name" placeholder="Name" v-model="nodeName" class="mb-2" />
      <CSelect
        label="Type"
        placeholder="Type"
        v-model="nodeType"
        :options="[
          { value: 'start', label: 'Start' },
          { value: 'end', label: 'End' },
          { value: 'operation', label: 'Operation' }
        ]"
      />
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
    <CModal :show.sync="connectionDialog" title="Edit connection">
      <CInput
        label="Name"
        placeholder="Name"
        v-model="connectionName"
        class="mb-2"
      />
      <CSelect
        label="Type"
        placeholder="Type"
        v-model="connectionType"
        :options="[
          { value: 'pass', label: 'Pass' },
          { value: 'reject', label: 'Reject' }
        ]"
      />
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

export default {
  name: "App",
  props: {
    nodes: {
      Type: Array,
      default: () => []
    },
    connections: {
      Type: Array,
      default: () => []
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
        type: "operation",
        descr: null
      });
    },
    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New Step",
        type: "operation",
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
      this.nodeName = connection.name;
      this.nodeType = connection.type;
      this.connectionForm.target = connection;
      this.connectionDialog = true;
    },
    nodeModalOk() {
      /* this.nodeForm.target.type = this.type.value(); */
      this.nodeForm.target.name = this.nodeName;
      this.nodeForm.target.type = this.nodeType;
      this.nodeDialog = false;
    },
    nodeModalClose() {
      this.nodeDialog = false;
    },
    connectionModalOk() {
      /*  this.connectionForm.target = this.type.value(); */
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
