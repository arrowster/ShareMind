<template>
  <v-container>
    <v-toolbar>
      <v-btn-toggle class="ml-2" v-model="toggle" mandatory divided variant="outlined">
        <v-btn value="pencil" icon @click="pencilMode"><v-icon>mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">연필</v-tooltip>
        </v-btn>
        <v-btn value="eraser" icon @click="eraserMode"><v-icon>mdi-eraser</v-icon>
          <v-tooltip activator="parent" location="top">지우개</v-tooltip>
        </v-btn>
        <v-btn value="vector" icon @click="lineMode"><v-icon>mdi-vector-line</v-icon>
          <v-tooltip activator="parent" location="top">직선</v-tooltip>
        </v-btn>
        <v-btn value="format" icon @click="textMode"><v-icon>mdi-format-text</v-icon>
          <v-tooltip activator="parent" location="top">텍스트</v-tooltip>
        </v-btn>
      </v-btn-toggle>
      <v-btn class="ml-2" :style="{ background: `rgb(${red}, ${green}, ${blue})` }">
        <v-tooltip activator="parent" location="top">
          색상지정
        </v-tooltip>
        <SelectColorBar @setColor="setColor" />
      </v-btn>
      <v-spacer/>
      <v-btn icon><v-icon>mdi-account-group</v-icon>
        <v-tooltip activator="parent" location="top">접속한 유저 확인</v-tooltip>
      </v-btn>
      <input type="file" ref="fileInput" class="file-upload-input" @change="uploadImg" accept=".png, .jpg">
      <v-btn icon @click="uploadImg"><v-icon>mdi-upload</v-icon>
        <v-tooltip activator="parent" location="top">외부파일 업로드</v-tooltip>
      </v-btn>
    </v-toolbar>
    <PointerSizeBar @setPointSize="setPointSize" v-if="activate" :isActivate="activate" @close="close"/>
  </v-container>
</template>

<script>
import SelectColorBar from "@/components/SelectColorBar"
import PointerSizeBar from "@/components/PointerSizeBar";

export default {
  name: "NotePallet",
  components:{ SelectColorBar, PointerSizeBar },
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
      toggle: null,
      activate: false
    }
  },
  methods:{
    setColor(red, green, blue){
      this.red = red
      this.green = green
      this.blue = blue
      this.$emit("setColor", this.red, this.green, this.blue);
    },
    close(value) {
      this.activate = value;
    },
    setPointSize(size){
      this.$emit("setPointSize", size)
    },
    pencilMode(){
      this.$emit('sendMode', 1)
      this.activate = true;
    },
    eraserMode(){
      this.$emit('sendMode', 0)
      this.activate = true;
    },
    lineMode(){
      this.$emit('sendMode', 2)
    },
    textMode(){
      this.$emit('sendMode', 3)
    },
    uploadImg(){
      console.log("click")
      const fileInput = this.$refs.fileInput;
      fileInput.click();
      const file = fileInput.files[0];

      this.$emit('imgFile', file)
    },
  },
}
</script>

<style lang="scss" scoped>
  .file-upload-input {
    display:none;
  }
</style>
