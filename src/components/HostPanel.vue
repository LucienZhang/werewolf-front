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
  </div>
</template>

<script>
// import { Modal } from "ant-design-vue";
import { mapState, mapGetters } from "vuex";
// import api from "../axios-api";

export default {
  name: "HostPanel",
  data() {
    return {
      //   history: [],
      //   showRole: false,
      //   showSkill: false,
      //   selectedSkill: ""
    };
  },
  computed: {
    ...mapState(["game", "role", "gameEnums", "runtime"])
    // ...mapGetters(["skillName", "seats", "playerOnPos"]),
  },
  methods: {
    deal() {},
    goNextStep() {}
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
