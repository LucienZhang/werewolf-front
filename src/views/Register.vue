<template>
  <div class="register">
    <div class="container-fluid">
      <div class="row form-row">
        <div class="col-12 text-center">
          <img class="mb-4" src="../assets/logo.png" alt width="100" height="50" />
          <h1 class="h3 mb-3 font-weight-normal">新用户注册</h1>
          <a-form-model ref="registerForm" :model="form" :rules="rules">
            <a-form-model-item has-feedback prop="username">
              <a-input size="large" v-model="form.username" placeholder="用户名">
                <a-icon slot="prefix" type="idcard" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input-password size="large" v-model="form.password" placeholder="密码">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item prop="confirm">
              <a-input-password size="large" v-model="form.confirm" placeholder="确认密码">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item prop="nickname">
              <a-input size="large" v-model="form.nickname" placeholder="昵称（在游戏中显示）">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <small class="text-muted">点击注册，您将同意我们的隐私服务条款。</small>
              <button class="btn btn-lg btn-primary btn-block" @click="onSubmit">注册</button>
            </a-form-model-item>
          </a-form-model>
          <div>
            已有账户？
            <router-link to="/login" style="color: #007bff">登录</router-link>
          </div>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-Present</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "../axios-user";

export default {
  data() {
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入用户名"));
      } else {
        userApi
          .get("/check_username?username=" + this.form.username)
          .then(res => {
            if (res.status != 200) {
              callback(new Error("未知错误"));
              console.log(res);
            } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
              callback(new Error(res.data.msg));
            } else {
              callback();
            }
          });
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.confirm !== "") {
          this.$refs.registerForm.validateField("confirm");
        }
        callback();
      }
    };
    let validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        confirm: "",
        nickname: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "change" }],
        confirm: [{ validator: validateConfirmPassword, trigger: "change" }],
        nickname: [
          { required: true, message: "请输入游戏昵称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          let { confirm, ...data } = this.form;
          userApi
            .post("/create", data)
            .then(res => {
              if (res.status != 200) {
                this.$message.error("未知错误");
                console.log(res);
              } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
                this.$message.error(res.data.msg);
              } else {
                this.$router.push("/login");
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
.register {
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
.register {
  .ant-form-explain {
    margin-top: 5px;
  }
}
</style>
