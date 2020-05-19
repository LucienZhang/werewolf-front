<template>
  <div>
    <div class="row skill-info-row"></div>
    <div class="row skill-btn-row">
      <div class="col-12"></div>
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
  created() {
    console.log("suicide component created!");
    let index = this.runtime.history.length;
    gameApi.get("/suicide").then(res => {
      if (res.status != 200) {
        this.$message.error("未知错误");
        console.log(res);
        this.$emit("finish");
      } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
        this.$message.error(res.data.msg);
        this.$emit("finish");
      } else {
        if (res.data.result) {
          this.runtime.history.splice(index, 0, res.data.result);
          this.runtime.feedback.push(res.data.result);
        }
        this.$emit("finish");
      }
    });
  }
};
</script>
