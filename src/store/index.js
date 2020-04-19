import Vue from 'vue';
import Vuex from 'vuex';
// import api from "../axios-api";
import audio from "./modules/audio";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged_in: false,
    user: {},
    game: {},
    // audio:""
  },
  mutations,
  actions,
  modules: {
    audio,
  }
});
