<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row user-row">
        <div class="col-6">
          <div
            v-if="$store.state.logged_in"
            id="nickname"
            class="float-left"
          >{{$store.state.user.nickname}}</div>
        </div>
        <div class="col-6">
          <div v-if="$store.state.logged_in" class="float-right" @click="logout">退出</div>
          <div v-else class="float-right" @click="login">登录</div>
        </div>
      </div>
      <hr style="border-top:1px solid white; margin:0px;" />
      <div class="row main-btn-row">
        <div class="col-lg-4 col-md-6 col-sm-6 col-6 text-center">
          <div class="button-holder">
            <button id="setup" type="button" class="btn">创建房间</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 col-6 text-center">
          <div class="button-holder">
            <button id="join" type="button" class="btn">进入房间</button>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
          <div class="button-holder">
            <button id="goback" type="button" class="btn">一键返回上局房间</button>
          </div>
        </div>
      </div>
      <div class="row info-btn-row">
        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
          <div class="button-holder">
            <button type="button" class="btn">角色及规则介绍</button>
          </div>
        </div>
        <!--             <div class="col-lg-4 col-md-4 col-sm-4 text-center">
                <div class="button-holder">
                    <button type="button" class="btn">捐助</button>
                </div>
        </div>-->
        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
          <div class="button-holder">
            <button type="button" class="btn">意见反馈</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios-api";
export default {
  name: "Home",
  methods: {
    logout() {
      api.get("/logout").then(res => {
        if (res.status == 200) {
          this.$store.state.logged_in = false;
          this.$store.state.user = {};
        }
      });
    },
    login() {
      api.get("/login").then(res => {
        if (res.status == 200) {
          this.$store.state.logged_in = true;
          this.$store.state.user = res.data.user;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  background: url(../assets/game_bg.jpg) no-repeat center center #cccccc;
  background-size: cover;
  background-attachment: fixed;
  padding-top: 10%;
}

.user-row {
  font-size: 18px;
  color: #ffffff;
  margin: 0px 10px;
  // #nickname {
  //   margin-left: 15px;
  // }
}

.button-holder {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
}

button {
  width: 100%;
  margin: 0px;
}

.main-btn-row {
  margin-top: 5%;
  button {
    height: 100px;
    font-size: 20px;
    padding: 0px;
  }
  #setup {
    background-color: #4fa746;
    color: white;
  }

  #join {
    background-color: #427bff;
    color: white;
  }

  #goback {
    background-color: #f2c010;
    color: black;
  }
}

.info-btn-row {
  margin-top: 50px;
  button {
    background-color: #50a3b9;
    color: white;
  }
}
</style>


