// 封装一个插件  注册所有的全局组件
import MyHeader from '@/components/my-header'
import MyFooter from '@/components/my-footer'
import MyPersonal from '@/components/my-personal'
import MyStar from '@/components/my-star'
import MyUE from '@/components/my-ue'
export default {
  install(Vue) {
    // 基于Vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    Vue.component(MyHeader.name, MyHeader)
    Vue.component(MyFooter.name, MyFooter)
    Vue.component(MyPersonal.name, MyPersonal)
    Vue.component(MyStar.name, MyStar)
    Vue.component(MyUE.name, MyUE)
  }
}
