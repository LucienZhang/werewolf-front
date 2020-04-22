<template>
  <div class="game">
    <div class="container-fluid">
      <div class="row header-row text-center">
        <div class="col-2">
          <div class="float-left header-info">{{ role.nickname }}</div>
        </div>
        <div class="col-8">
          <img src="../assets/werewolf.png" alt="Logo" />
        </div>
        <div class="col-2">
          <router-link tag="div" class="float-right header-info" to="/" style="color: #007bff">退出</router-link>
        </div>
        <div class="col-12 text-left" style="font-size: 16px">房间号：{{ game.gid }}</div>
      </div>
      <hr style="border-top:1px solid #427BFF; margin:5px 0px 0px 0px;" />

      <!-- <hr style="border-top:1px solid white; margin:5px 0px 0px 0px;" /> -->
      <!-- <div class="row main-btn-row">
        <div class="col-lg-4 col-md-6 col-sm-6 col-6 text-center">
          <div class="button-holder">
            <button id="setup" type="button" class="btn" @click="setup">创建房间</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 col-6 text-center">
          <div class="button-holder">
            <button id="join" type="button" class="btn" @click="join">进入房间</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
          <div class="button-holder">
            <button id="return-last" type="button" class="btn" @click="returnLast">一键返回上局房间</button>
          </div>
        </div>
      </div>-->
    </div>
    <PanelSeats></PanelSeats>
    <div class="container-fluid">
      <div class="row host-row">
        <div class="col-12">
          <h1 style="color: white">host buttons</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import PanelSeats from "../components/PanelSeats";

// import api from "../axios-api";
export default {
  data() {
    return {
      // joinModalVisible: false,
      // gid: "",
      // joinModalConfirmLoading: false
    };
  },
  components: { PanelSeats },
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
  min-height: 100%;
  height: 100vh;
  background: url(../assets/game_bg.jpg) no-repeat center center #cccccc;
  background-size: cover;
  background-attachment: fixed;
  color: white;

  .header-row {
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

// .user-row {
//   font-size: 18px;
//   color: #ffffff;
//   margin: 0px 10px;
// }

// .button-holder {
//   margin-top: 20px;
//   margin-bottom: 20px;
//   margin-left: 5px;
//   margin-right: 5px;
// }

// button {
//   width: 100%;
//   margin: 0px;
// }

// .main-btn-row {
//   margin-top: 5%;
//   button {
//     height: 100px;
//     font-size: 20px;
//     padding: 0px;
//   }
//   #setup {
//     background-color: #4fa746;
//     color: white;
//   }

//   #join {
//     background-color: #427bff;
//     color: white;
//   }

//   #return-last {
//     background-color: #f2c010;
//     color: black;
//   }
// }

// .info-btn-row {
//   margin-top: 50px;
//   button {
//     background-color: #50a3b9;
//     color: white;
//   }
// }
</style>
