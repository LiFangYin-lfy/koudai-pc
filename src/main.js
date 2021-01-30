import 'babel-polyfill';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2'
import 'swiper/swiper-bundle.css' // 同时必须引入css样式文件
import wx from 'weixin-js-sdk';
import VueQuillEditor from 'vue-quill-editor'
import VueLazyload from 'vue-lazyload';
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
// 使用插件 里边放置了全局组件
import plugin from '@/components'
import axios from '@/api'
// import filte from '@/filter'
import '@/style/index.less'

Vue.use(VueLazyload, {
  error: 'dist/error.png',
  loading: 'dist/loading.gif'
});
Vue.use(VueQuillEditor)
Vue.use(plugin)
Vue.use(VueClipboard)
Vue.use(wx)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
router.beforeEach((to, from, next) => {
  console.log(from);
  if (to.matched.length === 0) { //匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/404'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    next(); //如果匹配到正确跳转
  }
});
new Vue({
  router,
  store,
  render: h => h(App) // 这是创建的简写

}).$mount('#app')
