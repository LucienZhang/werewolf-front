<template>
  <div class="host-panel">
    <div class="container-fluid">
      <div class="row host-row">
        <div class="col-12">
          <button class="btn btn-warning" @click="deal">发牌</button>
          <button class="btn btn-warning" @click="goNextStep">{{game.next_step}}</button>
        </div>
      </div>
    </div>
    <audio ref="bgmAudio" :loop="bgm.loop" :src="bgmSrc" preload="auto" @ended="onBgmEnded"></audio>
    <audio ref="instructionAudio" :src="instructionSrc" preload="auto" @ended="onInsEnded"></audio>
  </div>
</template>

<script>
// import { Modal } from "ant-design-vue";
import { mapState, mapGetters } from "vuex";
import gameApi from "../axios-game";

export default {
  name: "HostPanel",
  data() {
    return {
      bgm: {
        file: "",
        // playing: false,
        loop: false
      },
      instruction: {
        file: ""
        // playing: false
      },
      busy: false
    };
  },
  computed: {
    ...mapState(["game", "role", "gameEnums", "runtime", "audioQueue"]),
    // ...mapGetters(["skillName", "seats", "playerOnPos"]),
    bgmSrc() {
      if (this.bgm.file) {
        return require("../assets/audio/" + this.bgm.file + ".mp3");
      } else {
        return "";
      }
    },
    instructionSrc() {
      if (this.instruction.file) {
        return require("../assets/audio/" + this.instruction.file + ".mp3");
      } else {
        return "";
      }
    }
  },
  methods: {
    deal() {
      // this.$refs.bgmAudio.play();
      this.$refs.bgmAudio.pause();
      // this.$refs.instructionAudio.play();
      this.$refs.instructionAudio.pause();

      gameApi.get("/deal").then(res => {
        if (res.status != 200) {
          this.$message.error("未知错误");
          console.log(res);
        } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
          this.$message.error(res.data.msg);
        }
      });
    },
    goNextStep() {
      gameApi.get("/next_step").then(res => {
        if (res.status != 200) {
          this.$message.error("未知错误");
          console.log(res);
        } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
          this.$message.error(res.data.msg);
        }
      });
    },
    move_on() {
      if (this.busy) {
        return;
      }
      let data = this.audioQueue.shift();
      if (data === undefined) {
        return;
      }
      let bgmAudio = this.$refs["bgmAudio"];
      let instructionAudio = this.$refs["instructionAudio"];
      this.busy = true;
      if (data.bgm) {
        bgmAudio.pause();
        this.bgm = data.bgm;
        bgmAudio.play();
      }
      instructionAudio.pause();
      this.instruction = data.instruction;
      setTimeout(function() {
        instructionAudio.play();
      }, process.env.VUE_APP_AUDIO_BEFORE_WAIT);
    },
    onBgmEnded() {},
    onInsEnded() {
      setTimeout(function() {
        // if (!this.bgm.loop) {
        //   bgmAudio.pause();
        // }
        this.busy = false;
        this.move_on();
      }, process.env.VUE_APP_AUDIO_AFTER_WAIT);
    }
  },
  watch: {
    audioQueue(newQueue, oldQueue) {
      if (newQueue.length <= oldQueue.length) {
        return;
      }
      console.log("audioQueue changed!");
      console.log(this.audioQueue);
      this.move_on();
    }
  },
  mounted() {
    this.move_on();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.host-panel {
  padding: 0px 10px;
  button {
    margin-right: 10px;
  }
}
</style>
