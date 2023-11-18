import {Client} from "@stomp/stompjs";

export default {
  data() {
    return {
      mqClient: null,
      mqDisconnecting: false
    }
  },
  mounted() {
    this.connectMq()
  },
  beforeDestroy() {
    this.disconnectMq()
  },
  methods: {
    connectMq(param) {
      if(!this.mqDisconnecting && this.mqClient && this.mqClient.active) {
        return
      }

      this.mqClient = new Client({
        brokerURL: import.meta.env.VITE_APP_MQURL,
        connectHeaders: {
          login: import.meta.env.VITE_APP_MQID,
          passcode: import.meta.env.VITE_APP_MQPW
        },
        onConnect: (frame) => {
          if(typeof this.onMqConnect === 'function') {
            this.onMqConnect(this.mqClient, param)
          }
        },
        onWebSocketClose(event) {
        },
        debug(str) {
        },
        reconnectDelay: 1000,
      })

      this.mqClient.activate()
    },
    disconnectMq() {
      if(this.mqClient) {
        this.mqDisconnecting = true
        this.mqClient.deactivate().then(() => {
          this.mqDisconnecting = false
          this.mqClient = null
        })
      }

      if(typeof this.onMqDisconnect === 'function') {
        this.onMqDisconnect(this.mqClient)
      }
    },
    onVisibilityChange(visibilityState) {
      switch(visibilityState) {
        case 'hidden':
          this.disconnectMq()
          break;
        case 'visible':
          this.connectMq()
          break;
      }
    },
  }
}
