<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!--  个人中心 -->
    <div class="personal">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="javascript:;">个人中心</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 我的订单  + 张小北 -->
    <div class="order"
         :data="OrderList">
      <div class="w clearfix">
        <!-- 左侧 -->
        <div class="left_name left">
          <my-personal></my-personal>
        </div>
        <!-- 右侧 -->
        <div class="right_order left"
             :data="OrderList_">
          <div class="my_order">
            <img src="../../assets/image/order2.png"
                 alt />
            <span>我的订单</span>
          </div>
          <div class="all_order">
            <div class="order_left">
              <ul>
                <li @click="AllOrder"
                    class="xian">
                  <a :class="reqParams.status == 0 ? 'activeLook' : ''">全部订单</a>
                </li>
                <li @click="goPay"
                    class="xian">
                  <a :class="reqParams.status == 1 ? 'activeLook' : ''">待付款</a>
                  <span>{{ OrderList_.status1 }}</span>
                </li>
                <li @click="goAppraise"
                    class="xian">
                  <a :class="reqParams.status == 2 ? 'activeLook' : ''">待评价</a>
                  <span>{{ OrderList_.status2 }}</span>
                </li>
                <li @click="goToDown"
                    class="xian">
                  <a :class="looked == 3 ? 'activeLook' : ''">可下载</a>
                  <span>{{ OrderList_.status3 }}</span>
                </li>
              </ul>
            </div>
            <div class="order_right_search">
              <div class="search_input">
                <i class="el-icon-search"></i>
                <input type="text"
                       placeholder="请输入商品名称或订单号进行搜索"
                       v-model="reqParams.keyword" />
                <input type="button"
                       value="搜索"
                       @click="search" />
              </div>
            </div>
          </div>
          <!-- 订单详情  订单状态 -->
          <div class="details">
            <div class="order_details">
              <strong>订单详情</strong>
            </div>
            <div class="order_state">
              <strong>订单状态</strong>
            </div>
          </div>
          <div v-if="OrderList.length > 0">
            <div class="order_number"
                 v-for="(item, index) in OrderList"
                 :key="index">
              <div class="order_one"
                   @click="gotoIntroduce(item)">
                <div class="order_title">
                  <div class="title_left_">
                    <img src="../../assets/image/yx_order.png"
                         alt />
                    <span class="item_num">订单号:{{ item.num }}</span>
                  </div>
                  <span class="status_name">{{ item.status_name }}</span>
                </div>
                <div class="order_content">
                  <div class="order_left_img">
                    <img :src="item.image"
                         alt />
                  </div>
                  <!-- 右侧内容 -->
                  <div class="order_right_content">
                    <div class="top_content clearfix">
                      <div class="content_details left">
                        <div class="two_text goods_name">
                          {{ item.goods_name }}
                        </div>
                      </div>
                      <div class="order_price left">
                        <div class="item_store">
                          <span class="item_icon">￥</span>
                          <span class="item_price">{{ item.pay_total }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="newtime">
                      <div class="xiadanTime">
                        下单时间：{{ item.createtime }}
                      </div>
                      <div class="xiadanTime_right"
                           v-if="item.newupdatetime != ''">
                        <span class="red">*</span>
                        <span class="redname">{{ item.newupdatetime }}更新</span>
                      </div>
                    </div>
                    <div class="pay">
                      <el-button class="bbt"
                                 style="width: 100px; height: 40px"
                                 v-if="item.status == 1"
                                 @click.stop="goNewPage(item)">付款</el-button>
                      <el-button class="bbt"
                                 style="width: 100px; height: 40px"
                                 v-if="
                          (item.status == 2 && looked == 2) ||
                          (item.status == 2 && looked == 0)
                        "
                                 @click.stop="goNewPage(item)">评价</el-button>
                      <el-button class="bbt"
                                 style="width: 100px; height: 40px"
                                 v-if="
                          (item.status == 3 && looked == 0) ||
                          (item.status == 2 && looked == 0) ||
                          looked == 3
                        "
                                 v-model="centerDialogVisible"
                                 @click.stop="download(item.goods_id)">下载</el-button>
                      <el-button v-if="item.status == -1"
                                 class="bbt"
                                 style="width: 100px; height: 40px"
                                 @click.stop="goNewPage(item)">已取消</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="empty_order"
               v-else>
            <div class="empty_img">
              <img src="../../assets/image/emptycart.png"
                   alt />
            </div>
            <div class="prompts">
              <span>
                您的订单里暂无商品,
                <a href="/"
                   target="_self">快去选购吧</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page">
      <div class="w">
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       :page-size="reqParams.offset"
                       :current-page="reqParams.page"
                       @current-change="pager"></el-pagination>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
    <!-- 弹窗部分 -->
    <el-dialog title="下载"
               :visible.sync="centerDialogVisible"
               width="584px"
               center
               show-close
               class="dialog_box"
               :data="download">
      <div class="dialog_box_">
        <div class="pop">
          <img :src="downloadFile.image"
               alt />
        </div>
        <div class="pop_title">
          <div class="my_title">
            <div class="title_left">
              <img src="../../assets/image/data81.png"
                   alt />
              <span>资料说明</span>
            </div>
            <div class="title_right">
              <span>(共{{ downloadFile.size }})</span>
            </div>
          </div>
          <div class="pop_list">
            <div class="list_1"
                 v-for="(item, index) in downloaded"
                 :key="index">
              <div class="imgs">
                <img :src="item.logo"
                     alt />
              </div>
              <p>{{ item.filename }}</p>
            </div>
          </div>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="loadfile"
                     class="download">下载</el-button>
          <el-button @click="centerDialogVisible = false"
                     class="download_1">取消</el-button>
        </div>
      </div>
    </el-dialog>

    <!--  弹窗 回顾2019 -->
    <div class="register_box"
         @click.stop="quit"
         v-if="payStatus">
      <div class="userwrap_box userwrap_bot"
           @click.stop="gotodetails">
        <div class="quit_btn"
             @click.stop="quit">
          <img src="../../assets/image/quit.png"
               alt />
        </div>
        <div class="img_report">
          <div class="changed_true"
               @click.stop="changedPay(index)"
               v-for="(item, index) in pay_away"
               :key="index">
            <div class="imgs">
              <img src="../../assets/image/fang.png"
                   alt=""
                   v-if="item.is_pay == 0" />
              <img src="../../assets/image/changefang.png"
                   alt=""
                   v-else />
            </div>
            <div class="chande">
              <img :src="item.image"
                   alt="" />
              <div class="we_text">
                {{ item.name }}
              </div>
              <div :class="item.status == 'balance' ? 'balance' : ''">
                {{ item.status == "balance" ? "￥" + money : "" }}
              </div>
            </div>
          </div>
        </div>
        <div class="pays">
          <div class="b_pay"
               @click.stop="popupIMG">付款</div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex'
export default {
  // 订单页面
  name: 'order',
  data() {
    return {
      total: 0,
      VIPlist: [],
      looked: '',
      OrderList: [],
      OrderList_: '',
      order_id: '',
      order_num: '',
      searchList: '',
      centerDialogVisible: false,
      downloaded: [],
      downloadFile: '',
      payStatus: false,
      reqParams: {
        status: 0, // 状态:-1=已取消,1=待支付,2=待评价,3=已完成
        page: 1,
        keyword: '', // 关键字搜索,
        offset: 10,
      },
      pay_away: [
        {
          is_pay: 0,
          status: 'wechat',
          name: '微信',
          image: require('../../assets/image/data89.png'),
        },
        {
          is_pay: 0,
          status: 'alipay',
          name: '支付宝',
          image: require('../../assets/image/zhifubao.png'),
        },
        {
          is_pay: 0,
          status: 'balance',
          name: '余额',
          image: require('../../assets/image/data90.png'),
        },
      ],
      pay_new_type: '',
      order_new_id: '',
      order_new_num: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {})
  },
  created() {
    // console.log(this.$route.query.status);
    // console.log(typeof (this.$route.query.status) === 'string' ? true : false);
    let obj = JSON.parse(this.$route.query.status)
    this.reqParams.status = obj
    if (obj == 3) {
      this.looked = obj
      this.reqParams.status = 10
    }
    // console.log(this.reqParams.status);
    this.getOrder()
  },
  computed: {
    ...mapState(['money']),
  },
  methods: {
    async getOrder() {
      try {
        const {
          data: { data },
        } = await this.$http.post('api/user/order', this.reqParams)
        this.OrderList = data.list
        this.OrderList_ = data
        this.total = data.total
        console.log(data)
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    // 搜索
    search() {
      this.getSearchList()
    },
    // 搜索结果
    async getSearchList() {
      const {
        data: { data },
      } = await this.$http.post('api/user/order', this.reqParams)
      this.searchList = data.list || {}
      if (this.searchList.length > 0) {
        this.OrderList = ''
        this.OrderList = this.searchList
      } else {
        this.$message.error('未查询到内容')
      }
    },
    changedPay(i) {
      let that = this
      that.pay_away = this.pay_away
      that.pay_away.forEach((item, index) => {
        if (i == index) {
          item.is_pay = 1
          that.pay_new_type = item.status
        } else {
          item.is_pay = 0
        }
      })
    },
    pager(newPage) {
      // 分页函数
      this.reqParams.page = newPage
      this.getOrder()
    },
    popupIMG() {
      // 去支付
      let that = this
      console.log(that.pay_new_type, 'we_chat')
      if (that.pay_new_type == 'wechat') {
        console.log(that.pay_new_type, 'we_chat')
        this.$router.push({
          path: '/submit',
          query: {
            order_id: that.order_new_id,
            pay_type: that.pay_new_type,
            order_num: that.order_new_num,
          },
        })
      } else if (that.pay_new_type == 'alipay') {
        that.alipayZFB()
      } else {
        that.Balance()
      }
      that.quit()
    },
    async alipayZFB() {
      // 订单支付宝支付
      const newWin = window.open('about:blank', 'alipay')
      let obj = {}
      obj.order_id = this.order_new_id
      obj.pay_type = this.pay_new_type
      const {
        data: { data },
      } = await this.$http.post('api/order/orderPay', obj)
      console.log(data)
      var { href } = this.$router.resolve({
        path: '/newpage',
        query: {
          htmls: data.result,
        },
      })
      this.MakeForm()
      newWin.location.href = href
    },
    MakeForm(str, str2) {
      // 创建一个 form
      var form1 = document.createElement('form')
      form1.id = 'form1'
      form1.name = 'form1'
      // 添加到 body 中
      document.body.appendChild(form1)
      // 创建一个输入
      var input = document.createElement('input')
      // 设置相应参数
      input.type = 'text'
      input.name = 'ssId'
      input.value = str
      // 将该输入框插入到 form 中
      form1.appendChild(input)
      // 创建一个输入
      var input2 = document.createElement('input')
      // 设置相应参数
      input2.type = 'text'
      input2.name = 'productId'
      input2.value = str2
      // 将该输入框插入到 form 中
      form1.appendChild(input2)
      // form 的提交方式
      form1.method = 'POST'
      // form 提交路径
      form1.action = './test.php'
      // 对该 form 执行提交
      form1.submit()
      // 删除该 form
      document.body.removeChild(form1)
    },
    async Balance() {
      //  订单余额支付
      let obj = {}
      obj.order_id = this.order_new_id
      obj.pay_type = this.pay_new_type
      try {
        const { data } = await this.$http.post('api/order/orderPay', obj)
        if (data.code == 1) {
          this.$router.push({
            path: '/paysuccess',
            query: {
              order_id: this.order_new_id,
              order_num: this.order_new_num,
            },
          })
        } else {
          this.$message.error('余额不足')
        }
      } catch (err) {
        console.log(err)
      }
    },
    quit() {
      console.log(this.payStatus, '执行前')
      this.payStatus = !this.payStatus
      console.log(this.payStatus, '执行后')
    },
    AllOrder() {
      // 1. 全部订单
      this.looked = 0
      this.reqParams.status = 0
      this.getOrder()
    },
    goPay() {
      // 2.  待支付
      this.looked = 1
      this.reqParams.status = 1
      this.getOrder()
    },

    goAppraise() {
      // 3. 待评价
      this.looked = 2
      this.reqParams.status = 2
      this.getOrder()
    },

    goToDown() {
      // 4. 可下载
      this.looked = 3
      this.reqParams.status = 10
      this.getOrder()
    },
    //  订单列表选择
    goNewPage(item) {
      //  去付款
      console.log("我第一次执行。+'0'++")
      console.log(item.status)
      if (item.status == 1) {
        console.log(item)
        this.pay_away.forEach((items) => {
          items.is_pay = 0
          if (item.pay_type == items.status) {
            items.is_pay = 1
          }
        })
        this.quit()
        this.pay_away = this.pay_away
        this.order_new_id = item.id
        this.order_new_num = item.num
        this.pay_new_type = item.pay_type
      } else if (item.status == 2) {
        // 去评价
        this.$router.push({
          path: '/appraise',
          query: {
            goods_id: item.goods_id,
            order_id: item.id,
          },
        })
      } else {
        this.$message.success('该订单已取消')
      }
    },
    // 立即下载
    async download(goods_id) {
      this.centerDialogVisible = !this.centerDialogVisible
      console.log(goods_id)
      this.goods_id = goods_id
      this.downloaded = []
      const {
        data: { data },
      } = await this.$http.post('api/goods/getGoodsFile', {
        goods_id: goods_id,
      })
      this.downloaded = data.list
      this.downloadFile = data
      console.log('下载文件详情', data, this.downloaded)
    },

    async loadfile() {
      // 弹窗内的文件下载
      await this.$http
        .post('api/goods/downloadGoodsFile', { goods_id: this.goods_id })
        .then((res) => {
          console.log(res)
          this.centerDialogVisible = !this.centerDialogVisible
          let url = res.data.data
          window.location.href = 'https://glaforteachers.com' + url
          this.$message.success('下载成功')
        })
        .catch((err) => {
          console.log(err)
          this.$message.success('下载失败')
        })
    },
    // 去商品详情
    gotoIntroduce(item) {
      this.$router.push({
        path: '/loopcart',
        query: { goods_id: item.goods_id, type: item.type },
      })
    },
  },
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  //   个人中心
  .personal {
    padding-top: 20px;
    .w {
      .el-breadcrumb {
        height: 40px;
        line-height: 40px;
        .el-breadcrumb-item {
          color: #ccc;
          z-index: 999;
          .el-breadcrumb__inner {
            color: #87b4e4;
            z-index: 99;
          }
        }
      }
    }
  }
  .order {
    .w {
      .left_name {
        width: 256px;
        height: 778px;
        background-color: #fff;
        box-shadow: 5px 5px 5px #f4f4f4;
      }
      // 右侧
      .right_order {
        margin-left: 16px;
        width: 928px;
        height: 100%;
        border-bottom: 2px solid #f5f5f5;
        padding: 20px 32px;
        box-sizing: border-box;
        box-shadow: 5px 5px 5px #f4f4f4;
        background-color: #fff;
        .my_order {
          height: 50px;
          display: flex;
          align-items: center;

          img {
            width: 19px;
            height: 22px;
          }
          span {
            padding-left: 10px;
            font-size: 20px;
            // font-weight: bold;
          }
        }
        .all_order {
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .order_left {
            height: 40px;
            // line-height: 40px;

            ul {
              display: flex;
              align-items: center;
              height: 40px;
              .xian {
                float: left;
                border-right: 1px solid #ccc;
                height: 18px;
                line-height: 18px;
                padding: 0 10px;
                a {
                  color: #ccc;
                  font-size: 18px;
                }
                .activeLook {
                  color: #416fae;
                  font-weight: bold;
                }
                span {
                  margin-left: 10px;
                  color: red;
                }
                .el-divider {
                  margin: 0 15px;
                }
              }
              li:last-child {
                border-right: 0px solid #ccc;
              }
            }
          }
          .order_right_search {
            width: 320px;
            .search_input {
              display: flex;
              justify-content: flex-start;
              position: relative;
              .el-icon-search {
                position: absolute;
                left: 13px;
                top: 13px;
              }
              input:nth-child(2) {
                text-indent: 30px;
                height: 38px;
                width: 263px;
                line-height: 38px;
                border: 1px solid #416fae;
                // border: none;
              }
              /deep/input::-webkit-input-placeholder {
                color: #ccc;
                font-size: 14px;
              }
              input:nth-child(3) {
                float: left;
                width: 75px;
                background: linear-gradient(
                  93deg,
                  rgba(39, 80, 140, 1) 0%,
                  rgba(65, 111, 174, 1) 100%
                );
                opacity: 1;
                border-radius: 0px 4px 4px 0px;
                border: none;
                color: #fff;
              }
            }
          }
        }
        // 订单详情 订单状态
        .details {
          display: flex;
          height: 48px;
          line-height: 48px;
          background-color: #f4f5f9;
          margin: 20px 0;

          .order_details {
            padding-left: 15px;
            flex: 1;
          }
          .order_state {
            flex: 1;
            padding-left: 15px;
          }
        }
        .empty_order {
          padding-top: 100px;
          box-sizing: border-box;
          min-height: 544px;

          .empty_img {
            width: 60%;
            margin: 0 auto;
            img {
              width: 100%;
              margin: auto;
            }
          }
          .prompts {
            margin-top: 60px;
            height: 60px;
            text-align: center;
            span {
              font-size: 20px;
              color: #000;
            }
          }
        }
        // 图文集
        .order_number {
          .order_one {
            padding: 20px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #f5f5f5;
            .order_title {
              display: flex;
              margin-bottom: 10px;
              align-items: center;
              height: 30px;

              .title_left_ {
                flex: 1;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .item_num {
                  font-size: 16px;
                  margin-left: 10px;
                }
                img {
                  width: 20px;
                  height: 24px;
                }
              }
              .status_name {
                flex: 1;
                text-align: right;
                font-size: 18px;
                padding-right: 20px;
              }
            }
            // 订单内容
            .order_content {
              display: flex;
              .order_left_img {
                width: 224px;
                height: 139px;
                img {
                  border-radius: 8px;
                  height: 139px;
                  width: 100%;
                }
              }

              .order_right_content {
                flex: 1;
                position: relative;
                .top_content {
                  display: flex;
                  width: 100%;
                  .content_details {
                    flex: 1;

                    .goods_name {
                      font-size: 18px;
                      height: 56px;
                      padding: 5px 16px;
                      box-sizing: border-box;
                    }
                  }
                  .order_price {
                    width: 150px;
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 20px 0 0;
                    box-sizing: border-box;
                    .item_store {
                      display: flex;
                      align-items: baseline;
                      .item_icon {
                        color: red;
                        font-weight: bold;
                        font-size: 14px;
                      }
                      .item_price {
                        color: red;
                        font-weight: bold;
                        font-size: 20px;
                      }
                    }
                  }
                }
                .newtime {
                  height: 30px;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .xiadanTime {
                    font-size: 16px;
                    color: #ccc;
                    line-height: 30px;
                    padding: 5px 16px;
                    box-sizing: border-box;
                  }
                  .xiadanTime_right {
                    // display: flex;
                    text-align: right;
                    padding-right: 20px;
                    box-sizing: border-box;
                    .red {
                      color: #ff0000;
                    }
                    .redname {
                      font-size: 12px;
                      color: #666666;
                    }
                  }
                }

                .pay {
                  position: absolute;
                  bottom: 5px;
                  right: 20px;

                  input {
                    height: 40px;
                    width: 100px;
                    border-style: none;
                    background-color: #416fae;
                    border: 1px solid #416fae;
                    color: #fff;
                    border-radius: 20px;
                    text-align: center;
                    outline: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // 第四部分 分页
  .page {
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    .w {
      .el-pagination {
        text-align: right;
      }
    }
  }
  // -------------------------------------------------------------------------------
  // 弹窗部分
  .dialog_box_ {
    height: 100%;
    padding-bottom: 20px;
    box-sizing: border-box;
    .pop_title {
      margin-left: 20px;
      margin-bottom: 20px;

      .my_title {
        height: 50px;
        width: 300px;
        line-height: 50px;

        .title_left {
          position: relative;
          width: 128px;
          border-bottom: 3px solid #416fae;
          float: left;

          img {
            width: 24px;
            position: absolute;
            top: 50%;
            margin-top: -10px;
          }

          span {
            color: #2c2c2c;
            font-size: 20px;
            font-weight: 600;
            margin-left: 40px;
          }
        }
        .title_right {
          float: left;
          span {
            color: #666666;
            font-size: 14px;
          }
        }
      }
      .pop_list {
        margin-top: 5px;
        border-top: 1px solid #ccc;
        .list_1 {
          position: relative;
          height: 40px;
          line-height: 40px;
          display: flex;
          .imgs {
            width: 30px;
            height: 40px;
            img {
              width: 24px;
              height: 24px;
              position: absolute;
              top: 8px;
              left: 0;
            }
          }

          p {
            color: #666666;
            font-size: 16px;
          }
        }
      }
    }
    .dialog-footer {
      margin: 20px 30px;
      height: 46px;
      .download {
        width: 168px;
        height: 46px;
        text-align: center;
        font-size: 19px;
        color: #fff;
        background-color: #416fae;
        border: 2px solid #416fae;
        border-radius: 25px;
        margin: 0 50px;
      }
      .download_1 {
        width: 168px;
        height: 46px;
        text-align: center;
        font-size: 19px;
        color: #416fae;
        background-color: #fff;
        border: 2px solid #416fae !important;
        border-radius: 25px;
        margin: 0 5px;
        // border: 2px solid ;
      }
    }
  }

  // 弹窗 回顾2019
  .register_box {
    .userwrap_bot {
      width: 360px;
      height: 360px;
      background-color: #fff;
      padding: 16px;
      box-sizing: border-box;
      .quit_btn {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        img {
          width: 32px;
          height: 32px;
        }
      }
      .img_report {
        width: 100%;
        .changed_true {
          width: 100%;
          display: flex;
          align-items: center;
          height: 68px;
          border-bottom: 1px solid #f9f9f9;

          .imgs {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 20px;
              height: 20px;
            }
          }

          .chande {
            flex: 1;
            display: flex;
            align-items: center;

            .we_text {
              font-size: 16px;
              color: #323233;
              margin-left: 10px;
            }
            .balance {
              color: #ff5823;
              font-size: 16px;
              margin-left: 10px;
            }

            img {
              width: 28px;
              height: 28px;
            }
          }

          &:last-child {
            border-bottom: 0 none;
          }
        }
      }
      .pays {
        height: 68px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .b_pay {
          width: 150px;
          height: 38px;
          background: linear-gradient(to right, #416fae, #27508c);
          border-radius: 10px;
          border: 1px solid #416fae;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>