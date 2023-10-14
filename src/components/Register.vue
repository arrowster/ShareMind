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
            <v-text-field v-model="user.id" :rules="[requiredEmail]" :disabled="isSingUpReady" class="ml-4" placeholder="이메일" />
          </v-col>
        </v-row>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-list-subheader>비밀번호</v-list-subheader>
        </v-col>
        <v-col cols="16">
          <v-row>
            <v-text-field v-model="user.password" :rules="[required]" :disabled="isSingUpReady" class="ml-4" placeholder="비밀번호"/>
          </v-row>
          <v-row>
            <v-text-field v-model="confirmPassword" :rules="[requiredPassword]" :disabled="isSingUpReady" class="ml-4" placeholder="비밀번호 확인"/>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-list-subheader>인증 코드</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-checkbox-btn @click="onSendAuthEmail" v-model="isEmailAgree" :disabled="isEmailAgree" label="회원가입을 위한 개인 이메일 수집을 동의합니다."/>
          <v-col class="d-flex justify-center align-center">
            <v-text-field v-model="emailConfirmCode" class="w-75" :disabled="!isEmailAgree" hide-details label="이메일을 확인해주세요"/>
            <v-btn @click="onCheckAuthEmail" class="ml-2" :disabled="!isEmailAgree">확인</v-btn>
          </v-col>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-end">
        <v-btn :disabled="!isSingUpReady" @click="signUp">완료</v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data: () => {
    return {
      user: {
        id:"",
        password:""
      },
      confirmPassword:"",
      isEmailAgree: false,
      isSingUpReady: false,
      emailConfirmCode: "",
    }
  },
  computed: {
    passwordsMatch() {
      return this.user.password === this.confirmPassword;
    },
    checkEmailForm(){
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(this.user.id);
    }
  },
  methods: {
    required(v){
      return !!v || '내용을 입력해주세요'
    },
    requiredEmail(v) {
      if (v === undefined || v === null || v === '') {
        return !!v || '내용을 입력해주세요'
      }
      if (!this.checkEmailForm) {
        return '올바른 이메일 형식을 맞춰주세요'
      }
      return true
    },
    requiredPassword(v){
      if (!!v === false)
        return !!v || '내용을 입력해주세요'
      if (!this.passwordsMatch) {
        return "password를 다시 확인해주세요"
      }
      return true
    },
    onSendAuthEmail() {
      axios.post("/api/users/checkEmail", { sendEmail: this.user.id } ).then((res) => {
          alert(res.data.message)
      })
      console.log("onSendAuthEmail")
    },
    onCheckAuthEmail(){
      const emailConfirmCode = this.emailConfirmCode
      const email = this.user.id
      axios.get(`/api/users/checkAuth?code=${emailConfirmCode}&email=${email}`)
        .then(response => {
          if (response.status === 200) {
            const result = response.data; // 서버에서 반환한 데이터
            if (result.success) {
              console.log('이메일 인증 성공');
              this.isSingUpReady = true
            } else {
              console.error('이메일 인증 실패');
            }
          } else {
            console.error('서버 응답 오류');
          }
        })
        .catch(error => {
          console.error('에러 발생', error);
        });
    },
    signUp() {
      axios.post('/api/users/signUp', { ...this.user }).then((res) => {
        alert(res.data.message);
        console.log(res.data.success)
        if (res.data.success === true) {
          this.$router.push('/')
        }
      }).catch(error => {
        alert(error);
      })
    }
  }
}
</script>

<style scoped>

</style>
