<template>
  <v-container>
    <v-layout>
      <v-btn>연필</v-btn>
      <v-btn>지우개</v-btn>
      <v-btn>직선</v-btn>
      <v-btn>색상지정</v-btn>
      <v-btn>유저 확인</v-btn>
      <v-btn>외부 그림 불러오기</v-btn>
    </v-layout>
    <v-layout>
      <v-card>
        <v-btn-group>
          <v-btn>색상1</v-btn>
          <v-btn>색상2</v-btn>
          <v-btn>색상3</v-btn>
        </v-btn-group>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NotePallet"
}
</script>

<style scoped>

</style>
