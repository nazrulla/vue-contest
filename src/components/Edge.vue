<template>
  <line
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
  />
</template>
<script>
export default {
  name: "Edge",
  data() {
    return {};
  },
  props: {
    x1: Number,
    x2: Number,
    y1: Number,
    y2: Number,
  },
};
</script>
<style scoped>
line{
  stroke: rgb(255, 0, 0);
  stroke-width: 2;
}
</style>