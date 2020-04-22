<template>
  <div class="setup">
    <div class="container-fluid">
      <div class="row form-row">
        <div class="col-12">
          <div class="text-center">
            <img class="mb-4" src="../assets/logo.png" alt width="100" height="50" />
          </div>
          <h2 class="mb-3">基本信息</h2>

          <a-form-model
            :model="form"
            :rules="rules"
            :label-col="{span:7}"
            :wrapper-col="{span:17}"
            :hideRequiredMark="true"
            ref="setupForm"
          >
            <a-form-model-item label="胜利模式">
              <a-radio-group v-model="form.victoryMode">
                <a-radio
                  v-for="(item, index) in [101,102]"
                  :key="index"
                  :value="item"
                >{{gameEnums[item].label}}</a-radio>
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item label="警长模式">
              <a-radio-group v-model="form.captainMode">
                <a-radio
                  v-for="(item, index) in [201,202]"
                  :key="index"
                  :value="item"
                >{{gameEnums[item].label}}</a-radio>
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item label="女巫模式">
              <a-radio-group v-model="form.witchMode">
                <a-radio
                  v-for="(item, index) in [301,302,303]"
                  :key="index"
                  :value="item"
                >{{gameEnums[item].label}}</a-radio>
              </a-radio-group>
            </a-form-model-item>

            <h2>民阵营</h2>
            <a-form-model-item label="普通村民数量" prop="villagerCnt">
              <a-input v-model.number="form.villagerCnt" />
            </a-form-model-item>

            <h2>狼阵营</h2>
            <a-form-model-item label="普通狼人数量" prop="normalWolfCnt">
              <a-input v-model.number="form.normalWolfCnt" />
            </a-form-model-item>
            <a-checkbox-group v-model="form.selectedWolves">
              <a-checkbox
                v-for="(item, index) in wolves"
                :key="index"
                :value="item"
                :disabled="true"
              >{{gameEnums[item].label}}</a-checkbox>
            </a-checkbox-group>

            <h2>神阵营</h2>
            <a-checkbox-group v-model="form.selectedGods">
              <a-checkbox
                v-for="(item, index) in gods"
                :key="index"
                :value="item"
              >{{gameEnums[item].label}}</a-checkbox>
            </a-checkbox-group>
          </a-form-model>

          <button
            class="btn btn-lg btn-primary btn-block"
            @click="onSubmit"
            style="margin-top: 30px"
          >创建</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-Present</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios-api";
import { mapState } from "vuex";

const wolves = [414];
const gods = [401, 404, 402, 409];

export default {
  data() {
    return {
      form: {
        victoryMode: 101,
        captainMode: 201,
        witchMode: 302,
        villagerCnt: 1,
        normalWolfCnt: 1,
        selectedGods: [401],
        selectedWolves: []
      },
      rules: {
        villagerCnt: [
          {
            required: true,
            pattern: /^[1-9]\d*$/,
            message: "请输入正确的村民数量",
            trigger: "blur"
          }
        ],
        normalWolfCnt: [
          {
            required: true,
            pattern: /^[1-9]\d*$/,
            message: "请输入正确的普通狼人数量",
            trigger: "blur"
          }
        ]
      },
      wolves,
      gods
    };
  },
  computed: { ...mapState(["gameEnums"]) },
  methods: {
    onSubmit() {
      this.$refs.setupForm.validate(valid => {
        if (valid) {
          api.post("/setup", this.form).then(res => {
            if (res.status != 200) {
              this.$message.error("未知错误");
              console.log(res);
            } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
              this.$message.error(res.data.msg);
            } else {
              this.$message.success("创建成功");
              api.get("/join?gid=" + res.data.gid).then(res => {
                if (res.status != 200) {
                  this.$message.error("未知错误");
                  console.log(res);
                } else if (res.data.code != process.env.VUE_APP_OK_CODE) {
                  this.$message.error(res.data.msg);
                } else {
                  this.$message.success("已加入游戏");
                  this.$router.push("/game");
                }
              });
            }
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
.setup {
  height: 100vh;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f5f5f5;

  .container-fluid {
    width: 100%;
    padding: 15px;
    margin: auto;

    .form-row {
      padding: 0px 5px;
    }

    .ant-form-item {
      margin-bottom: 15px;
    }
    .ant-checkbox-wrapper {
      margin-bottom: 28px;
    }
  }
  h2 {
    font-size: 28px;
    text-align: center;
  }
}
</style>

<style lang="scss">
.setup {
  label {
    font-size: 110%;
  }
  .ant-form-explain {
    margin-top: 5px;
  }
  .ant-form-item-label {
    padding: 0px;
    margin-top: 0.6em;
    margin-bottom: auto;
    label {
      margin: 0px;
    }
  }
}
</style>
