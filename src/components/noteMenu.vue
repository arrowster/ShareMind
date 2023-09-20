<template>
  <div class="pa-4">
    <v-row class="d-flex justify-center">
      <v-btn class="mt-2 mb-2" @click="createNewNote">새 노트 생성하기</v-btn>
    </v-row>
    <v-row>
      <v-card class="" >
        <v-card-text>
          혹시 초대 받으셨나요?
        </v-card-text>
        <v-text-field placeholder="초대 번호 입력"/>
        <v-btn class="w-100 mb-4" variant="tonal">확인</v-btn>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "noteMenu",
  data(){
    return {
    }
  },
  methods: {
    createNewNote() {
      location.href="/note"
    },
  }
}
</script>

<style scoped>

</style>
