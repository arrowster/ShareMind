<template>
  <v-container>
    <v-row class="d-flex justify-center ma-4">
      <NotePallet
        @sendMode="selectMode"
        @setColor="setColor"
      />
    </v-row>
    <v-row class="d-flex justify-center">
      <canvas
        ref="canvas"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseout="stopDrawing"
        width="800"
        height="400"
        style="border: 1px solid #000;"
      />
    </v-row>
  </v-container>
</template>

<script>
  import NotePallet from "@/components/NotePallet";

  export default {
    components:{
      NotePallet,
    },
    name: "Note",
    data() {
      return {
        drawing: false,
        lastX: 0,
        lastY: 0,
        color: "rgb(0,0,0)",
        eraserMode: false
      };
    },
    methods: {
      startDrawing(e) {
        this.drawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      },
      draw(e) {
        if (!this.drawing) return;
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = this.eraserMode ? "rgba(255, 255, 255, 255)" : this.color;
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      },
      stopDrawing() {
        this.drawing = false;
      },
      selectMode(num){
        if (num === 0){
          this.toggleEraser()
        }
      },
      setColor(red, green, blue) {
        this.color = `rgb(${red}, ${green}, ${blue})`;
        console.log(this.color)
        this.eraserMode = false;
      },
      toggleEraser() {
        this.eraserMode = !this.eraserMode;
      },
    },
  }
</script>
