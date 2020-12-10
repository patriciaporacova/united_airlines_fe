<template>
  <div class="chart-wrapper">
    <apexchart class="graph" type="line" :series="series" :options=" {
            chart: {
              type: 'line',
            },
             title: {
          text: chartTitle,
          align: 'center',
          style: style,
        },
          xaxis:{
              type:'datetime',
              categories: categories,
          }
      }"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "DatetimeLineChart",
  props: ['chartTitle', 'categories', 'series',],
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
}
</script>

<style scoped>

</style>