<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row form-row">
        <div class="col-12 text-center">
          <img class="mb-4" src="../assets/logo.png" alt width="100" height="50" />
          <h1 class="h3 mb-3 font-weight-normal">请登录</h1>
          <a-form-model ref="loginForm" :model="form" :rules="rules">
            <a-form-model-item prop="username">
              <a-input size="large" v-model="form.username" placeholder="用户名">
                <a-icon slot="prefix" type="idcard" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input-password size="large" v-model="form.password" placeholder="密码">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input-password>
            </a-form-model-item>
            <a-checkbox :checked="form.rememberMe">记住我</a-checkbox>
            <a-form-model-item>
              <button class="btn btn-lg btn-primary btn-block" @click="onSubmit">登录</button>
            </a-form-model-item>
          </a-form-model>
          <router-link to="/register" tag="button" class="btn btn-lg btn-info btn-block">新用户注册</router-link>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-Present</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "../axios-auth";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        rememberMe: true
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["updateGameInfo"]),
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let bodyFormData = new FormData();
          bodyFormData.set("username", this.form.username);
          bodyFormData.set("password", this.form.password);
          authApi
            .post("/access-token", bodyFormData)
            .then(res => {
              if (res.status == 422) {
                this.$message.error("用户名或密码错误");
              } else if (res.status != 200) {
                this.$message.error("未知错误");
                console.log(res);
              } else {
                localStorage.setItem('token', res.data.access_token);
                this.updateGameInfo({
                  logged_in: true,
                  token: res.data.access_token,
                  token_type: res.data.token_type
                });
                this.$router.push("/");
              }
            })
            .catch(res => {
              this.$message.error("未知错误");
              console.log(res);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f5f5f5;

  .container-fluid {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;

    .ant-form-item {
      margin-bottom: 15px;
    }
    .ant-checkbox-wrapper {
      margin-bottom: 28px;
    }
  }
}
</style>

<style lang="scss">
.login {
  .ant-form-explain {
    margin-top: 5px;
  }
}
</style>
