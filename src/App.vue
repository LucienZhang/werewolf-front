<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    //在页面加载时读取localStorage里的状态信息
    let token = window.localStorage.getItem("token");
    console.log("created, token is" + token);
    if (token) {
      this.$store.state.token = token;
      this.$store.state.logged_in = true;
      this.$store.state.token_type = "bearer";
    }

  //   //在页面刷新时将vuex里的信息保存到localStorage里
  //   window.addEventListener("beforeunload", () => {
  //     window.localStorage.setItem("token", this.$store.state.token);
  //     console.log(
  //       "beforeunload, token is" + window.localStorage.getItem("token")
  //     );
  //   });
  // },
  // beforeDestroy() {
  //   window.localStorage.setItem("token", this.$store.state.token);
  //   console.log(
  //     "before destroy, token is" + window.localStorage.getItem("token")
  //   );
  // }
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
