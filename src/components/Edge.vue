<template>
  <div class="pipe" :style="style">
    <div id="water" class="water" :style="{background: watercolor, opacity: opacity}">
      <svg viewBox="0 0 560 20" class="water_wave" :style="{fill: watercolor}">
        <use href="#wave"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edge",
  data() {
    return {
      inverted: false,
    };
  },
  computed: {
    style() {
      return {
        left: this.x1 + (this.inverted ? -this.yc : this.yc) + "px",
        top: this.y1 + (this.inverted ? this.xc : -this.xc) + "px",
        transform: "rotate(" + this.angle + "deg)" + this.inversion,
        width: this.distance + "px",
        height: this.$circle + "px",
      };
    },
    watercolor() {
      return (this.inverted ? 'darkblue' : '#4d6de3')
    },
    opacity() {
      return '70%';
    },
    inversion() {
      return this.inverted ? "scaleX(-1)" : "scaleX(1)";
    },
    a() {
      return (this.y2 - this.y1) ** 2 / (this.x2 - this.x1) ** 2;
    },
    angle() {
      return (
        (Math.atan((this.y2 - this.y1) / (this.x2 - this.x1)) * 180) / Math.PI
      );
    },
    distance() {
      return Math.sqrt((this.y2 - this.y1) ** 2 + (this.x2 - this.x1) ** 2);
    },
    xc() {
      if (!isFinite(this.a)) return 0;
      var xc = (this.$circle / 2) * Math.sqrt(1 / (1 + this.a));
      return this.x2 > this.x1 ? xc : -xc;
    },
    yc() {
      var root;
      if (!isFinite(this.a)) root = 1;
      else root = Math.sqrt(this.a / (1 + this.a));
      var yc = (this.$circle / 2) * root;
      return this.y2 > this.y1 ? yc : -yc;
    },
  },
  props: {
    x1: Number,
    x2: Number,
    y1: Number,
    y2: Number
  },
  mounted() {
    console.log("x1 "+this.x1+" x2 "+this.x2);
    if (this.x1 > this.x2) this.inverted = true;
    console.log("inverted "+this.inverted);
  }
};
</script>
<style scoped>
.pipe {
  border: 1px solid black;
  width: 200px;
  position: absolute;
  overflow: hidden;
  transform-origin: top left;
  left: 200px;
  top: 0;
}
.water {
  z-index: 2;
  width: 100%;
  height: 100%;
  transform: translate(0, 40%);
}
.water_wave {
  width: 200%;
  position: absolute;
  bottom: 100%;
  left: -100%;
  margin-bottom: -1px;
  animation: wave-front 1.9s infinite linear;
}
@keyframes wave-front {
  100% {
    transform: translate(50%, 0);
  }
}
</style>
