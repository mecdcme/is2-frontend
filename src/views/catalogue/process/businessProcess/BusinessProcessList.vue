<template>
  <div class="row">
    <div class="col-sm-6 col-md-9">
      <div class="card ">
        <header class="card-header">
          Business processes
        </header>
        <div class="card-body">
          <div>
            <b-table striped hover :items="items"></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Probabilistic record linkage",
          description: "Probabilistic record linkage",
          label: "PRL",
          organization: "Istat"
        },
        {
          id: 2,
          name: "Deterministic record linkage",
          description: "Deterministic record linkage",
          label: "DRL",
          organization: "Istat"
        },
        {
          id: 3,
          name: "Probabilistic record linkage with blocking",
          description: "Probabilistic record linkage with blocking",
          label: "PRLBlock",
          organization: "Istat"
        },
        {
          id: 4,
          name: "Data validation in R",
          description: "Data validation in R",
          label: "ValidateR",
          organization: "Istat"
        }
      ]
    };
  },
  methods: {
    addRow() {
      this.rows.push({
        row: []
      });
    },
    removeRow: function(index) {
      console.log("Removing", index);
      this.rows.splice(index, 1);
    }
  }
};
</script>
