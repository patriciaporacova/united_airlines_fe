<template>
  <div class="chart-wrapper">
    <apexchart class="graph"
               :series="series"
               :options="{
        xaxis: {
           categories: categories
        },
        chart: {
          type: 'line',
          toolbar: {
                show: true
              },
             zoom: {
                enabled: false
              }
        },
        title: {
          text: this.chartTitle,
          align: 'center',
          style: style,
        },
        colors: this.colors
      }">
    </apexchart>
  </div>
</template>

<script>
//import moment from 'moment'
export default {
  name: "LineChart",
  props: ['chartTitle', 'categories', 'colors', 'series'],
  data() {
    return {
      style: {
        fontSize: '15px',
        color: '#4b4d54',
        floating: true,
        fontWeight: 400,
        fontFamily: 'Helvetica',
      },
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>