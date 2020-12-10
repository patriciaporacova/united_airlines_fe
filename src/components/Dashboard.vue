<template>
  <div class="dashboard">

    <h1>Flights</h1>
    <!--Total flights for each month-->
    <lineChart chart-title="Total flights per month"
               :categories=this.months
               :series="[{
            name: 'Likes',
            data: this.flights
          }]">
    </lineChart>

    <!--Top ten destination and total flights to them-->
    <barChart chart-title="Top 10 destinations"
              :bar-options="{ horizontal: false,
                              columnWidth: '65%',
                              endingShape: 'rounded'}"
              :categories="this.topTenDestinations.map(e => e.destination)"
              :series="[{
           data: this.topTenDestinations.map(e => e.totalFlights)
          }]"></barChart>

    <!--Top ten destination and total flights to them from origins-->
    <barChart chart-title="Top 10 destinations"
              :bar-options="{ horizontal: false,
                              columnWidth: '65%',
                              endingShape: 'rounded'}"
              :categories="this.topTenDestinations.map(e => e.destination)"
              :series="[{
             name: 'EWR',
            data: flattenArray(this.topTenDestinations.map(e => e.origin.filter(f=>f.origin==='EWR').map(g=>g.flights)))
          },{
            name: 'JFK',
            data: flattenArray(this.topTenDestinations.map(e => e.origin.filter(f=>f.origin==='JFK').map(g=>g.flights)))
          },{
            name: 'LGA',
            data: flattenArray(this.topTenDestinations.map(e => e.origin.filter(f=>f.origin==='LGA').map(g=>g.flights)))
          }]"></barChart>

    <!--Total flights from origins-->
    <barChart chart-title="Flights from origins"
              :bar-options="{ horizontal: false,
                              columnWidth: '65%',
                              endingShape: 'rounded'}"
              :categories=this.months
              :series="[{
            name: 'EWR',
            data: this.originFlights.ewr
          },{
            name: 'JFK',
            data: this.originFlights.jfk
          },{
            name: 'LGA',
            data: this.originFlights.lga
          }]"></barChart>

    <!--Total flights from origin stacked-->
    <barChart chart-title="Flights from origins stacked"
              :stacked=true
              :bar-options="{ horizontal: false,
                              columnWidth: '65%',
                              }"
              :categories=this.months
              :series="[{
            name: 'EWR',
            data: this.originFlights.ewr
          },{
            name: 'JFK',
            data: this.originFlights.jfk
          },{
            name: 'LGA',
            data: this.originFlights.lga
          }]"></barChart>

    <!--Total flights from origins in percentage-->
    <barChart chart-title="Flights from origins in %"
              :stacked=true
              stack-type="100%"
              :dataLabelsVisibility=true
              :bar-options="{ horizontal: false,
                              columnWidth: '65%',
                              dataLabels: {
                                  orientation: 'vertical',
                                  position: 'center' // bottom/center/top
                                 }
                              }"
              :categories=this.months
              :series="[{
             name: 'EWR',
            data: this.originFlights.ewr.map((el, inx)=> (el*100/flights[inx]).toFixed(2))
          },{
            name: 'JFK',
            data: this.originFlights.jfk.map((el, inx)=> (el*100/flights[inx]).toFixed(2))
          },{
            name: 'LGA',
            data: this.originFlights.lga.map((el, inx)=> (el*100/flights[inx]).toFixed(2))
          }]"></barChart>

    <!--Mean airtime in origins-->
    <pieChart chart-title="Mean airtime in origin"
              :labels="this.airtime.map(e=>e.origin)"
              :series="this.airtime.map(e=>e.airtime)">
    </pieChart>

    <!--Mean delays from origin stacked-->
    <barChart chart-title="Mean delays in origin"
              :bar-options="{ horizontal: false,
                              columnWidth: '65%',
                              }"
              :categories="this.delays.origin"
              :series="[{
            name: 'Departures',
            data: this.delays.dep
          },{
            name: 'Arrivals',
            data: this.delays.arr
          }]"></barChart>

    <h1>Weather</h1>
    <!--Number of weather records in origins-->
    <pieChart chart-title="Weather records for each origin"
              :labels="this.weatherRecords.map(e=>e.origin)"
              :series="this.weatherRecords.map(e=>e.observation_count)">
    </pieChart>

    <!--Mean temperature in origins-->
    <date-time-line-chart
        chart-title="Mean temperature in origins"
        :categories="this.days"
        :series="[{name: 'EWR',data: this.meanTemp.ewr},
          {name: 'JFK',data: this.meanTemp.jfk},
          {name: 'LGA',data: this.meanTemp.lga}
                  ]"
    ></date-time-line-chart>

    <!--Mean temperature in origins-->
    <date-time-line-chart
        chart-title="Mean temperature at JFK"
        type="line"
        :categories="this.days"
        :series="[{name: 'JFK',data: meanTemp.jfk},]"
    ></date-time-line-chart>

    <!--Temperature attributes in origins-->
    <div class="chart-wrapper">
      <apexchart class="graph" :options=" {
                chart: { type: 'scatter' },
                title: {
                  text: 'Temperature attributes in origins',
                   style: style,
                  align: 'center' },
                xaxis: {
                  type: 'datetime',
                  labels: {
                format: 'MMM yyyy'}}
              }"
                 :series="[{name: 'dew point', data: temperatureAtJfk.dew},
               {name: 'temperature', data: temperatureAtJfk.temp},

               ]"></apexchart>
    </div>

    <!--Temperature attributes at JFK-->
    <div class="chart-wrapper">
      <apexchart class="graph" :options=" {
                chart: { type: 'scatter' },
                title: {
                  text: 'Temperature attributes at JFK',
                   style: style,
                  align: 'center' },
                xaxis: {
                  type: 'datetime',
                  labels: {
                format: 'MMM yyyy'}}
              }"
                 :series="[{name: 'JFK temperature',data: this.temperature.jfk.temp},
          {name: 'JFK dew point',data: this.temperature.jfk.dew},
          {name: 'EWR temperature',data: this.temperature.ewr.temp},
          {name: 'EWR dew point',data: this.temperature.ewr.dew},
          {name: 'LGA temperature',data: this.temperature.lga.temp},
          {name: 'LGA dew point',data: this.temperature.lga.dew},]"></apexchart>
    </div>
    <h1>Planes</h1>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import lineChart from './LineChart.vue';
