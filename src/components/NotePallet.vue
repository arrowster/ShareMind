<template>
  <v-container>
    <v-toolbar>
      <v-btn icon><v-icon>mdi-pencil</v-icon>
        <v-tooltip activator="parent" location="top">연필</v-tooltip>
      </v-btn>
      <v-btn icon @click="eraserMode"><v-icon>mdi-eraser</v-icon>
        <v-tooltip activator="parent" location="top">지우개</v-tooltip>
      </v-btn>
      <v-btn icon><v-icon>mdi-vector-line</v-icon>
        <v-tooltip activator="parent" location="top">직선</v-tooltip>
      </v-btn>
      <v-btn icon><v-icon>mdi-format-text</v-icon>
        <v-tooltip activator="parent" location="top">텍스트</v-tooltip>
      </v-btn>
      <v-btn :style="{ background: `rgb(${red}, ${green}, ${blue})` }">
        <v-tooltip activator="parent" location="top">
          색상지정
        </v-tooltip>
        <SelectColorBar @setColor="setColor" />
      </v-btn>
      <v-spacer/>
      <v-btn icon><v-icon>mdi-account-group</v-icon>
        <v-tooltip activator="parent" location="top">접속한 유저 확인</v-tooltip>
      </v-btn>
      <v-btn icon><v-icon>mdi-upload</v-icon>
        <v-tooltip activator="parent" location="top">외부파일 업로드</v-tooltip>
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import SelectColorBar from "@/components/SelectColorBar"
export default {
  name: "NotePallet",
  components:{ SelectColorBar },
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
    }
  },
  methods:{
    setColor(red, green, blue){
      this.red = red
      this.green = green
      this.blue = blue
      this.$emit("setColor", this.red, this.green, this.blue);
    },
    eraserMode(){
      this.$emit('sendMode',0)
    },
  },
}
</script>

<style scoped>

</style>
