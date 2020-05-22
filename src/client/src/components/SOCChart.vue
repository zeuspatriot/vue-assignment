<template>
  <LineChart :data="properData" :options="options" />
</template>

<script>
import LineChart from './common/LinearChart';

export default {
  props: {
    dataSnapshot: {
      time: Number,
      soc: Number,
    },
  },
  components: {
    LineChart,
  },
  watch: {
    dataSnapshot(value) {
      if (this.dataHistory.length >= 20) {
        this.dataHistory.shift();
      }
      this.dataHistory.push({
        y: value.soc,
        x: value.time,
      });
    },
  },
  computed: {
    properData() {
      return {
        data: {
          datasets: [
            {
              label: 'State of charge %',
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
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 12,
                max: 100,
                min: 0,
                callback(value) {
                  return `${value}%`;
                },
              },
            },
          ],
        },
      },
    };
  },
};
</script>
