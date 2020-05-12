<template>
  <div class="game">
    <div class="container-fluid">
      <div class="row header-row text-center">
        <div class="col-2">
          <div class="float-left header-info">{{ role.nickname }}</div>
        </div>
        <div class="col-8">
          <img id="werewolf-logo" src="../assets/werewolf.png" alt="Logo" />
        </div>
        <div class="col-2">
          <router-link tag="div" class="float-right header-info" to="/" style="color: #007bff">退出</router-link>
        </div>
        <div class="col-12 text-left" style="font-size: 16px">房间号：{{ game.gid }}</div>
      </div>
      <hr style="border-top:1px solid #427BFF; margin:5px 0px 0px 0px;" />
    </div>
    <PanelSeats v-if="Object.keys(game).length !== 0"></PanelSeats>
    <HostPanel v-if="Object.keys(game).length !== 0 && role.ishost"></HostPanel>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import PanelSeats from "../components/PanelSeats";
import HostPanel from "../components/HostPanel";

// import api from "../axios-api";
export default {
  data() {
    return {
      // joinModalVisible: false,
      // gid: "",
      // joinModalConfirmLoading: false
      heartbeatTimer: null
    };
  },
  components: { PanelSeats, HostPanel },
  computed: { ...mapState(["game", "role"]) },
  methods: {
    ...mapActions(["getGameInfo"]),
    ...mapMutations(["initRuntime"]),
    heartbeat() {
      this.heartbeatTimer = setTimeout(() => {
        try {
          this.$socket.sendObj({ ping: "ping" });
          console.log("heartbeat ping");
        } catch (error) {
          console.log(error);
        }
        this.heartbeat();
      }, process.env.VUE_APP_WS_HEARTBEAT_INTERVAL);
    }
  },
  created() {
    this.getGameInfo();
    this.initRuntime();
    this.$connect(
      process.env.VUE_APP_WS_URL + "?token=" + this.$store.state.token,
      {
        format: "json",
        store: this.$store,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        // passToStoreHandler: function(eventName, event) {
        //   // console.log(eventName);
        //   // console.log(event);
        //   if (!eventName.startsWith("SOCKET_")) {
        //     return;
        //   }
        //   let method = "commit";
        //   let target = eventName.toUpperCase();
        //   let msg = event;
        //   console.log(this.format)
        //   console.log(event.data)
        //   if (this.format === "json" && event.data) {
        //     msg = JSON.parse(event.data);
        //     console.log(msg);
        //     console.log(typeof msg)
        //     console.log(JSON.parse(msg))
        //     if (msg.mutation) {
        //       console.log("in mutation");
        //       target = [msg.namespace || "", msg.mutation]
        //         .filter(e => !!e)
        //         .join("/");
        //       console.log(target);
        //     } else if (msg.action) {
        //       method = "dispatch";
        //       target = [msg.namespace || "", msg.action]
        //         .filter(e => !!e)
        //         .join("/");
        //     }
        //   }
        //   if (this.mutations) {
        //     target = this.mutations[target] || target;
        //   }
        //   // this.store[method](target, msg);
        //   console.log(method);
        //   console.log(target);
        //   console.log(msg);
        // }
      }
    );
    this.heartbeat();
  },
  beforeDestroy() {
    clearTimeout(this.heartbeatTimer);
    this.$disconnect();
  }
};
</script>

<style scoped lang="scss">
.game {
  min-height: 100vh;
  height: 100%;
  background: url(../assets/game_bg.jpg) no-repeat center center #cccccc;
  background-size: cover;
  background-attachment: fixed;
  color: white;
  padding-bottom: 20px;

  .header-row {
    #werewolf-logo {
      margin-left: -50%;
      margin-right: -50%;
    }

    .header-info {
      position: relative;
      top: 30px;
      padding: 0;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>
