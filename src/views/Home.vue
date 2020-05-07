<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row user-row">
        <div class="col-6">
          <strong v-if="logged_in" id="nickname" class="float-left">{{$store.state.user.nickname}}</strong>
        </div>
        <div class="col-6">
          <div v-if="logged_in" class="float-right" @click="logout" style="color: #007bff">退出</div>
          <router-link v-else tag="div" class="float-right" to="/login" style="color: #007bff">登录</router-link>
        </div>
      </div>
      <hr style="border-top:1px solid white; margin:5px 0px 0px 0px;" />
      <div class="row main-btn-row">
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
      </div>
      <div class="row info-btn-row">
        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
          <div class="button-holder">
            <button type="button" class="btn" @click="info">角色及规则介绍</button>
          </div>
        </div>
        <!--             <div class="col-lg-4 col-md-4 col-sm-4 text-center">
                <div class="button-holder">
                    <button type="button" class="btn">捐助</button>
                </div>
        </div>-->
        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
          <div class="button-holder">
            <button type="button" class="btn" @click="feedback">意见反馈</button>
          </div>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-Present</p>
    </div>

    <a-modal
      :visible="joinModalVisible"
      title="请输入房间号"
      @ok="handleJoinOk"
      @cancel="joinModalVisible=false"
      :confirmLoading="joinModalConfirmLoading"
    >
      <!-- <a-alert v-if="joinErrorMsg" :message="joinErrorMsg" type="error" /> -->
      <a-input size="large" v-model="gid" />
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

import gameApi from "../axios-game";
export default {
  name: "Home",
  data() {
    return {
      joinModalVisible: false,
      gid: "",
      joinModalConfirmLoading: false
    };
  },
  computed: { ...mapState(["logged_in"]) },
  methods: {
    ...mapActions(["getUserInfo", "logout"]),
    setup() {
      if (this.logged_in) {
        this.$router.push("/setup");
      } else {
        this.$router.push("/login");
      }
    },
    join() {
      if (this.logged_in) {
        this.gid = "";
        this.joinModalVisible = true;
      } else {
        this.$router.push("/login");
      }
    },
    handleJoinOk() {
      let re = /^[1-9]\d*$/;
      if (!re.test(this.gid)) {
        this.$message.error("房间号错误，请输入数字");
      } else {
        gameApi.get("/join?gid=" + this.gid).then(res => {
          if (res.status != 200) {
            this.$message.error("未知错误");
            console.log(res);
          } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
            this.$message.error(res.data.msg);
          } else {
            this.joinModalVisible = false;
            this.$message.success("已加入游戏");
            this.$router.push("/game");
          }
        });
      }
    },
    returnLast() {
      if (this.logged_in) {
        if (this.$store.state.user.gid > 0) {
          this.$router.push("/game");
        } else {
          this.$message.error("游戏不存在");
        }
      } else {
        this.$router.push("/login");
      }
    },
    info() {},
    feedback() {}
  },
  created() {
    console.log(
      "Home created",
      this.logged_in,
      this.$store.state.token,
      this.$store.state.token_type
    );
    if (this.logged_in) {
      this.getUserInfo();
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

  #return-last {
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


<style lang="scss">
.ant-message-notice {
  .ant-message-notice-content {
    .anticon {
      vertical-align: 0px;
      top: -1px;
    }
  }
}
</style>
