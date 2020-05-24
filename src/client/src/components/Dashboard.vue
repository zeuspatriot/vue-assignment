<template>
  <div class="root">
    <Map />
    <div id="dashboard">
      <div class="statBlock">
        <div class="infoContainer">
          <div>Current Speed</div>
          <Meter :value="speed || 0" :max="150" label="km/h" />
        </div>
        <div class="infoContainer">
          <div>State of Charge</div>
          <Meter :value="soc || 0" :max="100" label="%" />
        </div>
        <div class="stats">
          <div class="item">
            <div>
              Energy
            </div>
            <div>{{ energy }} kW</div>
          </div>
          <div class="item">
            <div>
              Odometer
            </div>
            <div>{{ odo }} km</div>
          </div>
        </div>
      </div>
      <div class="speedSection section">
        <div class="title">Speed Profile</div>
        <SpeedChart :dataSnapshot="speedChartData" />
      </div>
      <div class="socSection section">
        <div class="title">State of Charge Profile</div>
        <SOCChart :dataSnapshot="socChartData" />
      </div>
    </div>
  </div>
</template>

<script>
import Map from './Map';
import Meter from './common/Meter';
import SpeedChart from './SpeedChart';
import SOCChart from './SOCChart';
import moment from 'moment';

export default {
  components: {
    Map,
    Meter,
    SpeedChart,
    SOCChart,
  },
  data() {
    return { speed: 0, soc: 0, time: null, gps: [0, 0], odo: 0, energy: 0 };
  },
  computed: {
    speedChartData() {
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
        if (!moment(dataDTO.time).isValid()) {
          return;
        }
        this.gps = dataDTO.gps.split('/');
        this.time = dataDTO.time;
        this.speed = dataDTO.speed;
        this.odo = dataDTO.odo;
        this.soc = dataDTO.soc;
        this.energy = dataDTO.energy;
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
.infoContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.stats {
  display: flex;
  flex-direction: row;
}
.stats .item {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.section .title {
  margin: 8px 0;
}
</style>
