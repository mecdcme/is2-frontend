<template>
  <div id="app">
    <button
      type="button"
      @click="
        $refs.chart.add({
          id: +new Date(),
          x: 10,
          y: 10,
          name: 'New',
          type: 'operation',
          approvers: []
        })
      "
    >
      Add
    </button>
    <button type="button" @click="$refs.chart.remove()">
      Del
    </button>
    <button type="button" @click="$refs.chart.editCurrent()">
      Edit
    </button>
    <button type="button" @click="$refs.chart.save()">
      Save
    </button>
    <flowchart
      :nodes="nodes"
      :connections="connections"
      @editnode="handleEditNode"
      @dblclick="handleDblClick"
      @editconnection="handleEditConnection"
      @save="handleChartSave"
      ref="chart"
    >
    </flowchart>
    <CModal style="width: 320px;" :show.sync="nodeDialog">
      <div class="header"><span>Edit</span></div>
      <div class="body">
        <label for="name">Name</label
        ><input id="name" class="form-control" v-model="nodeName" />
        <label for="type">Type</label>
        <select id="type" class="form-control" v-model="nodeType"
          ><option value="start"> Start </option
          ><option value="end"> End </option
          ><option value="operation">
            Operation
          </option></select
        ><label for="approver">Approver</label
        ><select id="approver" class="form-control"
          ><option value="1"> Joyce </option
          ><option value="2"> Allen </option
          ><option value="3">
            Teresa
          </option></select
        >
      </div>
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
    <CModal style="width: 320px;" :show.sync="connectionDialog">
      <div class="header"><span>Edit</span></div>
      <div class="body">
        <label for="name">Name</label
        ><input id="name" class="form-control" v-model="connectionName" /><label
          for="type"
          >Type</label
        ><select id="type" class="form-control" v-model="connectionType"
          ><option value="pass"> Pass </option
          ><option value="reject">
            Reject
          </option></select
        >
      </div>
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
  </div>
</template>
<script>
import Vue from "vue";
import FlowChart from "flowchart-vue";
Vue.use(FlowChart);

export default {
  name: "App",
  data: function() {
    return {
      nodes: [
        // Basic fields
        { id: 1, x: 140, y: 270, name: "Start", type: "start" },
        // You can add any generic fields to node, for example: description
        // It will be passed to @save, @editnode
        {
          id: 2,
          x: 540,
          y: 270,
          name: "End",
          type: "end",
          description: "Im here"
        }
      ],
      connections: [
        {
          source: { id: 1, position: "right" },
          destination: { id: 2, position: "left" },
          id: 1,
          type: "pass"
        }
      ],
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
    /* handleChartSave(nodes, connections) {
      // axios.post(url, {nodes, connections}).then(resp => {
      //   this.nodes = resp.data.nodes;
      //   this.connections = resp.data.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });
    }, */
    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New",
        type: "operation",
        approvers: []
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
    }
  }
};
</script>
