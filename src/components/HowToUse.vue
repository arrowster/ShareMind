<template>
    <v-card class="pa-4" variant="outlined">
      <div>
        <h3 class="d-flex justify-center">Share Mind란?</h3>
        <p>어디서나 자신의 아이디어를 그리세요!</p>
        <p>팀원들과 그림을 공유하세요!</p>
        <p>실시간 노트 공유 서비스</p>
        <p>Share Mind입니다.</p>
      </div>
      <br>
      <div>
        <h3 class="d-flex justify-center">어떻게 사용하나요?</h3>
        <p>1. 로그인</p>
        <p>2. 새 노트 생성하기 버튼 클릭</p>
        <p>3. 초대 코드 생성</p>
        <p>4. 이 코드를 동업자들에게 공유하세요</p>
      </div>
    </v-card>
</template>

<script>
export default {
  name: "HowToUse"
}
</script>

<style scoped>
  .v-card {
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(255, 255, 255, 0);
  }
</style>
