<template>
  <img src="@/assets/vertex.png" :style="{left: x+'px', top: y+'px'}">
</template>
<script>
export default {
 name: "Vertex",
 data() {
   return {

   }
 },
 props: {
   x: Number,
   y: Number
 }
}
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
  position: absolute;
}
</style>