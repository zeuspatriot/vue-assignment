<template>
  <canvas class="linearChart" ref="chart" />
</template>

<script>
import Chart from 'chart.js';
import merge from 'lodash/merge';

export default {
  props: {
    data: Object,
    options: Object,
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    const ctx = this.$refs.chart;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Speed (km/h)',
            data: [],
          },
        ],
        backgroundColor: '#00d23e',
        borderColor: '#00d23e',
      },
      options: merge(
        {
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 12,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 12,
                  maxTicksLimit: 20,
                  minTicksLimit: 20,
                },
                type: 'time',
                time: {
                  displayFormats: {
                    second: 'h:mm:ss',
                  },
                },
              },
            ],
          },
          tooltips: {
            enabled: false,
          },
          animation: {
            duration: 0,
          },
        },
        this.options
      ),
    });
  },
  watch: {
    data(value) {
      if (this.chart) {
        this.chart.config.data = value.data;
        this.update();
      }
    },
  },
  methods: {
    update() {
      return this.chart.update();
    },
  },
};
</script>

<style scoped>
.linearChart {
  height: 400px;
}
</style>
