<template>
  <div class="panel-seats">
    <div class="container-fluid">
      <div class="row panel-row">
        <div class="col-12">
          <div class="panel">
            <div class="row notice-row">
              <div class="col-12">
                <div class="float-left">第 {{game.days||0}} 天 {{gameEnums[game.status||1400].label}}</div>
                <div class="float-right">
                  <button class="btn btn-primary btn-xs" @click="showHistory">历史信息</button>
                  <button class="btn btn-primary btn-xs" @click="showSetting">查看配置</button>
                </div>
              </div>
            </div>
            <h1>me</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import { mapState } from "vuex";

export default {
  name: "PanelSeats",
  data() {
    return {
      history: []
    };
  },
  computed: {
    ...mapState(["game", "role", "gameEnums"]),
    game_setting() {
      if (this.game !== {}) {
        let ret = [
          <p>游戏模式：{this.gameEnums[this.game.victoryMode].label}</p>,
          <p>警长模式：{this.gameEnums[this.game.captainMode].label}</p>,
          <p>女巫模式：{this.gameEnums[this.game.witchMode].label}</p>,
          <p>游戏人数：{this.game.seat_cnt}</p>
        ];
        for (const role in this.game.cards) {
          if (this.game.cards.hasOwnProperty(role)) {
            const cnt = this.game.cards[role];
            ret.push(
              <p>
                {this.gameEnums[role].label} = {cnt}
              </p>
            );
          }
        }
        return <div class="setting-content">{ret}</div>;
      } else {
        return "";
      }
    },
    game_history() {
      let ret = [];
      for (const item of this.history) {
        ret.push(<p domPropsInnerHTML={item}></p>);
      }
      return <div class="history-content">{ret}</div>;
    }
  },
  methods: {
    showSetting() {
      Modal.info({
        title: "当前配置",
        content: this.game_setting,
        maskClosable: true
      });
    },
    showHistory() {
      Modal.info({
        title: "历史信息",
        content: this.game_history,
        maskClosable: true
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel-seats {
  .panel {
    border-radius: 15px;
    background-color: rgba(250, 235, 215, 0.5);
    margin: 10px 0px;
    padding: 10px;
    .notice-row {
      padding: 15px 0px;
      font-size: 16px;
      .btn-xs {
        padding: 0.5rem 0.4rem;
        font-size: 0.875rem;
        line-height: 0.5;
        border-radius: 0.2rem;
        margin-left: 5px;
      }
    }
  }

  h1 {
    color: red;
  }
}

.history-content,
.setting-content {
  margin-top: 40px;
  max-height: 300px;
  overflow-y: auto;
}
</style>
