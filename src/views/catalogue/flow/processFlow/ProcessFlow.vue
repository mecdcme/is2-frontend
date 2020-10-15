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
    <CModal
      style="width: 320px;"
      :show.sync="nodeDialog"
      :node.sync="nodeForm.target"
      :operation="nodeForm.operation"
    >
      <div class="header"><span>Edit</span></div>
      <div class="body">
        <label for="name">Name</label
        ><input id="name" class="form-control" /><label for="type">Type</label
        ><select id="type" class="form-control"
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
    <CModal
      style="width: 320px;"
      :show.sync="connectionDialog"
      :connection.sync="connectionForm.target"
    >
      <div class="header"><span>Edit</span></div>
      <div class="body">
        <label for="name">Name</label
        ><input id="name" class="form-control" /><label for="type">Type</label
        ><select id="type" class="form-control"
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
import { roundTo20 } from "@/common";
import * as d3 from "d3";
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
      connectionDialog: false
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
      this.nodeForm.target = node;
      this.nodeDialog = true;
    },
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.connectionDialog = true;
    },
    nodeModalOk() {
      /* this.nodeForm.target.type = this.type.value(); */
      this.nodeDialog = false;
    },
    nodeModalClose() {
      this.nodeDialog = false;
    },
    connectionModalOk() {
      /*  this.connectionForm.target = this.type.value(); */
      this.connectionDialog = false;
    },
    connectionModalClose() {
      this.connectionDialog = false;
    },
    render: function(g, node, isSelected) {
      node.width = node.width || 120;
      node.height = node.height || 60;
      let borderColor = isSelected ? "#666666" : "#bbbbbb";
      if (node.type !== "start" && node.type !== "end") {
        // title
        if (node.id !== 3) {
          g.append("rect")
            .attr("x", node.x)
            .attr("y", node.y)
            .attr("stroke", borderColor)
            .attr("class", "title")
            .style("height", "20px")
            .style("fill", "#f1f3f4")
            .style("stroke-width", "1px")
            .style("width", node.width + "px");
          g.append("text")
            .attr("x", node.x + 4)
            .attr("y", node.y + 15)
            .attr("class", "unselectable")
            .text(() => node.name)
            .each(function wrap() {
              let self = d3.select(this),
                textLength = self.node().getComputedTextLength(),
                text = self.text();
              while (textLength > node.width - 2 * 4 && text.length > 0) {
                text = text.slice(0, -1);
                self.text(text + "...");
                textLength = self.node().getComputedTextLength();
              }
            });
        }
      }
      // body
      if (node.id === 3) {
        let body = g.append("ellipse").attr("class", "body");
        body.attr("cx", node.x + node.width / 2);
        body.attr("cy", node.y + node.height / 2);
        body.attr("rx", node.width / 2);
        body.attr("ry", node.height / 2);
        body.style("fill", "white");
        body.style("stroke-width", "1px");
        body.classed(node.type, true);
        body.attr("stroke", borderColor);
      } else {
        let body = g.append("rect").attr("class", "body");
        body
          .style("width", node.width + "px")
          .style("fill", "white")
          .style("stroke-width", "1px");
        if (node.type !== "start" && node.type !== "end") {
          body.attr("x", node.x).attr("y", node.y + 20);
          body.style("height", roundTo20(node.height - 20) + "px");
        } else {
          body
            .attr("x", node.x)
            .attr("y", node.y)
            .classed(node.type, true)
            .attr("rx", 30);
          body.style("height", roundTo20(node.height) + "px");
        }
        body.attr("stroke", borderColor);
      }

      // body text
      let text =
        node.type === "start"
          ? "Start"
          : node.type === "end"
          ? "End"
          : !node.approvers || node.approvers.length === 0
          ? "No approver"
          : node.approvers.length > 1
          ? `${node.approvers[0].name + "..."}`
          : node.approvers[0].name;
      let bodyTextY;
      if (node.type !== "start" && node.type !== "end") {
        if (node.id === 3) {
          bodyTextY = node.y + 25;
        } else {
          bodyTextY = node.y + 25 + roundTo20(node.height - 20) / 2;
        }
      } else {
        bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
      }
      g.append("text")
        .attr("x", node.x + node.width / 2)
        .attr("y", bodyTextY)
        .attr("class", "unselectable")
        .attr("text-anchor", "middle")
        .text(function() {
          return text;
        })
        .each(function wrap() {
          let self = d3.select(this),
            textLength = self.node().getComputedTextLength(),
            text = self.text();
          while (textLength > node.width - 2 * 4 && text.length > 0) {
            text = text.slice(0, -1);
            self.text(text + "...");
            textLength = self.node().getComputedTextLength();
          }
        });
    }
  }
};
</script>
