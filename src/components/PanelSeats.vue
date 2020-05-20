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
            <component :is="selectedSkill" @finish="clearSkillPanel"></component>
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
                    class="btn"
                    :class="{[selectedSkill]:runtime.selectedPlayers.includes(pos)}"
                    @click="onClickPlayer(pos)"
                  >{{pos}}</button>
                  <span>{{playerOnPos(pos).nickname}}</span>
                </div>
              </div>
              <div class="col-6">
                <div v-for="pos in seats.right" :key="pos" class="player-area player-area-right">
                  <span>{{playerOnPos(pos).nickname}}</span>
                  <button
                    class="btn"
                    :class="{[selectedSkill]:runtime.selectedPlayers.includes(pos)}"
                    @click="onClickPlayer(pos)"
                  >{{pos}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal title="游戏身份" :visible="showRole" @cancel="showRole=false" centered>
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

    <a-modal title="技能" :visible="showSkill" @cancel="clearSkillPanel" class="skill-modal" centered>
      <template slot="footer">
        <a-button type="primary" @click="clearSkillPanel">取消</a-button>
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

    <a-modal
      title="信息"
      :visible="runtime.feedback.length!==0"
      @cancel="runtime.feedback=[]"
      centered
    >
      <template slot="footer">
        <a-button type="primary" @click="runtime.feedback=[]">取消</a-button>
      </template>
      <p v-for="(item, index) in runtime.feedback" :key="index" v-html="item"></p>
    </a-modal>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import { mapState, mapGetters } from "vuex";
import gameApi from "../axios-game";

import SkillDiscover from "./skills/SkillDiscover";
import SkillVote from "./skills/SkillVote";
import SkillWolfKill from "./skills/SkillWolfKill";
import SkillSuicide from "./skills/SkillSuicide";
import SkillCaptain from "./skills/SkillCaptain";
import SkillWitch from "./skills/SkillWitch";
import SkillShoot from "./skills/SkillShoot";
import SkillGuard from "./skills/SkillGuard";

export default {
  name: "PanelSeats",
  components: {
    SkillDiscover,
    SkillVote,
    SkillWolfKill,
    SkillSuicide,
    SkillCaptain,
    SkillWitch,
    SkillShoot,
    SkillGuard
  },
  data() {
    return {
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
      for (const item of this.runtime.history) {
        ret.push(<p domPropsInnerHTML={item}></p>);
      }
      return (
        <div ref="historyContent" class="history-content">
          {ret}
        </div>
      );
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
      const modal = Modal.info({
        title: "历史信息",
        content: this.game_history,
        maskClosable: true
      });
      this.$refs.historyContent.scrollTop = this.$refs.historyContent.scrollHeight;
    },
    clearSkillPanel() {
      this.selectedSkill = "";
      this.showSkill = false;
      this.runtime.requiredPlayerCnt = 0;
      this.runtime.selectedPlayers = [];
    },
    onSelectSkill(skill) {
      this.selectedSkill = skill;
      this.showSkill = false;
    },
    onClickPlayer(pos) {
      if (this.game.status == 1401) {
        gameApi.get("/sit?position=" + pos).then(res => {
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

    /deep/ .skill-info-row {
      text-align: center;
      height: 65px;
      font-size: 20px;
      color: black;
      font-weight: bold;

      div {
        margin: auto;
      }
    }

    /deep/ .skill-btn-row {
      text-align: center;
      .btn {
        margin: 0px 5px;
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

/deep/ .btn {
  &:focus {
    box-shadow: none;
  }

  &:not([class*="btn-"]):not([class*="skill-"]) {
    background-color: #17a2b8;
    border-color: #17a2b8;
    color: #fff;
  }

  &.skill-vote {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #212529;
  }

  &.skill-discover {
    background-color: #28a745;
    border-color: #28a745;
    color: #fff;
  }

  &.skill-wolf-kill {
    background-color: #dc3545;
    border-color: #000;
    color: #000;
  }

  &.skill-suicide {
    background-color: #660710;
    border-color: #660710;
    color: #ffc107;
  }

  &.skill-captain {
    background-color: yellow;
    border-color: red;
    color: #212529;
  }

  &.skill-witch {
    background-color: #684d8c;
    border-color: #130269;
    color: #ffffff;
  }

  &.skill-shoot {
    background-color: #af9b2a;
    border-color: #705317;
    color: #ffffff;
  }

  &.skill-guard {
    background-color: #fffb00;
    border-color: #705317;
    color: #ffffff;
  }
}
</style>
