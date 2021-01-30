<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header @result="searchResult"></my-header>
    <!-- 轮播图 -->
    <div class="img">
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
        class="slide"
        :data="loop"
      >
        <swiper-slide
          v-for="item in loop"
          :data-jumpUrl="item.url"
          :key="item.id"
        >
          <div
            class="loops"
            @click="swiperLoop(item)"
            :style="
              'background:url(' +
              item.image + 
              ') no-repeat center;background-size: 100% auto ;'
            "
          ></div>
        </swiper-slide>  
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 第三部分 -->
    <div class="content">
      <div class="w">
        <!-- 左侧部分 -->
        <div class="left_text ">
          <div class="grade">
            <div class="grade_title">
              <div class="small_title_1" @click="goArticles">
                <h3>{{ tdList.title2.cn }}/</h3>
                <span>{{ tdList.title2.en }}</span>
              </div>
            </div>
            <!-- 班级分类 -->
            <div class="classes">
              <div class="left_class" :data="classList">
                <el-checkbox
                  v-model="checkAll"
                  class="labelBOX"
                  @change="classChange"
                  >全选</el-checkbox
                >
                <div style="margin: 15px 0"></div>
                <el-checkbox-group
                  v-model="checkedClasses"
                  @change="CitiesChangeItem"
                >
                  <el-checkbox
                    v-for="itemClass in classList"
                    :label="itemClass.id"
                    :key="itemClass.id"
                    style="line-height: 45px; margin-right: 23px"
                    class="labelBOX"
                    >{{ itemClass.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <!-- 分类 -->
          <div class="classification">
            <div class="classification_title">
              <div class="small_title_2">
                <h3>{{ tdList.title3.cn }}/</h3>
                <span>{{ tdList.title3.en }}</span>
              </div>
            </div>
            <el-form ref="form">
              <el-checkbox
                style="margin-top: 20px"
                class="labelBOX"
                v-model="checkedAll"
                @change="checkeAllCate"
                >全部</el-checkbox
              >
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                :data="categoryList"
                v-for="(item, index) in categoryList"
                :key="index"
              >
                <el-submenu index="1" class="itemNmae">
                  <template slot="title">
                    <span>{{ item.name }}</span>
                  </template>
                  <el-checkbox-group v-model="able">
                    <el-checkbox
                      v-for="(items, index) in item.child"
                      :label="items.id"
                      :key="index"
                      style="
                        line-height: 45px;
                        margin-right: 45px;
                        margin-left: 25px;
                      "
                      class="labelBOX"
                      @change="checkeAllCateItem(items)"
                      >{{ items.name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </el-submenu>
              </el-menu>
            </el-form>
          </div>
          <!-- 价格 -->
          <div class="price">
            <div class="price_title">
              <div class="small_title_3">
                <h3>{{ tdList.title4.cn }}/</h3>
                <span>{{ tdList.title4.en }}</span>
              </div>
            </div>
            <!-- 价格分类 -->
            <div class="price_list" :data="priceList">
              <div
                class="left_price"
                v-for="(item, index) in priceList"
                :key="index"
                @change="priceChangeitem(item)"
              >
                <el-checkbox class="labelBOX">{{ item.name }}</el-checkbox>
              </div>
              <div class="hot">
                <img src="../../assets/image/Hot_1.png" alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧部分 -->
        <div class="right_text "> 
          <div class="title_tltle">
            <ul class="box">
              <li class="boxitem left" @click="selliu">
                <div class="boxitemleft">
                  <img
                    src="../../assets/image/biaoqian_icon_3@2x.png"
                    v-if="select_1"
                    alt
                  />
                  <img
                    src="../../assets/image/biaoqian_icon_1@2x.png"
                    v-else
                    alt
                  />
                </div>
                <div class="look">
                  <div class="lookleft" :class="{ itt: select_1 }">浏览量</div>
                  <div class="lookright">
                    <div :class="isActive_1 ? 'active' : 'topsanjiao'"></div>
                    <div :class="isActived_1 ? 'actived' : 'downsanjiao'"></div>
                  </div>
                </div>
              </li>
              <li class="boxitem left widthkuan" @click="seltime">
                <div class="boxitemleft">
                  <img
                    src="../../assets/image/biaoqian_icon_4@2x.png"
                    alt
                    v-if="select_2"
                  />
                  <img
                    src="../../assets/image/biaoqian_icon_2@2x.png"
                    alt
                    v-else
                  />
                </div>
                <div class="look">
                  <div class="lookleft" :class="{ itt: select_2 }">
                    上架时间
                  </div>
                  <div class="lookright">
                    <div :class="isActive_2 ? 'active' : 'topsanjiao'"></div>
                    <div :class="isActived_2 ? 'actived' : 'downsanjiao'"></div>
                  </div>
                </div>
              </li>
              <li class="boxitem left" @click="selprice">
                <div class="boxitemleft">
                  <img
                    src="../../assets/image/biaoqian_icon_6@2x.png"
                    alt
                    v-if="select_3"
                  />
                  <img
                    src="../../assets/image/biaoqian_icon_5@2x.png"
                    alt
                    v-else
                  />
                </div>
                <div class="look">
                  <div class="lookleft" :class="{ itt: select_3 }">价格</div>
                  <div class="lookright">
                    <div :class="isActive_3 ? 'active' : 'topsanjiao'"></div>
                    <div :class="isActived_3 ? 'actived' : 'downsanjiao'"></div>
                  </div>
                </div>
              </li>
              <li class="boxitem left" @click="seltable">
                <div class="boxitemleft">
                  <img
                    src="../../assets/image/biaoqian_icon_8@2x.png"
                    alt
                    v-if="select_4"
                  />

                  <img
                    src="../../assets/image/biaoqian_icon_7@2x.png"
                    alt
                    v-else
                  />
                </div>
                <div class="look">
                  <div class="lookleft" :class="{ itt: select_4 }">
                    教学进程表
                  </div>
                  <div class="lookright"></div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 图文商品列表 -->
          <div class="box_store_" :data="content">
            <div
              class="list_img_1"
              v-for="item in content"
              :key="item.id"
              @click="toDetails(item)"
            >
              <div class="img_box">
                <img :src="item.image" alt />
              </div>
              <div class="flash_sale" v-if="item.reduced_price > 0">
                <div class="time_limit">
                  <div class="sale">
                    <span>限时特惠</span>
                  </div>
                </div>
              </div>
              <div class="smallbox">
                <div class="text">{{ item.name }}</div>
                <div class="price">
                  <div class="price_red">
                    <span v-if="item.price > 0" class="red_icon">￥</span>
                    <span class="red_icon_span">{{
                      item.reduced_price == 0 ? item.price : item.reduced_price
                    }}</span>
                    <del v-if="item.reduced_price > 0">￥{{ item.price }}</del>
                  </div>
                  <div class="people">
                    <img src="../../assets/image/eye.png" alt />
                    <span>{{ item.view_num }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page">
      <div class="w">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.page"
          :current-page="reqParams.offset"
          @current-change="pager"
        ></el-pagination>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
    <!--  置顶按钮  和小智 -->
    <div class="to_top">
      <div class="ash">
        <div class="ash_ash" @click="fn">
          <img src="../../assets/image/ash.png" alt />
        </div>
        <div class="dialogue" v-if="up">
          <div class="dialogue_top_box">
            <div class="top_dialogue">
              <img src="../../assets/image/pic_ai.png" alt />
              <span>智能客服</span>
              <span>知识渊博的问答机器人</span>
            </div>
            <div class="left_per_i">
              <el-scrollbar style="height: 320px">
                <div
                  class="list_index_box"
                  v-for="(item, index) in kcList"
                  :key="index"
                >
                  <div class="list_index" v-if="item.type == 1">
                    <div class="list_index_img">
                      <img src="../../assets/image/pic——aihead.png" alt />
                    </div>
                    <p class="list_index_txt" style="white-space: pre-wrap">
                      {{ item.content }}
                    </p>
                  </div>
                  <div class="list_index now_right" v-if="item.type == 2">
                    <div class="list_index_txt_right">{{ item.content }}</div>
                    <div class="list_index_img now">
                      <img :src="avatar" v-if="avatar != ''" alt />
                      <img v-else src="../../assets/image/logoimg.png" alt />
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div class="updown clearfix">
            <div class="reply_box left">
              <img src="../../assets/image/look.png" alt />
              <img src="../../assets/image/edit.png" alt />
            </div>
            <div class="reply_txt left">
              <el-input type="text" placeholder="写回复" v-model="values" />
            </div>
            <div class="right_per_i right" @click="sendText">
              <img src="../../assets/image/fly5396.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="top" @click="backTop" v-if="btnFlag">
        <img src="../../assets/image/top.png" alt />
      </div>
    </div>
    <!--  弹窗 回顾2019 -->
    <div class="register_box" @click.stop="popupIMG" v-if="showent">
      <div class="userwrap_box" @click.stop="gotodetails">
        <div class="quit_btn" @click.stop="quit">
          <img src="../../assets/image/quit.png" alt />
        </div>
        <div class="img_report">
          <img :src="popup.image" alt />
          <!-- <div class="two_code">
            <img :src="popup.qrcode" alt />
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import MyHeader from "@/components/my-header";
export default {
  name: "home",
  components: {
    MyHeader
  },
  data() {
    return {
      kcList: [
        {
          id: 1,
          type: 1,
          content: '嘿，很高兴为您服务，悄悄告诉您：我不是实时在线的人工客服，目前只能回复简单的问题，但是细心的我已经想到您可能会咨询的常见问题！\n \n· 最新活动 \n· 如何购买 \n· 如何换LOGO \n· 如何找订单 \n· 关于口袋宇宙 \n \n输入这些关键词，就能得到我们的解答喽！如果您有急切要解决的问题，可以直接加小助手微信，我们会以最快的速度回复您！\n \n遇到打不开网页的问题，可咨询小助手（微信号：shucai_001）\n遇到网站操作相关问题，可咨询小助手（微信号：shucai_002）',
          img: ''
        }
      ],
      checkList: [], //已选择的价格 
      sending: [], // 发送消息
      isActive_3: false,
      isActived_3: false,
      isActive_1: false,
      isActived_1: false,
      isActive_2: false,
      isActived_2: false,
      select_1: false,   // 浏览量
      select_2: false,
      select_3: false,
      select_4: false,
      able: [], //当前选中的分类ID
      ableChangecate: [],//您已选择分类ID对应的name
      ableNum: 0,//所有分类长度
      lableAllList: [],//所有分类ID
      ableList: [],//分类所有数据
      checkedAll: false,  // 分类全选
      eye: false,
      className: [],
      loop: [],
      tdList: {
        title1: {
          cn: '',
          en: '',
        },
        title2: {
          cn: '',
          en: '',
        },
        title3: {
          cn: '',
          en: '',
        },
        title4: {
          cn: '',
          en: '',
        },
      },
      content: [],
      categoryList: [],
      categoryChildList: [],
      priceList: [],
      activeTab: "appraise",
      classList: [], // 空数组
      dataList: [],
      isIndeterminate: true,
      checkAll: false,
      checkedClasses: [], // 选中
      url: '',
      swiperOptions: {
        loop: true,
        autoplay: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      },

      keyword: [],
      values: '',
      reqParams: {
        response_type: "comment",
        keyword: "", // 关键字搜索
        grade: "", // 年级id
        category: "", // 分类id
        price: "", //价格筛选
        view_num: "", //	浏览量排序 1=降序,2=升序
        createtime: "", //	上架时间排序 1=降序,2=升序
        price_type: "", // 价格排序 1=降序,2=升序
        type: "", //	教学进程表
        offset: 1, // 页数
        page: 12
      },
      goods_id: "",
      pid: "",
      pId: "",
      total: 0,
      code: "",
      showed: false, // 您已选择
      showent: false, // 弹窗2019
      btnFlag: false,
      up: false, // 智能客
      status: "",//  状态:1=付费,2=免费
      popup: '',
      itemName: [],
      classID: [],
      onpresscTime: false  //  阻止短时间内连续点击
    }
  },
  created() {
    this.getLoop();
    this.getHomeContent();
    this.getClassList();
    this.getCategory();
    this.getPriceList();
    this.popupIMG();
    this.getTitle()
  },
  computed: {
    ...mapState(['nickname', 'pername', 'money', 'avatar']),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },

  },
  watch: {
    able: function (newVal, oldVal) {
      // this.reqParams.category = JSON.stringify(newVal)
      this.reqParams.category = newVal.toString()
      if (newVal.length > 0) {
        this.showed = true
      }
      if (newVal.length == this.ableNum) {
        this.checkedAll = true
        this.getHomeContent()
        var a = []
        for (var i = 0; i < newVal.length; i++) {
          for (var y = 0; y < this.ableList.length; y++) {
            if (newVal[i] == this.ableList[y].id) {
              a.push(this.ableList[y].name)
            }
          }
        }
        this.ableChangecate = a
      } else {
        this.checkedAll = false
        this.reqParams.category = this.reqParams.category.toString()
        this.getHomeContent()
      }

    }
  },
  methods: {

    selliu() {     // 浏览量
      this.select_2 = false;
      this.isActive_2 = false
      this.isActived_2 = false
      this.select_3 = false;
      this.isActive_3 = false
      this.isActived_3 = false
      this.select_4 = false;
      if (this.isActive_1) {
        this.select_1 = true;
        this.isActive_1 = false
        this.isActived_1 = true
        this.reqParams.view_num = 1;

      } else if (this.isActived_1) {
        this.select_1 = false;
        this.isActive_1 = false
        this.isActived_1 = false
        this.reqParams.view_num = '';

      } else {
        this.select_1 = true;
        this.isActived_1 = false
        this.isActive_1 = true
        this.reqParams.view_num = 2;

      }
      this.reqParams.createtime = "";
      this.reqParams.price_type = "";
      this.reqParams.type = "";
      this.getHomeContent()
    },
    seltime() {   // 上架时间
      this.select_1 = false;
      this.isActive_1 = false
      this.isActived_1 = false
      this.select_3 = false;
      this.isActive_3 = false
      this.isActived_3 = false
      this.select_4 = false;

      if (this.isActive_2) {
        this.select_2 = true;
        this.isActive_2 = false
        this.isActived_2 = true
        this.reqParams.createtime = 1;

      } else if (this.isActived_2) {
        this.select_2 = false;
        this.isActive_2 = false
        this.isActived_2 = false
        this.reqParams.createtime = '';

      } else {
        this.select_2 = true;
        this.isActived_2 = false
        this.isActive_2 = true
        this.reqParams.createtime = 2;

      }
      this.reqParams.view_num = "";
      this.reqParams.price_type = "";
      this.reqParams.type = "";
      this.getHomeContent();
    },
    selprice() {  // 价格
      this.select_2 = false;
      this.isActive_2 = false
      this.isActived_2 = false
      this.select_1 = false
      this.isActive_1 = false
      this.isActived_1 = false
      this.select_4 = false;
      if (this.isActive_3) {
        this.select_3 = true;
        this.isActive_3 = false
        this.isActived_3 = true
        this.reqParams.price_type = 1;


      } else if (this.isActived_3) {
        this.select_3 = false;
        this.isActive_3 = false
        this.isActived_3 = false
        this.reqParams.price_type = '';

      } else {
        this.select_3 = true;
        this.isActive_3 = true
        this.isActived_3 = false
        this.reqParams.price_type = 2;

      }

      this.reqParams.createtime = "";
      this.reqParams.view_num = "";
      this.reqParams.type = "";
      this.showprice = !this.showprice;

      this.getHomeContent();
    },
    seltable() {  // 教学进程表
      this.select_1 = false;
      this.isActive_1 = false
      this.isActived_1 = false
      this.select_2 = false;
      this.isActive_2 = false
      this.isActived_2 = false
      this.select_3 = false;
      this.isActive_3 = false
      this.isActived_3 = false
      this.reqParams.createtime = "";
      this.reqParams.price_type = "";
      this.reqParams.view_num = "";
      if (this.select_4 == false) {
        this.select_4 = true;
        this.reqParams.type = 1;
      } else {
        this.select_4 = false;
        this.reqParams.type = '';

      }
      this.getHomeContent();

    },
    classChange() {
      let obj = this.classID.join(',')
      this.$router.push({ path: '/articles', query: { grade: obj } })
    },
    CitiesChangeItem(v) {
      let obj = v.join(',')
      this.$router.push({ path: '/articles', query: { grade: obj } })
    },
    checkeAllCateItem(item) {
      // console.log(item);
      this.$router.push({ path: '/articles', query: { category: item.id, way: 1 } })
    },
    checkeAllCate() {
      let obj = this.lableAllList.join(',')
      this.$router.push({ path: '/articles', query: { category: obj } })
    },
    priceChangeitem(item) {
      this.$router.push({ path: '/articles', query: { price: item.id } })
    },
    searchResult(data) {
      console.log(data);
    },
    // 智能客服
    fn() {
      this.up = !this.up;
    },
    // 获取首页内容
    async getHomeContent() {
      const {
        data: { data }
      } = await this.$http.post("api/index/goodsList", this.reqParams);
      this.content = data.list;
      this.total = data.total;
      console.log(data);
    },
    goArticles() {
      this.$router.push('/articles');
    },
    toDetails(item) {
      this.$router.push({ path: "/loopcart", query: { goods_id: item.id, type: item.type } });
    },
    sendText() {     // 发送消息
      var t = this, i = t.kcList.length + 1;
      if (this.onpresscTime) {
        return
      } else {
        this.onpresscTime = true
        if (t.values) {
          var obj = {
            id: i,
            img: '',
            type: 2,
            content: t.values
          }
          t.elInput()
          // var obj1 = {
          //   id: 1,
          //   type: 1,
          //   content: '我是智能客服，有什么可以帮您的吗？',
          //   img: ''
          // }
          t.kcList.push(obj);
          // t.kcList.push(obj1);
          // console.log(t.kcList)
        } else {
          this.$message.error('不能发送空白消息')
        }
        setTimeout(() => {
          this.onpresscTime = false
        }, 1300);
      }
    },
    swiperLoop(lp) {
      this.loop.forEach(item => {
        if (lp.id == item.id) {
          let url = item.url
          // window.location.replace(url);
          window.open(url);
        }
      })
    },
    async elInput() {    //发送
      let that = this
      let obj = this.values;
      try {
        const { data: { data } } = await that.$http.post(
          "api/service/getService",
          { keyword: obj }
        )

        setTimeout(function () {
          var obj1 = {
            id: 1,
            type: 1,
            content: data,
            img: ''
          }
          that.kcList.push(obj1);
        }, 2000);

        that.values = '';
      } catch (err) {
        that.$message.error('发送失败')
      }
    },
    //   轮播图
    async getLoop() {
      const {
        data: { data }
      } = await this.$http.post("api/sundry/getSlide");
      this.loop = data;
      // console.log(data);

    },
    // 班级列表
    async getClassList() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/sundry/getGrade");
        this.classList = data;
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.classID.push(data[i].id)
        }
        // console.log(this.classID);
      } catch (err) {
        console.log(err);
      }

    },
    // 分类列表
    async getCategory() {
      const {
        data: { data }
      } = await this.$http.post("api/sundry/getCategory");
      this.categoryList = data;
      // console.log(data)
      for (var i = 0; i < data.length; i++) {
        this.ableNum += data[i].child.length
        for (var y = 0; y < data[i].child.length; y++) {
          this.lableAllList.push(data[i].child[y].id)
          this.ableList.push(data[i].child[y])
        }
      }
    },
    // 价格列表
    async getPriceList() {
      const { data: { data } } = await this.$http.post("api/sundry/getPrice");
      this.priceList = data;
    },
    //  置顶
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    pager(newPage) {   // 分页函数
      this.reqParams.offset = newPage
      this.getHomeContent()
    },
    quit() {       // 弹窗2019
      this.showent = !this.showent;
    },
    async popupIMG() {  // 回顾2019
      const { data: { data } } = await this.$http.post('api/sundry/getActivity')
      // console.log(data);
      if (data.length != 0) {
        this.showent = !this.showent
        this.popup = data
        this.url = data.url
      } else {
      }
    },
    gotodetails() {
      window.open(this.url);
    },
    async getTitle() {
      try {
        const { data: { data } } = await this.$http.post('api/sundry/getTitle');
        // console.log(data);
        this.tdList = data
      } catch (err) {
        console.log(err);
        this.$message.error(err.msg);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }

};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  //   轮播图
  .img {
    width: 100%;
    position: relative;
    // background-color: #ff0000 !important;
    .loops {
      width: 100%;
      height: 488px;
      img {
        width: 100%;
      }
    }

    .img_title {
      width: 500px;
      height: 400px;
      z-index: 2;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        p {
          color: #fff;
          font-size: 45px;
          font-family: "FZLanTingHei-H-GBK";
          font-weight: 700r;
          text-align: center;
        }
        margin: 10px 0;
      }
      .title_text {
        color: #fff;
        font-size: 16px;
        margin: 10px 0;
        text-align: center;
      }
      .crossing {
        width: 50px;
        height: 4px;
        background-color: #fff;
        margin: 10px auto;
      }
    }
  }
  //   第三部分
  .content {
    // height: 1270px;
    margin-bottom: 20px;
    margin-top: 40px;

    .w {
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      width: 1200px;

      .left_text {
        width: 320px;
        // 已选择的
        .selected {
          margin-bottom: 20px;
          background-color: #fff;
          // 标题
          .selected_title {
            width: 320px;
            height: 56px;
            background: url("../../assets/image/img_bg.png") no-repeat;
            position: relative;
            .small_selected_title {
              position: absolute;
              left: 20px;
              bottom: 5px;
              h3 {
                display: inline-block;
                color: #fff;
                font-size: 25px;
              }
              span {
                display: inline-block;
                color: #ccc;
              }
            }
          }
          .selected_grade {
            padding: 20px 20px 0 20px;
            box-sizing: border-box;
            width: 100%;
            p {
              color: #666666;
              font-size: 20px;
              height: 32px;
              line-height: 32px;
            }
            .grade_name {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              .grade_list {
                margin: 10px;
                box-sizing: border-box;
                border: 1px solid #416fae;
                border-radius: 8px;
                height: 100%;
                padding: 0 20px;
                position: relative;
                p {
                  text-align: center;
                  font-size: 14px;
                  line-height: 32px;
                  color: #416fae;
                }
                .cancel {
                  position: absolute;
                  background-color: #416fae;
                  bottom: 0px;
                  right: 0;
                  width: 0;
                  height: 0;
                  border-top: 10px solid #fff;
                  border-right: 10px solid #416fae;
                  border-bottom: 10px solid #416fae;
                  border-left: 10px solid #fff;
                  border-radius: 0 0 8px 0;

                  .cancel_1 {
                    color: #fff;
                    position: absolute;
                    font-size: 3px;
                    top: -4px;
                    left: 0px;
                  }
                }
              }
            }
          }
        }

        // 班级
        .grade {
          .grade_title {
            width: 320px;
            height: 56px;
            background: url("../../assets/image/img_bg.png") no-repeat;
            position: relative;
            .small_title_1 {
              position: absolute;
              left: 20px;
              bottom: 5px;

              h3 {
                display: inline-block;
                color: #fff;
                font-size: 25px;
              }
              span {
                display: inline-block;
                color: #ccc;
              }
            }
          }
          .classes {
            background-color: #fff;
            .left_class {
              padding: 43px 46px;
              box-sizing: border-box;
            }
          }
        }
        // 分类
        .classification {
          margin-top: 20px;
          // height: 535px;
          // // height: 100%;
          background-color: #fff;
          .classification_title {
            width: 320px;
            height: 56px;
            background: url("../../assets/image/img_bg.png") no-repeat;
            position: relative;
            .small_title_2 {
              position: absolute;
              left: 20px;
              bottom: 5px;

              h3 {
                display: inline-block;
                color: #fff;
                font-size: 25px;
              }
              span {
                display: inline-block;
                color: #ccc;
              }
            }
          }
          .el-checkbox {
            display: flex;
            align-items: center;
            padding: 15px 30px;
          }
          #checkbox_ {
            margin-bottom: 20px;
          }
          .el-dropdown {
            padding-left: 53px;
            display: block;
            text-align: left;
            line-height: 50px;
          }
        }
        // 价格
        .price {
          margin-top: 20px;
          height: 335px;
          background-color: #fff;
          .price_title {
            width: 320px;
            height: 56px;
            background: url("../../assets/image/img_bg.png") no-repeat;
            position: relative;
            .small_title_3 {
              position: absolute;
              left: 20px;
              bottom: 5px;
              h3 {
                display: inline-block;
                color: #fff;
                font-size: 25px;
              }
              span {
                display: inline-block;
                color: #ccc;
              }
            }
          }
          .price_list {
            padding: 43px 38px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            position: relative;

            .left_price {
              line-height: 48px;
              width: 50%;
            }
            .hot {
              position: absolute;
              top: 40px;
              right: 35px;
              img {
                width: 60px;
                height: 40px;
              }
              span {
                font-size: 9px;
                color: #fff;
                line-height: 16px;
              }
            }
          }
          .el-table__body-wrapper {
            border: none;
          }
        }
      }
      .right_text {
        margin-left: 27px;
        flex: 1;
        -webkit-box-flex: 1;
        .title_tltle {
          height: 40px;
          .box {
            .boxitem {
              width: 160px;
              .boxitemleft {
                float: left;
                position: relative;
                width: 20px;
                height: 20px;
                img {
                  width: 20px;
                  height: 20px;
                  position: absolute;
                  top: 5px;
                  left: 2px;
                }
              }

              .look {
                float: left;
                // margin-left: 25px;
                .lookleft {
                  margin-left: 3px;
                  float: left;
                  font-size: 20px;
                  color: #999999;
                }
                .lookright {
                  float: left;
                  position: relative;
                  width: 15px;
                  height: 40px;
                  margin-left: 5px;
                  .topsanjiao {
                    position: absolute;
                    top: 8px;
                    left: 3px;
                    border-bottom: 5px solid #999999;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                  }
                  .active {
                    position: absolute;
                    top: 8px;
                    left: 3px;
                    border-bottom: 5px solid #27508c;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                  }
                  .downsanjiao {
                    position: absolute;
                    top: 17px;
                    left: 3px;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid #999999;
                  }
                  .actived {
                    position: absolute;
                    top: 17px;
                    left: 3px;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid #27508c;
                  }
                }
                .itt {
                  color: #416fae;
                }
              }
            }
            .widthkuan {
              width: 180px;
            }
          }
        }
        .box_store_ {
          // height: 874px;
          // border: 1px solid red;
          height: 100%;
          
          .list_img_1 {
            display: inline-block;
            // float: left;
            height: 280px;
            width: 272px;
            margin: 5px;
            box-sizing: border-box;
            background-color: #fff;
            position: relative;
            border-radius: 6px;

            .img_box {
              width: 100%;
              img {
                border-radius: 6px 6px 0 0;
                width: 100%;
                height: 170px;
              }
            }

            // 限时优惠
            .flash_sale {
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              height: 0;
              border-top: 32px solid #ff0000;
              border-right: 32px solid transparent;
              border-bottom: 32px solid transparent;
              border-left: 32px solid #ff0000;
              border-radius: 6px 0 0 0;
              z-index: 2;
              .time_limit {
                position: relative;
                .sale {
                  width: 40px;
                  color: #fff;
                  font-size: 14px;
                  position: absolute;
                  font-weight: bold;
                  font-family: 迷你简菱心;
                  line-height: 15px;
                  top: -32px;
                  left: -28px;
                  transform: rotate(-45deg);
                }
              }
            }

            .smallbox {
              width: 100%;
              .text {
                font-size: 18px;
                text-align: left;
                padding: 5px 16px;
                box-sizing: border-box;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .price {
                .price_red {
                  position: absolute;
                  left: 16px;
                  bottom: 16px;

                  .red_icon_span {
                    color: #ff0000;
                    font-size: 18px;
                    font-weight: bold;
                  }
                  .red_icon {
                    color: #ff0000;
                    font-weight: bold;
                    font-size: 10rpx !important;
                  }
                  del {
                    color: #ccc;
                    margin-left: 10px;
                  }
                }
                .people {
                  position: absolute;
                  right: 16px;
                  bottom: 16px;
                  img {
                    width: 20px;
                    height: 10px;
                  }
                  span {
                    margin-left: 5px;
                    color: #999999;
                    font-size: 10px;
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
    .w {
      .el-pagination {
        text-align: right;
      }
    }
  }

  //  置顶按钮
  .to_top {
    width: 48px;
    height: 120px;
    position: fixed;
    right: 15px;
    bottom: 50px;
    z-index: 2;
    .top {
      width: 48px;
      height: 48px;
      background-color: #27508c;
      position: relative;
      img {
        width: 23px;
        height: 27px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    .ash {
      margin-bottom: 15px;

      .ash_ash {
        width: 48px;
        height: 48px;
        background-color: #27508c;
        position: relative;
        img {
          width: 26px;
          height: 29px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }

      // ---------------------------------------------------------
      //  智能客服对话框
      .dialogue {
        width: 500px;
        height: 400px;
        position: absolute;
        right: 50px;
        bottom: 55px;
        background-color: #fbf8fb;
        z-index: 5000;
        // border: 1px solid #ccc;
        .dialogue_top_box {
          background-color: #fff;
          height: 400px;
          .top_dialogue {
            width: 500px;
            height: 60px;
            line-height: 60px;
            background-color: #416fae;
            position: relative;
            img {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100px;
              height: 120px;
            }
            span:nth-child(2) {
              color: #fff;
              font-size: 28px;
              margin-left: 100px;
            }
            span:nth-child(3) {
              color: #fff;
              margin-left: 10px;
            }
          }
          .left_per_i {
            padding: 15px 0 0px 15px;
            box-sizing: border-box;
            .l_call_txt {
              margin: 20px 0;
              width: 100%;
              display: flex;
              .head_icon {
                img {
                  width: 66px;
                  height: 66px;
                }
              }
              .chat_per_txt {
                width: 376px;
                padding: 16px;
                box-sizing: border-box;
                background-color: #edf0fa;
                p {
                  line-height: 16px;
                  height: 161px;
                  font-size: 14px;
                  color: #2c2c2c;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 10;
                }
              }
            }
            .r_call_text {
              margin: 20px 0;
              width: 100%;
              display: flex;
              position: relative;

              .my_header_img {
                width: 66px;
                height: 66px;
                position: absolute;
                right: 10px;
                img {
                  width: 100%;
                }
              }
              .mychat_per_txt {
                padding: 10px;
                box-sizing: border-box;
                // border: 1px solid #ccc;
                background-color: #9eea6a;
                position: absolute;
                right: 80px;
                top: 0;
                max-width: 440px;
                p {
                  font-size: 14px;
                  line-height: 20px;
                }
              }
            }
          }
        }

        .updown {
          background-color: #fff;
          height: 50px;
          width: 100%;
          .reply_box {
            height: 50px;
            width: 90px;

            img {
              margin: 13px 10px;
            }
          }

          .right_per_i {
            width: 48px;
            height: 48px;
            padding-top: 6px;
            padding-right: 5px;
            box-sizing: border-box;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
  // 弹窗 回顾2019
  .register_box {
    .userwrap_box {
      position: relative;
      background: transparent;
      .quit_btn {
        position: absolute;
        top: 30px;
        right: 30px;
        z-index: 1999;
      }
      .img_report {
        width: 840px;
        height: 525px;
        border-radius: 16px;
        position: relative;
        .two_code {
          width: 110px;
          height: 110px;
          position: absolute;
          top: 276.5px;
          left: 362px;
          z-index: 6;
          img {
            width: 110px;
            height: 110px;
          }
        }
        img {
          width: 100%;
          height: 525px;
          border-radius: 16px;
        }
      }
    }
  }
}
</style>
<style>
.cell {
  padding-left: 30px !important;
}

.el-scrollbar__wrap {
  box-sizing: border-box;
  padding-bottom: 17px;
}

.list_index_box {
  width: 100%;
  padding-right: 20px;
  box-sizing: border-box;
}

.list_index {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
}

.now_right {
  justify-content: flex-end;
}

.list_index_img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  flex-shrink: 0;
}

.list_index_img img {
  display: block;
  width: 100%;
  height: 100%;
}

.now {
  margin-left: 10px;
  margin-right: 0;
}
.list_index_txt_right {
  background: rgb(65, 174, 70);
  border-radius: 12px 12px 0 12px;
  box-sizing: border-box;
  padding: 12px;
  line-height: 1.7;
  font-size: 14px;
  color: #fff;
  word-break: break-all;
}

.list_index_txt {
  /* flex: 1; */
  background: rgba(65, 111, 174, 1);
  border-radius: 12px 12px 12px 0;
  box-sizing: border-box;
  padding: 12px;
  line-height: 1.7;
  font-size: 14px;
  /* color: rgba(44, 44, 44, 1); */
  word-break: break-all;

  color: #fff;
}
</style>