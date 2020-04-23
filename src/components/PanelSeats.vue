<template>
  <div class="panel-seats">
    <div class="container-fluid">
      <div class="row panel-row">
        <div class="col-12">
          <div class="panel">
            <div class="row notice-row">
              <div class="col-12">
                <div class="float-left">第 {{game.days||0}} 天 {{gameEnums[game.status].label}}</div>
                <div class="float-right">
                  <button class="btn btn-primary btn-xs" @click="showHistory">历史信息</button>
                  <button class="btn btn-primary btn-xs" @click="showSetting">查看配置</button>
                </div>
              </div>
            </div>
            <div class="row op-row">
              <div class="col-12">
                <button class="btn btn-warning" @click="showRole=true">查看身份</button>
                <button class="btn btn-warning float-right" @click="showSkill=true">使用技能</button>
              </div>
            </div>
            <component :is="selectedSkill"></component>
            <h1>me</h1>
          </div>
        </div>
      </div>
      <div class="row seats-row">
        <div class="col-12">
          <div class="seats-area">
            <div class="row">
              <div class="col-6">
                <div v-for="pos in seats.left" :key="pos" class="player-area">
                  <button
                    class="btn btn-info"
                    :class="{selectedSkill:runtime.selectedPlayers.includes(pos)}"
                    @click="onClickPlayer(pos)"
                  >{{pos}}</button>
                  <span>{{playerOnPos(pos).nickname}}</span>
                </div>
              </div>
              <div class="col-6">
                <div v-for="pos in seats.right" :key="pos" class="player-area player-area-right">
                  <span>{{playerOnPos(pos).nickname}}</span>
                  <button
                    class="btn btn-info"
                    :class="{selectedSkill:runtime.selectedPlayers.includes(pos)}"
                    @click="onClickPlayer(pos)"
                  >{{pos}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal title="游戏身份" :visible="showRole" @cancel="showRole=false">
      <template slot="footer">
        <a-button type="primary" @click="showRole=false">OK</a-button>
      </template>
      <p style="font-size: 20px">你的身份是：{{gameEnums[role.role_type].label}}</p>
      <div class="text-center">
        <img
          v-if="role.role_type!=400"
          :src="roleImgURL"
          :alt="gameEnums[role.role_type].label"
          width="274"
          height="389"
        />
      </div>
    </a-modal>

    <a-modal title="技能" :visible="showSkill" @cancel="onCloseSkillModal" class="skill-modal">
      <template slot="footer">
        <a-button type="primary" @click="onCloseSkillModal">取消</a-button>
      </template>
      <div class="text-center skill-list">
        <div v-for="(skill, index) in role.skills" :key="index">
          <button
            class="btn"
            :class="skillName(skill)"
            @click="onSelectSkill(skillName(skill))"
          >{{gameEnums[skill].label}}</button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import { mapState, mapGetters } from "vuex";
import api from "../axios-api";

import Discover from "../components/skills/Discover";

export default {
  name: "PanelSeats",
  components: { Discover },
  data() {
    return {
      history: [],
      showRole: false,
      showSkill: false,
      selectedSkill: ""
    };
  },
  computed: {
    ...mapState(["game", "role", "gameEnums", "runtime"]),
    ...mapGetters(["skillName", "seats", "playerOnPos"]),
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
    },
    roleImgURL() {
      return require("../assets/cards/" +
        this.gameEnums[this.role.role_type].key
          .replace("ROLE_TYPE_", "")
          .toLowerCase() +
        ".jpg");
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
    },
    onCloseSkillModal() {
      this.selectedSkill = "";
      this.showSkill = false;
    },
    onSelectSkill(skill) {
      this.selectedSkill = skill;
      this.showSkill = false;
    },
    onClickPlayer(pos) {
      if (this.game.status == 1401) {
        api.get("/sit?position=" + pos).then(res => {
          if (res.status != 200) {
            this.$message.error("未知错误");
            console.log(res);
          } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
            this.$message.error(res.data.msg);
          }
        });
      } else if (this.selectedSkill != "") {
        if (this.runtime.selectedPlayers.includes(pos)) {
          return;
        }
        this.runtime.selectedPlayers.push(pos);
        if (
          this.runtime.selectedPlayers.length > this.runtime.requiredPlayerCnt
        ) {
          this.runtime.selectedPlayers.shift();
        }
      } else {
        // mark players, modal
      }
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
    height: 220px;

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
  .seats-row {
    .seats-area {
      // margin: 10px 0px;
      padding: 10px;
      .player-area {
        // margin: 15px 0px;
        margin-bottom: 15px;
        &.player-area-right {
          text-align: right;
        }
        .btn {
          width: 60px;
        }
        span {
          margin: auto 5px;
          font-size: 17px;
          // vertical-align: middle;
        }
      }
    }
  }
}

.skill-modal {
  .skill-list {
    .btn {
      margin: 5px;
    }
  }
}

.history-content,
.setting-content {
  margin-top: 40px;
  max-height: 300px;
  overflow-y: auto;
}

.btn {
  &.vote {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #212529;
  }

  &.discover {
    background-color: #28a745;
    border-color: #28a745;
    color: #fff;
  }
}
</style>
