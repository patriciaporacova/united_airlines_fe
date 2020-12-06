<template>
  <div>
    <p>List of airlines: </p>
    <div v-for="airline in airlines" :key="airline.carrier">
      <p>{{airline.carrier}} - {{airline.name}} </p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Dashboard',
  mounted() {
    this.$store.dispatch('fetchAirlines');
  },
  computed: {
    ...mapGetters([
      'airlines']),
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
