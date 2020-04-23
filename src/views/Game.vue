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
import { mapActions } from "vuex";
import { mapState } from "vuex";
import PanelSeats from "../components/PanelSeats";
import HostPanel from "../components/HostPanel";

// import api from "../axios-api";
export default {
  data() {
    return {
      // joinModalVisible: false,
      // gid: "",
      // joinModalConfirmLoading: false
    };
  },
  components: { PanelSeats, HostPanel },
  computed: { ...mapState(["game", "role"]) },
  methods: {
    ...mapActions(["getGameInfo"])
  },
  created() {
    this.getGameInfo();
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
