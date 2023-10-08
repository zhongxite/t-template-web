<template>
  <section class="home">
    <div class="home__container">
      <div class="home__data">
        <span>Error 404</span>
        <h1 class="home__title">页面丢失</h1>
        <p>
          您要寻找的页面不存在<br />
          请尝试重新搜索
        </p>
        <div class="home__button" @click="goUrl">返回首页</div>
      </div>
      <div class="home__img">
        <img src="@/static/image/defaultImg.png" alt="" />
        <div class="home__shadow"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import scrollReveal from "scrollreveal";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const data = reactive({
  scrollReveal: scrollReveal({
    distance: "90px",
    duration: 1500,
  }),
});
const router = useRouter()
const goUrl = ()=>{
    router.replace({
        name:"index"
    })
}
onMounted(() => {
  data.scrollReveal.reveal(`.home__data`, { origin: "top", delay: 400 });
  data.scrollReveal.reveal(`.home__img`, { origin: "bottom", delay: 600 });
  data.scrollReveal.reveal(`.home__footer`, { origin: "bottom", delay: 800 });
});
</script>
<style scoped lang="scss">
.home {
  background-color: #fff;
  display: grid;
  .home__container {
    padding: 100px 0 30px;
    height: 100vh;
    display: grid;
    align-content: center;
    row-gap: 40px;
    margin-left: auto;
    margin-right: auto;
    .home__data {
      text-align: center;
      > span {
        font-size: 20px;
      }
      .home__title {
        font-size: 50px;
        margin: 20px 0;
      }
      > p {
        font-size: 20px;
        line-height: 1.5;
      }
      .home__button {
        margin-top: 20px;
        display: inline-block;
        background-color: #161513;
        border: 1px solid transparent;
        color: #fff;
        padding: 16px 30px;
        border-radius: 3rem;
        transition: 0.4s;
        cursor: pointer;
        &:hover {
          color: #161513;
          background-color: #fff;
          border-color: #161513;
        }
      }
    }
    .home__img {
      justify-self: center;
      img {
        width: 230px;
        animation: floaty 1.8s infinite alternate;
      }
      .home__shadow {
        width: 130px;
        height: 24px;
        background-color: hsla(38, 21%, 19%, 0.16);
        margin: 0 auto;
        border-radius: 50%;
        filter: blur(7px);
        animation: shadow 1.8s infinite alternate;
      }
    }
  }
}
/* Animate ghost */
@keyframes floaty {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(15px);
  }
}

@keyframes shadow {
  0% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(0.85, 0.85);
  }
}

/* For large devices */
@media screen and (min-width: 1024px) {
  .home__container {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    column-gap: 30px;
    .home__data {
      text-align: initial;
    }
    .home__img {
      img {
        width: 400px !important;
      }
      .home__shadow {
        width: 250px;
        height: 40px;
      }
    }
  }
}
</style>
