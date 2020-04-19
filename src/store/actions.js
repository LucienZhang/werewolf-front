import api from '../axios-api';

export const getGameInfo = ({ commit }) => {
    api.get("/get_game_info").then(res => {
        if (res.status == 200) {
            commit('updateGameInfo', { logged_in: true, user: res.user, game: res.game });
        } else {
            console.log(res);
        }
    });
};

export const logout = ({ commit }) => {
    api.get("/logout").then(res => {
        if (res.status == 200) {
            commit('updateGameInfo', { logged_in: false, user: {}, game: {} });
        } else {
            console.log(res);
        }
    });
}, ;
