<template>
  <div>
    <div class="row skill-info-row">
      <div class="col-12">请选择一名玩家</div>
    </div>
    <div class="row skill-btn-row">
      <div class="col-12">
        <button class="btn skill-discover" @click="discover">查验</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import gameApi from "../../axios-game";
export default {
  computed: {
    ...mapState(["runtime"])
  },
  methods: {
    discover() {
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
          .get("/discover?target=" + this.runtime.selectedPlayers[0])
          .then(res => {
            if (res.status != 200) {
              this.$message.error("未知错误");
              console.log(res);
            } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
              this.$message.error(res.data.msg);
            } else {
              this.runtime.history.splice(index, 0, res.data.result);
              this.runtime.feedback.push(res.data.result);
              this.$emit("finish");
            }
          });
      }
    }
  },
  created() {
    this.runtime.requiredPlayerCnt = 1;
  }
};
</script>
