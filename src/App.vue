<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  meta: {
    keepAlive: true,
  },
  created() {
    this.IsPC()
    var store = require('../src/store')
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      // this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      // sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },

  mounted: function () {


  },

  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
      var flag = false;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) != -1) {
          flag = true;
        }
      }
      if (flag) {
        window.location.href = 'https://m.glaforteachers.com/'
      }
      return flag;
    },
    saveState() {
      localStorage.setItem('KEY', JSON.stringify(this.$store.state.KEY))
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  }
};
</script>

<style>
#app {
  font-family: PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0d1e2e;
  overflow-y: hidden;
  background-color: #fbf8fb;
}
.cropper-view-box img {
  display: none !important;
}
</style>
