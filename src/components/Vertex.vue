<template>
<circle :cx="x" :cy="y" r="25" stroke="black" stroke-width="3" fill="red" />
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
</style>