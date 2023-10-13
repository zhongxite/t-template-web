<template>
  <div class="site">
    <div class="container">
      <div class="hero">
        <h1>T-模板<br />Welcome!</h1>
      </div>
      <div class="main">
        <div class="inpBox">
          <input
            v-model="form.accountName"
            type="email"
            placeholder="请输入账号名"
          />
        </div>
        <div class="password inpBox">
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
          <i class="ri-eye-off-line"></i>
          <div href="#">找回密码</div>
        </div>
        <div class="inpBox">
          <input @click="subLogin" type="submit" class="submit" value="登录" />
        </div>
        <div class="separator">
          <p>使用其他方式登录</p>
        </div>
        <div class="btnList">
          <i class="ri-wechat-fill ri-2x"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage, ElNotification } from "element-plus";
import { login } from "@/api/user";
import { init } from "@/common/init";
let { token } = storeToRefs(init());
const router = useRouter();
let form = ref({
  accountName: "",
  password: "",
});
const subLogin = () => {
  if (form.value.accountName == "") {
    ElMessage.error("账号名不可为空");
    return;
  }
  if (form.value.password == "") {
    ElMessage.error("密码不可为空");
    return;
  }
  login(form.value).then((res) => {
    if (res.code == 200) {
      token.value = res.data.token;
      ElNotification({
        message: "登录成功",
        type: "success",
      });
      init().getRouter(router,"index");
      // router.replace({ name:"index" });
    }
  });
};
</script>
<style scoped lang="scss">
.site {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fcfcff;
  .container {
    max-width: 1000px;
    width: 100%;
    padding: 0 30px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .hero {
      flex: 1 0 66.6666%;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 50px;
      padding: 70px 0;
      h1 {
        font-size: 3em;
        font-weight: 700;
        line-height: normal;
        color: black;
        position: relative;
      }
      &::before {
        content: "";
        position: absolute;
        top: 15%;
        left: 0;
        width: 280px;
        height: 100px;
        background: linear-gradient(to right, #4460f1, #c471ed, #f64f59);
        z-index: 0;
        filter: blur(70px);
      }
    }
    .main {
      flex: 1 0 33.3333%;
      display: flex;
      flex-direction: column;
      gap: 30px;
      .inpBox {
        position: relative;
        input {
          font: inherit;
          font-size: 14px;
          width: 100%;
          border: 0;
          outline: 0;
          padding: 0 20px;
          line-height: 60px;
          border-radius: 10px;
          /*修复input 加入padding之后大小变化的问题*/
          box-sizing: border-box;
          &::placeholder {
            color: #333333;
            font-family: "Noto Sans SC", sans-serif;
            font-size: inherit;
          }
          &:not(.submit) {
            background-color: #f2f4ff;
          }
        }
        .submit {
          font-weight: 700;
          color: #ffffff;
          background-color: #4460f1;
          box-shadow: #4460f1 0 20px 30px -10px;
          cursor: pointer;
          transition: box-shadow 0.3s;
          &:hover {
            box-shadow: #4460f1 0 10px 30px -10px;
          }
        }
      }
      .password {
        div {
          font-size: 13px;
          color: #9398b3;
          float: right;
          margin: 5px 20px 0 0;
          transition: color 0.3s;
          cursor: pointer;
          &:hover {
            color: #333333;
          }
        }
        i {
          position: absolute;
          top: calc(60px / 2);
          right: 20px;
          margin-top: -8px;
          line-height: 1;
          color: #9398b3;
          cursor: pointer;
        }
      }
      .separator {
        position: relative;
        margin: 20px 0 10px;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          width: 100%;
          height: 1px;
          background-color: #9398b3;
          opacity: 0.3;
          z-index: 1;
        }
        p {
          font-size: 14px;
          width: fit-content;
          padding: 0 10px;
          color: #9398b3;
          background-color: #fcfcff;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
      }

      .btnList {
        display: flex;
        justify-content: center;
        gap: 20px;
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: #9398b3 0 10px 20px -10px;
          transition: all 0.3s ease-out;
          cursor: pointer;
          &:hover {
            color: #ffffff;
            box-shadow: none;
            background-color: #58be6a;
          }
        }
      }
    }
  }
}
</style>
