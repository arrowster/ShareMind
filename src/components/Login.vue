<template>
  <v-card class="pa-2 mx-auto">
    <h3 class="mb-4">로그인</h3>
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="user.id"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :readonly="loading"
          :type="isShow ? 'text' : 'password'"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          type="submit"
          variant="elevated"
        >
          log in
        </v-btn>
      </v-form>
      <hr class="mt-2 mb-2">
<!--      <div class="d-flex justify-center mb-2">
        <v-btn @click="testMq">구글로 로그인(토큰 test)</v-btn>
      </div>-->
    <div class="d-flex justify-end registerFont ml-6">
      <span class="font-weight-thin">아직 Share Mind 회원이 아니신가요?</span>
      <router-link class="font-weight-bold ml-2" to="/register">회원가입</router-link>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data: () => ({
    form: false,
    isShow:false,
    user:{
      id: "",
      password: "",
      token: "",
    },
    loading: false,
  }),

  methods: {
    onSubmit () {
      if (!this.form) return
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)

      axios.post('/api/users/login',{ ...this.user})
        .then((res) => {
          if (res.data.success === true){
            alert('message: 로그인 성공')

            const id = res.data.id
            const token = res.data.token;
            localStorage.setItem('id', id)
            localStorage.setItem('token', token);
            window.location.href = '/'

          } else {
            throw Error("err")
          }
        }).catch(()=>{
          alert('Login failed! please check your email or password');
      })
    },
    testVerify() {
      const token = localStorage.getItem('token')
      axios.get('/api/users/token-verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.success === true) {
          alert(JSON.stringify(res.data));
        } else {
          throw Error("error!!")
        }
      }).catch(() => {
        alert('token error.. plz login again');
        //todo: login 화면으로 이동
      });
    },
    required (v) {
      return !!v || '이메일을 입력해주세요'
    },
  },
}
</script>

<style scoped>
  .v-card {
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(255, 255, 255, 0);
  }
  .registerFont {
    font-size: 10px;
  }
</style>
