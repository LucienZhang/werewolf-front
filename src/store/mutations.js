export const updateGameInfo = (state, payload) => {
    if (payload.logged_in) {
        state.logged_in = true;
        state.user = payload.user;
        state.game = payload.game;
    } else {
        state.logged_in = false;
        state.user = {};
        state.game = {};
    }
}
