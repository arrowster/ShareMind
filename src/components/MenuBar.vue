// MenuBar    - 최종 수정 : 23/04/02 18:47 김지용 -

<template>
  <v-app-bar color="#5F7EAF" elevation="4" rounded app>
    <v-app-bar-title>
      <router-link to="/">
        <v-icon icon="mdi-book-music"/> Share Mind
      </router-link>
    </v-app-bar-title>
    <v-spacer/>
    <span class="mr-2">
      <span class="mr-2" v-if="token !== null">
			  안녕하세요! {{id}} | <span @click="logout">logout</span>
		  </span>
      <router-link to="/login" v-if="token === null">로그인</router-link>
		</span>
  </v-app-bar>
</template>

<script>
export default {
  name: "MenuBar",
  data:() => ({
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id')
  }),

  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("inviteCode")
      localStorage.removeItem('id')
      this.token = null;
    }
  }
}
</script>

<style lang="scss" scoped>
form{
  display: flex;
  flex-direction: row;
  align-items: center;
}
a{
  text-decoration: none; /* 링크의 밑줄 제거 */
  color: #F7E0D3; /* 링크의 색상 제거 */
}
</style>
