<template>
  <div>
    <div class="row skill-info-row">
      <div v-if="attacked">
        <div v-if="attacked!=-2" class="col-12">今夜狼人袭击了{{attacked}}号玩家</div>
        <div v-else class="col-12">今夜狼人选择空刀</div>
      </div>
    </div>
    <div class="row skill-btn-row">
      <div class="col-12">
        <button id="elixir" class="btn" @click="elixir">救治</button>
        <button class="btn skill-witch" @click="toxic">毒杀</button>
        <button class="btn" @click="skip">跳过</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import gameApi from "../../axios-game";
export default {
  data() {
    return {
      attacked: ""
    };
  },
  computed: {
    ...mapState(["runtime"])
  },
  methods: {
    elixir() {
      let index = this.runtime.history.length;
      gameApi.get("/elixir").then(res => {
        if (res.status != 200) {
          this.$message.error("未知错误");
          console.log(res);
        } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
          this.$message.error(res.data.msg);
        } else {
          if (res.data.result) {
            this.runtime.history.splice(index, 0, res.data.result);
            this.runtime.feedback.push(res.data.result);
          }
          this.$emit("finish");
        }
      });
    },
    toxic() {
      if (
        this.runtime.selectedPlayers.length !== this.runtime.requiredPlayerCnt
      ) {
        this.$message.error(
          "所选玩家数量错误，需要选择" + this.runtime.requiredPlayerCnt + "人"
        );
        return;
      } else {
        let index = this.runtime.history.length;
        gameApi
          .get("/toxic?target=" + this.runtime.selectedPlayers[0])
          .then(res => {
            if (res.status != 200) {
              this.$message.error("未知错误");
              console.log(res);
            } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
              this.$message.error(res.data.msg);
            } else {
              if (res.data.result) {
                this.runtime.history.splice(index, 0, res.data.result);
                this.runtime.feedback.push(res.data.result);
              }
              this.$emit("finish");
            }
          });
      }
    },
    skip() {
      let index = this.runtime.history.length;
      gameApi.get("/toxic?target=-1").then(res => {
        if (res.status != 200) {
          this.$message.error("未知错误");
          console.log(res);
        } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
          this.$message.error(res.data.msg);
        } else {
          if (res.data.result) {
            this.runtime.history.splice(index, 0, res.data.result);
            this.runtime.feedback.push(res.data.result);
          }
          this.$emit("finish");
        }
      });
    }
  },
  created() {
    this.runtime.requiredPlayerCnt = 1;
    gameApi.get("/witch").then(res => {
      if (res.status != 200) {
        this.$message.error("未知错误");
        console.log(res);
      } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
        this.$message.error(res.data.msg);
      } else {
        this.attacked = res.data.result;
      }
    });
  }
};
</script>


<style scoped lang="scss">
.skill-btn-row {
  #elixir {
    background-color: #28a745;
    border-color: #28a745;
    color: #fff;
  }
}
</style>
