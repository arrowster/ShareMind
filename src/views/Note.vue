<template>
  <v-container>
    <v-row class="d-flex justify-center ma-4">
      <NotePallet
        @sendMode="selectMode"
        @setColor="setColor"
        @setPointSize="setPointSize"
        @imgFile="handleFileUpload"
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
  import mqMixin from "@/mixins/mq";

  export default {
    components:{
      NotePallet,
    },
    name: "Note",
    mixins: [mqMixin],
    data() {
      return {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        color: "rgb(0,0,0)",
        roomName: 'room1',
        pointSize: 2,
        isEraserMode: false,
        modeCode:0,
        lineStartX: 0,
        lineStartY: 0,
        font: '14px sans-serif',
        localMq: null,
        isSync: false,
      };
    },
    created() {
      this.roomName = this.$route.params.room ? this.$route.params.room : 'room'
    },
    methods: {
      onMqConnect(mqClient) {
        if(!mqClient)
          return;
        this.localMq = mqClient

        if (!this.isSync){
          const userData = JSON.stringify({
            action: 'userSync'
          })
          this.publishMQ('', userData)
          this.isSync = !this.isSync
        }
        this.localMq.subscribe(`/topic/rooms.${this.roomName}`, message => {
          if(message.body) {
            try {
              const body = JSON.parse(message.body)
              if(body['action'])
                this.onAction(body['action'], body['data'])
            } catch (e) {
              console.error(e)
            }
          }
        })
      },
      onAction(action, data) {
        switch(action) {
          case 'pen':
            this.penRender(data['startX'], data['startY'], data['endX'], data['endY'], data['color'], data['lineWidth']);
            break;
          case 'text':
            this.textRender(data['text'], data['x'], data['y']);
            break;
          case 'image':
            this.imgUploadRender(data['image']);
            break;
          case 'userSync':
            this.syncCanvas();
          default:
            console.log(`unknown action : ${action}`)
            break;
        }
      },
      startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        [this.lineStartX, this.lineStartY] = [e.offsetX, e.offsetY];
      },
      draw(e) {
        if (!this.isDrawing) return;
        if (this.modeCode === 'pen'||this.modeCode === 'eraser'){
          const penData = JSON.stringify({
            action: 'pen',
            data: {
              startX: this.lastX,
              startY: this.lastY,
              endX: e.offsetX,
              endY: e.offsetY,
              color: this.isEraserMode ? "rgba(255, 255, 255, 255)" : this.color,
              lineWidth: this.pointSize,
            }
          })
          this.publishMQ(e, penData)
        }
      },
      stopDrawing(e) {
        if (!this.isDrawing) return;
        if (this.modeCode === 'line') {
          const penData = JSON.stringify({
            action: 'pen',
            data: {
              startX: this.lastX,
              startY: this.lastY,
              endX: e.offsetX,
              endY: e.offsetY,
              color: this.isEraserMode ? "rgba(255, 255, 255, 255)" : this.color,
              lineWidth: this.pointSize,
            }
          })
          this.publishMQ(e, penData)
        }
        if (this.modeCode === 'text') {
          this.drawText(e)
        }
        this.isDrawing = false;
      },
      outDrawing(){
        this.isDrawing = false
      },

      publishMQ(e, data){
        if (this.localMq) {
          this.localMq.publish({ destination: `/topic/rooms.${this.roomName}`, body: data });
        }
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      },
      selectMode(num){
        switch(num){
          case 0:
            this.isEraserMode = true
            this.modeCode='eraser'
            break
          case 1: //연필 모드
            this.isEraserMode = false
            this.modeCode='pen'
            break
          case 2:
            this.isEraserMode = false
            this.modeCode='line'
            break
          case 3:
            this.isEraserMode = false
            this.modeCode='text'
            break
          default:  //지우개 모드
            this.isEraserMode = true
            this.modeCode='eraser'
            break
        }
      },
      setColor(red, green, blue) {
        this.color = `rgb(${red}, ${green}, ${blue})`;
        this.isEraserMode = false;
      },
      setPointSize(size){
        this.pointSize = size
      },
      drawText(e){
        const canvas = this.$refs.canvas;
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.style.position = 'absolute';
        textInput.style.left = (e.clientX) + 'px';
        textInput.style.top = (e.clientY) + 'px';
        let drawTextCanvasPositionLeft =(e.clientX - canvas.getBoundingClientRect().left) + 'px'
        let drawTextCanvasPositionTop = (e.clientY - canvas.getBoundingClientRect().top) + 'px'

        textInput.onkeydown = (event) => {
          if (event.key === 'Enter') {
            const textData = JSON.stringify({
              action: 'text',
              data: {
                text: textInput.value,
                x: parseInt(drawTextCanvasPositionLeft, 10),
                y: parseInt(drawTextCanvasPositionTop, 10),
              }
            })
            this.publishMQ(e, textData)
            document.body.removeChild(textInput);
            this.isDrawing = false;
          }
        };
        document.body.appendChild(textInput);
        textInput.focus();
      },
      handleFileUpload(file) {
        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const img = new Image();
            const result = e.target.result;

            if (typeof result === "string") {
              img.src = result;
            } else if (result instanceof ArrayBuffer) {
              console.error("이미지 파일이 아닙니다.");
            }

            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              const imageURL = canvas.toDataURL('image/jpeg');

              const imgData = JSON.stringify({
                action: 'image',
                data: {
                  image: imageURL,
                }
              });
              this.publishMQ(e, imgData);
            };
          };
          reader.readAsDataURL(file);
        }
      },
      penRender(startX, startY, endX, endY, color, pointSize){
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = color;
        ctx.lineWidth = pointSize;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      },
      textRender(txt, x, y) {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = this.font;
        ctx.fillText(txt, x-4 , y-4);
      },
      imgUploadRender(imageData){
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageData;
      },
      syncCanvas(){
        const canvas = this.$refs.canvas;
        const dataURL = canvas.toDataURL()
        const imgData = JSON.stringify({
          action: 'image',
          data: {
            image: dataURL,
          }
        });
        this.publishMQ("", imgData);
      },
    },
  }
</script>
