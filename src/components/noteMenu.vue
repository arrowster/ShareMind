<template>
  <div class="pa-4">
    <v-row class="d-flex justify-center">
      <v-btn class="mt-2 mb-2" @click="createNewNote">새 노트 생성하기</v-btn>
    </v-row>
    <v-row>
      <v-card>
        <v-card-text>
          혹시 초대 받으셨나요?
        </v-card-text>
        <v-text-field v-model="inviteCode" placeholder="초대 번호 입력"/>
        <v-btn class="w-100 mb-4" @click="inviteNote" variant="tonal">확인</v-btn>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "noteMenu",
  data:() => ({
    inviteCode:""
  }),
  methods: {
    createNewNote() {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        this.$router.push('/login');
        return;
      }

      this.testVerify().then(verified => {
        if (verified) {
          axios.post('/api/room/createRoom').then((res) => {
            const { roomName, inviteCode } = res.data;
            localStorage.setItem('inviteCode', inviteCode);
            this.$router.push({ path: `/note/${roomName}` });
          }).catch((err) => {
            console.error('노트를 만드는 동안 에러가 발생했습니다:', err);
          });
          } else {
            alert('토큰이 유효하지 않습니다.');
            this.$router.push('/login');
          }
        }).catch(error => {
          console.error('토큰 검증 중 에러 발생:', error);
          this.$router.push('/login');
      });
    },

    inviteNote() {
      const code = this.inviteCode;
      axios.get('/api/room/getRoomName', {params: { inviteCode: code }}).then((res) => {
        const { roomName } = res.data;
        this.$router.push({ path: `/note/${roomName}` });
      }).catch((err) => {
        console.error(err);
      });
    },

    testVerify() {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        if (!token) {
          reject('토큰이 없습니다.');
        } else {
          axios.get('/api/users/token-verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((res) => {
            if (res.data.success === true) {
              alert(JSON.stringify(res.data));
              resolve(true);
            } else {
              reject('토큰 검증 실패');
            }
          }).catch(() => {
            reject('토큰 검증 에러');
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
