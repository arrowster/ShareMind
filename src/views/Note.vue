<template>
  <v-container>
    <v-row class="d-flex justify-center ma-4">
      <NotePallet
        @sendMode="selectMode"
        @setColor="setColor"
        @setPointSize="setPointSize"
      />
    </v-row>
    <v-row class="d-flex justify-center">
      <canvas
        ref="canvas"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseout="outDrawing"
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
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        color: "rgb(0,0,0)",
        pointSize: 2,
        isEraserMode: false,
        isLineDrawingMode: false,
        lineStartX: 0,
        lineStartY: 0,
      };
    },
    methods: {
      startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        [this.lineStartX, this.lineStartY] = [e.offsetX, e.offsetY];
      },
      draw(e) {
        if (!this.isDrawing) return;
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = this.isEraserMode ? "rgba(255, 255, 255, 255)" : this.color;
        ctx.lineWidth = this.pointSize;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        if (this.isLineDrawingMode === false) {
          ctx.stroke();
        }
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      },
      stopDrawing(e) {
        if (!this.isDrawing) return;
        if (this.isLineDrawingMode === true){
          const canvas = this.$refs.canvas;
          const ctx = canvas.getContext("2d");

          ctx.strokeStyle = this.isEraserMode ? "rgba(255, 255, 255, 255)" : this.color;
          ctx.lineWidth = this.pointSize;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";

          ctx.beginPath();
          ctx.moveTo(this.lineStartX, this.lineStartY);
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
        }
        this.isDrawing = false;
      },
      outDrawing(){
        this.isDrawing = false;
      },
      selectMode(num){
        switch(num){
          case 1: //연필 모드
            console.log("penMode")
            this.isEraserMode = false
            this.isLineDrawingMode = false
            break;
          case 2:
            console.log("liMode")
            this.isEraserMode = false
            this.isLineDrawingMode = true
            break;
          default:  //지우개 모드
            console.log("eMode")
            this.isEraserMode = true
            this.isLineDrawingMode = false
            break;
        }
      },
      setColor(red, green, blue) {
        this.color = `rgb(${red}, ${green}, ${blue})`;
        console.log(this.color)
        this.isEraserMode = false;
      },
      setPointSize(size){
        this.pointSize = size
      },
    },
  }
</script>
