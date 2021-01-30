import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '@/utils/local'
import Home from '@/view/home'
import Login from '@/view/login'
import Forget from '@/view/forget'
import Register from '@/view/register'
import Coupon from '@/view/coupon'
import Articles from '@/view/articles'
import Order from '@/view/order'
import Cart from '@/view/cart'
import Emptycart from '@/view/emptycart'
import Collect from '@/view/collect'
import Information from '@/view/information'
import Password from '@/view/password'
import Appraise from '@/view/appraise'
import NoFound from '@/view/404'
import Submit from '@/view/submit'
import Paysuccess from '@/view/submit/paysuccess'
import Introduce from '@/view/introduce'
import Download from '@/view/download'
import Myorder from '@/view/myorder'
import Confirm from '@/view/confirm'
import Change from '@/view/change'
import Updateorder from '@/view/updateorder'
import Loopcart from '@/view/loopcart'
import Loopdown from '@/view/loopdown'
import Newpage from '@/view/newpage'
import WxAuth from '@/view/WxAuth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [

    {
      path: '/',
      // name: '首页',
      component: Home

    },
    {
      path: '/login',
      // name: '登录',
      component: Login
    },
    {
      path: '/forget',
      // name: '忘记密码',
      component: Forget
    },
    {
      // 登记注册页面
      path: '/register',
      component: Register
    },
    {
      // 优惠券
      path: '/coupon',
      component: Coupon
    },
    {
      // 详情页面
      path: '/articles',
      component: Articles
    },
    {
      path: '/order',
      // name: '我的订单',
      component: Order
    },
    {
      path: '/cart',
      // name: '购物车'
      component: Cart
    },
    {
      path: '/information',
      // 基本信息
      component: Information
    },
    {
      path: '/password',
      // 修改密码
      component: Password
    },
    {
      // 发表
      path: '/appraise',
      component: Appraise
    },
    {
      // 404页面
      path: '/404',
      component: NoFound

    },
    {
      // 我的收藏
      path: '/collect',
      component: Collect
    },
    {
      path: '/emptycart',
      // name: '购物车'
      component: Emptycart
    },
    {
      // 订单提交成功页面
      path: '/submit',
      component: Submit
    },
    {
      // 订单提交成功页面
      path: '/paysuccess',
      component: Paysuccess
    }, {
      // 商品详情的内容介绍
      path: '/introduce',
      component: Introduce
    }, {
      // 商品详情的下载页面
      path: '/download',
      component: Download
    },
    {
      // 我的订单加合计框
      path: '/myorder',
      component: Myorder
    }, {
      // 确认订单
      path: '/confirm',
      component: Confirm
    }, {
      // 更改LOGO
      path: '/change',
      component: Change
    }, {
      // 我的订单 查看更新
      path: '/updateorder',
      component: Updateorder
    }, {
      // 带轮播图的购物车页面
      path: '/loopcart',
      component: Loopcart
    }, {
      // 带轮播图的下载页面
      path: '/loopdown',
      component: Loopdown
    }, {
      // 带轮播图的下载页面
      path: '/newpage',
      component: Newpage
    }, {
      // 带轮播图的下载页面
      path: '/WxAuth',
      component: WxAuth
    }

  ]
})
// 路由导航守卫（前置导航守卫）
// router.beforeEach((to, from, next) => {
//   const user = local.getUser()
//   if (to.path !== '/login' && !user) return next('/login')
//   next()
// })

export default router
