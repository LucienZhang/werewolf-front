import Vue from "vue";
import Vuex from "vuex";
import userApi from "../axios-user";
import gameApi from "../axios-game";
import audio from "./modules/audio";
// import * as actions from "./actions";
// import * as mutations from "./mutations";
import gameEnums from "./game-enums";

Vue.use(Vuex);

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

export default new Vuex.Store({
  state: {
    logged_in: false,
    token: "",
    token_type: "",
    user: {},
    game: {},
    role: {},
    gameEnums,
    runtime: {},
    // audio:""
  },
  mutations: {
    updateGameInfo(state, { logged_in, token, token_type, user, game, role }) {
      if (logged_in === false) {
        state.logged_in = false;
        state.token = "";
        state.token_type = "";
        state.user = {};
        state.game = {};
        state.role = {};
      } else {
        if (logged_in !== undefined) {
          state.logged_in = logged_in;
        }
        if (user !== undefined) {
          state.user = user;
        }
        if (game !== undefined) {
          state.game = game;
        }
        if (role !== undefined) {
          state.role = role;
        }
        if (token !== undefined) {
          state.token = token;
        }
        if (token_type !== undefined) {
          state.token_type = token_type;
        }
      }
    },
    initRuntime(state) {
      state.runtime = {
        requiredPlayerCnt: 0,
        selectedPlayers: [],
        history: [],
        feedback: [],
      };
    },
  },
  actions: {
    getUserInfo({ commit }) {
      userApi.get("/info").then((res) => {
        if (res.status == 200 && res.data.code == process.env.VUE_APP_OK_CODE) {
          commit("updateGameInfo", { user: res.data.user });
        } else {
          console.log(res);
        }
      });
    },
    getGameInfo({ commit }) {
      gameApi.get("/get_game_info").then((res) => {
        if (res.status == 200 && res.data.code == process.env.VUE_APP_OK_CODE) {
          commit("updateGameInfo", { game: res.data.game, role: res.data.role });
        } else {
          console.log(res);
        }
      });
    },
    logout({ commit }) {
      commit("updateGameInfo", { logged_in: false });
      // api.get("/logout").then((res) => {
      //   if (res.status == 200) {
      //   } else {
      //     console.log(res);
      //   }
      // });
    },
  },
  modules: {
    audio,
  },
  getters: {
    skillName(state) {
      return (skillCode) => gameEnums[skillCode].key.replace("_", "-").toLowerCase();
    },
    seats(state) {
      return {
        left: range(1, Math.ceil(state.game.seat_cnt / 2) + 1),
        right: range(Math.ceil(state.game.seat_cnt / 2) + 1, state.game.seat_cnt + 1),
      };
    },
    playerOnPos(state) {
      return (pos) => {
        for (const player of state.game.players) {
          if (player.pos == pos) {
            return player;
          }
        }
        return {
          pos: -1,
          nickname: "",
          avatar: -1,
        };
      };
    },
  },
});
