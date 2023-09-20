<template>
  <v-card class="pa-2 mx-auto">
    <h3 class="ml-2 mb-4">회원가입</h3>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-list-subheader>이메일</v-list-subheader>
        </v-col>
        <v-row>
          <v-col cols="16">
            <v-text-field class="ml-4" placeholder="이메일"></v-text-field>
          </v-col>
        </v-row>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-list-subheader>비밀번호</v-list-subheader>
        </v-col>
        <v-col cols="16">
          <v-row>
            <v-text-field class="ml-4" placeholder="비밀번호"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field class="ml-4" placeholder="비밀번호 확인"></v-text-field>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-list-subheader>인증 코드</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-checkbox-btn v-model="isEmailAgree" label="회원가입을 위한 개인 이메일 수집을 동의합니다."/>
          <v-text-field
            :disabled="!isEmailAgree"
            hide-details
            label="위의 이메일로 온 코드를 입력해주세요"
          />
          <v-col class="d-flex justify-end">
            <v-btn>확인</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: () => {
    return {
      user: {
        id:"",
        password:""
      },
      isEmailAgree: false,
      emailConfirmCode: ""
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
