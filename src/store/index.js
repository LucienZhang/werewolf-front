import Vue from "vue";
import Vuex from "vuex";
import userApi from "../axios-user";
import gameApi from "../axios-game";
// import audio from "./modules/audio";
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
    audioQueue: [],
    audioTrigger: false,
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false,
    },
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
        state.audioQueue = [];
      } else {
        if (logged_in !== undefined) {
          state.logged_in = logged_in;
        }
        if (user !== undefined) {
          state.user = Object.assign({}, state.user, user);
        }
        if (game !== undefined) {
          state.game = Object.assign({}, state.game, game);
        }
        if (role !== undefined) {
          state.role = Object.assign({}, state.role, role);
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
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
      console.log(message);
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    SOCKET_GAME(state, data) {
      state.game = Object.assign({}, state.game, data.game);
    },
    SOCKET_HISTORY(state, data) {
      let history = data.history.split("\n");
      state.runtime.history.push(...history);
      if (data.show) {
        state.runtime.feedback.push(...history);
      }
    },
    SOCKET_AUDIO(state, data) {
      console.log(data);
      state.audioQueue.push(data);
      state.audioTrigger = !state.audioTrigger;
    },
  },
  actions: {
    getUserInfo({ commit }) {
      userApi.get("/info").then((res) => {
        if (res.status == 200 && res.data.code == process.env.VUE_APP_OK_CODE) {
          commit("updateGameInfo", { user: res.data.user });
          console.log(res);
        } else {
          console.log(res);
        }
      });
    },
    getGameInfo({ commit }) {
      gameApi.get("/info").then((res) => {
        if (res.status == 200 && res.data.code == process.env.VUE_APP_OK_CODE) {
          commit("updateGameInfo", { game: res.data.game, role: res.data.role });
          console.log(res);
        } else {
          console.log(res);
        }
      });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("updateGameInfo", { logged_in: false });
      // api.get("/logout").then((res) => {
      //   if (res.status == 200) {
      //   } else {
      //     console.log(res);
      //   }
      // });
    },
  },
  // modules: {
  //   audio,
  // },
  getters: {
    skillName(state) {
      return (skillCode) => gameEnums[skillCode].key.replace(/_/g, "-").toLowerCase();
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
