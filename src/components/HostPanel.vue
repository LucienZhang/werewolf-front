<template>
  <div class="host-panel">
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
// import { Modal } from "ant-design-vue";
// import { mapState, mapGetters } from "vuex";
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
    // ...mapState(["game", "role", "gameEnums", "runtime"]),
    // ...mapGetters(["skillName", "seats", "playerOnPos"]),
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.host-panel {
  margin: 10px 0px;
  padding: 10px;
}
</style>
