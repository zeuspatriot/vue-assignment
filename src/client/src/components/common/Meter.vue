<template>
  <div id="meter">
    <div id="progressBar" :style="{ width: `${calculateProgress(value)}%` }">
      <span>{{ value }}</span>
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meter",
  props: {
    value: { type: Number, required: true },
    label: { type: String, required: true },
    max: { type: Number, required: true }
  },
  methods: {
    calculateProgress(value) {
      return (value / this.max) * 100;
    }
  }
};
</script>

<style scoped>
#meter {
  width: 150px;
  border: grey 1px solid;
  box-shadow: 0px 4px 8px -4px;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
}
#progressBar {
  background-color: cadetblue;
  display: flex;
}
</style>
