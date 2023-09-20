<template>
  <v-card class="pa-2 mx-auto">
    <h3 class="mb-4">로그인</h3>
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
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
          Sign In
        </v-btn>
      </v-form>
      <hr class="mt-2 mb-2">
      <div class="d-flex justify-center mb-2">
        <v-btn>구글로 로그인</v-btn>
      </div>
    <div class="d-flex justify-end registerFont ml-6">
      <span class="font-weight-thin">아직 Share Mind 회원이 아니신가요?</span>
      <router-link class="font-weight-bold ml-2" to="/register">회원가입</router-link>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit () {
      console.log("login click")
      console.log(this.form)
      if (!this.form) return
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
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
    font-size: 2px;
  }
</style>
