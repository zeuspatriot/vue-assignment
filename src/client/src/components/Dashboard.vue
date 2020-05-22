<template>
  <div class="root">
    <div id="dashboard">
      <Meter :value="speed || 0" :max="150" label="km/h" />
      <Meter :value="soc || 0" :max="100" label="%" />
      <SpeedChart :dataSnapshot="speedChartData" />
      <SOCChart :dataSnapshot="socChartData" />
    </div>
  </div>
</template>

<script>
import Meter from './common/Meter';
import SpeedChart from './SpeedChart';
import SOCChart from './SOCChart';
import moment from 'moment';

export default {
  components: {
    Meter,
    SpeedChart,
    SOCChart,
  },
  data() {
    return { speed: 0, soc: 0, time: null };
  },
  computed: {
    speedChartData() {
      console.log('still computing dashboard');
      return { time: this.time, speed: this.speed };
    },
    socChartData() {
      return { time: this.time, soc: this.soc };
    },
  },
  mounted() {
    const url = 'ws://localhost:3000';
    this.connectToWebsocket(url);
  },
  methods: {
    connectToWebsocket(url) {
      const connection = new WebSocket(url);
      connection.onopen = () => {
        console.log('Connection to WebSocket Succesful');
      };
      connection.onmessage = ({ data }) => {
        const dataDTO = JSON.parse(data);
        // console.log('data', dataDTO);
        if (!moment(dataDTO.time).isValid()) {
          return;
        }
        this.time = dataDTO.time;
        this.speed = dataDTO.speed;
        this.soc = dataDTO.soc;
      };
      connection.onerror = (error) => {
        console.log(`Error during WebSocket connection: ${error}`);
      };
      connection.onclose = () => {
        console.log('Connection closed');
      };
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
}
div#dashboard {
  margin: 0 auto;
}
</style>
