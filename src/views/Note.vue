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
        isTextMode: false,
        modeCode:0,
        lineStartX: 0,
        lineStartY: 0,
        font: '14px sans-serif',
        drawEvent: {
          eventType: "draw",
          startX: "", //this.lastX,
          startY: "", //this.lastY,
          endX: "", //e.offsetX,
          endY: "", //e.offsetY,
          color: this.isEraserMode ? "rgba(255, 255, 255, 255)" : this.color,
          lineWidth: "", //pointSize,
          clientId: "", //clientId,
          timestamp: Date.now()
        }
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
        if ((this.modeCode === 0 || this.modeCode === 1)) {
          ctx.stroke();
        }
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      },
      stopDrawing(e) {
        if (!this.isDrawing) return;
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        if (this.isLineDrawingMode === true) {
          ctx.strokeStyle = this.isEraserMode ? "rgba(255, 255, 255, 255)" : this.color;
          ctx.lineWidth = this.pointSize;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";

          ctx.beginPath();
          ctx.moveTo(this.lineStartX, this.lineStartY);
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
        }

        if (this.isTextMode === true) {
          console.log("in txtMode")
          const textInput = document.createElement('input');
          textInput.type = 'text';
          textInput.style.position = 'absolute';
          textInput.style.left = (e.clientX) + 'px';
          textInput.style.top = (e.clientY) + 'px';
          console.log(e.clientX)
          console.log(canvas.getBoundingClientRect().left)
          console.log(e.clientX - canvas.getBoundingClientRect().left)
          console.log(parseInt(textInput.style.left, 10))
          let drawTextCanvasPositionLeft =(e.clientX - canvas.getBoundingClientRect().left) + 'px'
          let drawTextCanvasPositionTop = (e.clientY - canvas.getBoundingClientRect().top) + 'px'

          textInput.onkeydown = (event) => {
            if (event.key === 'Enter') {
              this.drawTextOnCanvas(textInput.value, parseInt(drawTextCanvasPositionLeft, 10), parseInt(drawTextCanvasPositionTop, 10));
              document.body.removeChild(textInput);
              this.isDrawing = false;
            }
          };
          document.body.appendChild(textInput);
          textInput.focus();
        }

        this.isDrawing = false;
      },

      drawTextOnCanvas(txt, x, y) {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = this.font;
        ctx.fillText(txt, x-4 , y-4);
      },
      outDrawing(){
        this.isDrawing = false
        this.isTextMode = false
        this.isLineDrawingMode = false
      },
      selectMode(num){
        switch(num){
          case 1: //연필 모드
            console.log("penMode")
            this.isEraserMode = false
            this.isLineDrawingMode = false
            this.isTextMode = false
            this.modeCode=1
            break
          case 2:
            console.log("liMode")
            this.isEraserMode = false
            this.isLineDrawingMode = true
            this.isTextMode = false
            this.modeCode=2
            break
          case 3:
            console.log("textMode")
            this.isEraserMode = false
            this.isLineDrawingMode = false
            this.isTextMode = true
            this.modeCode=3
            break
          default:  //지우개 모드
            console.log("eMode")
            this.isEraserMode = true
            this.isLineDrawingMode = false
            this.isTextMode = false
            this.modeCode=0
            break
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
      test(){

      }
    },
  }
</script>