import barChart from './BarChart.vue';
import pieChart from './PieChart.vue';
import dateTimeLineChart from './DatetimeLineChart.vue';

export default {
  name: 'Dashboard',
  mounted() {
    this.$store.dispatch('fetchFlights');
    this.$store.dispatch('fetchAirtime');
    this.$store.dispatch('fetchDelays');
    this.$store.dispatch('fetchTopTenDestinations');
    this.$store.dispatch('fetchOriginFlights');

    this.$store.dispatch('fetchTemp');
    this.$store.dispatch('fetchWeatherRecords');
    this.$store.dispatch('fetchMeanTemperature');
  },
  data() {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      style: {
        fontSize: '15px',
        color: '#4b4d54',
        floating: true,
        fontWeight: 400,
        fontFamily: 'Helvetica',
      },
    }
  },
  components: {
    lineChart, barChart, pieChart, dateTimeLineChart
  },
  methods: {
    flattenArray(array) {
      return array.reduce((total, next) => {
        return total.concat(next)
      }, [])
    },
  },
  computed: {
    ...mapGetters([
      'flights',
      'originFlights',
      'topTenDestinations',
      'delays',
      'airtime',

      'temperatureAtJfk',
      'temperature',
      'weatherRecords',
      'meanTemp',
      'meanTempJfk',
      'days',


    ]),
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.chart-wrapper {
  box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0.5em;
  width: 45%;
  margin: 0.5em;
}
</style>
