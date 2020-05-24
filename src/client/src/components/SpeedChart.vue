<template>
  <div>
    <LineChart :data="properData" :options="options" />
    <div class="buttonGroup">
      <button type="button" @click="changeToHours">hour</button>
      <button type="button" @click="changeToMinutes">minutes</button>
      <button type="button" @click="changeToSeconds">seconds</button>
    </div>
  </div>
</template>

<script>
import LineChart from './common/LinearChart';
import moment from 'moment';

export default {
  props: {
    dataSnapshot: {
      time: Number,
      speed: Number,
    },
  },
  components: {
    LineChart,
  },
  watch: {
    dataSnapshot(value) {
      const historyLength = this.dataHistory.length;
      if (historyLength === 0) {
        this.dataHistory.push({
          y: value.speed,
          x: value.time,
        });
        return;
      }

      const prevTime = moment(this.dataHistory[historyLength - 1].x);

      const currentTime = moment(value.time);
      if (!currentTime.isSame(prevTime, this.timeScale)) {
        this.dataHistory.push({
          x: value.time,
          y: value.speed,
        });
      }
      if (historyLength > 20) {
        this.dataHistory.shift();
      }
    },
  },
  computed: {
    properData() {
      return {
        data: {
          datasets: [
            {
              label: 'Speed (km/h)',
              data: this.dataHistory,
            },
          ],
          backgroundColor: '#00d23e',
          borderColor: '#00d23e',
        },
      };
    },
  },
  data() {
    return {
      dataHistory: [],
      timeScale: 'seconds',
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 12,
                beginAtZero: true,
                suggestedMax: 150,
                callback(value) {
                  return `${value} km/h`;
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    changeScale(type) {
      return (this.timeScale = type);
    },
    changeToSeconds() {
      this.changeScale('seconds');
    },
    changeToMinutes() {
      this.changeScale('minutes');
    },
    changeToHours() {
      this.changeScale('hours');
    },
  },
};
</script>

<style scoped>
.buttonGroup button:first-child {
  border-radius: 4px 0 0 4px;
}
.buttonGroup button:last-child {
  border-radius: 0 4px 4px 0;
}
.buttonGroup button {
  border: 1px solid cadetblue;
  padding: 8px;
}
</style>
