<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!--  文章详情 -->
    <div class="store_box" :data="loopcartList">
      <div class="w">
        <div class="top_details_">
          <!-- 左侧图片 -->
          <div class="left_img left">
            <div class="bit_img" v-if="bigShowVideo">
              <template
                v-if="loopcartList.video && loopcartList.video_image != ''"
              >
                <video
                  :src="loopcartList.video"
                  controls
                  class="video_vid"
                  ref="vide"
                ></video>
                <img
                  :src="loopcartList.video_image"
                  class="video_img"
                  alt
                  @click="changeVideo"
                  v-show="showBigIMG"
                />
              </template>
              <template v-else>
                <div
                  class="big_img_img"
                  v-for="(item, index) in bigIMG"
                  :key="index"
                >
                  <img v-if="index == 0" :src="item" alt />
                </div>
              </template>
            </div>
            <!-- 缩略大图 -->
            <div class="big_img_img" v-else @click="clickShowBigIMG">
              <img :src="bigImgsItem" alt />
            </div>
            <div
              class="loop_item"
              @mouseenter.stop="smallMouseover"
              @mouseleave.stop="smallRemoveActive"
            >
              <swiper :options="smallSwiperOption">
                <swiper-slide
                  class="swiper_loop"
                  v-for="(item, index) in loopcartList.images"
                  :key="index"
                >
                  <div class="img__loop">
                    <img :src="item" @click="itemTo(item)" alt />
                  </div>
                </swiper-slide>
              </swiper>
              <div class="swiper_button_prev" v-show="smallShow">
                <img
                  src="../../assets/image/arrowLeft.png"
                  class="left-btn sm-btn"
                />
              </div>
              <div class="swiper_button_next" v-show="smallShow">
                <img
                  src="../../assets/image/arrowRight.png"
                  class="right-btn sm-btn"
                />
              </div>
            </div>
          </div>
          <!-- 右侧内容信息 -->
          <div class="right_txt left">
            <div class="store_name clearfix">
              <div class="store_name_t left">
                <p>{{ loopcartList.name }}</p>
              </div>
              <div class="person_num left">
                <p>{{ loopcartList.view_num }}</p>
                <p>浏览量</p>
              </div>
            </div>
            <!-- 中间 -->
            <div class="store_data">
              <div class="data_price">
                <label for="价格" class="price">价格</label>
                <div class="item_price">
                  <div class="red_pri">
                    <span class="span1" v-if="loopcartList.price != '免费'"
                      >￥</span
                    >
                    <span class="span2">{{
                      loopcartList.reduced_price == 0
                        ? loopcartList.price
                        : loopcartList.reduced_price
                    }}</span>
                  </div>
                  <div class="del_pri" v-if="loopcartList.reduced_price != 0">
                    <span class="span3">￥</span>
                    <span class="span3">{{ loopcartList.price }}</span>
                  </div>
                </div>
              </div>
              <div class="data_grade">
                <label for="年级" class="grade">年级</label>
                <div class="s">
                  <p
                    class="r_grade"
                    v-for="(item1, index1) in grade_name"
                    :key="index1"
                    @click.stop="clickgradeName(index1)"
                  >
                    {{ item1 }}
                  </p>
                </div>
              </div>
              <div class="data_sort">
                <label for="类别" class="sort">类别</label>
                <div class="cls">
                  <p
                    class="p_sort"
                    v-for="(item0, index0) in category"
                    :key="index0"
                    @click.stop="clickcategory(index0)"
                  >
                    {{ item0 }}
                  </p>
                </div>
              </div>
              <div class="data_size">
                <label for="文件大小" class="size">文件大小</label>
                <p>{{ loopcartList.size }}</p>
              </div>
            </div>
            <!-- 下部分 -->
            <div class="store_btn">
              <div class="btn" v-if="status == 1">
                <div class="bosx" v-if="loopcartList.is_order == 0">
                  <el-button class="btn_1 bbt" @click="toGOPlay(loopcartList)"
                    >立即购买</el-button
                  >
                  <el-button class="bbt1 btn_1" @click="addCart(loopcartList)"
                    >加入购物车</el-button
                  >
                </div>
                <div class="btn_" v-else>
                  <el-button
                    class="btn_1"
                    v-model="centerDialogVisible"
                    @click="download"
                    >立即下载</el-button
                  >
                  <el-button class="bbt1 btn_1" @click="exchange(loopcartList)"
                    >更换新LOGO</el-button
                  >
                </div>
              </div>
              <div class="btn" v-if="status == 3">
                <div class="bosx" v-if="loopcartList.is_order == 0">
                  <el-button class="btn_1 bbt" @click="toGOPlay(loopcartList)"
                    >立即购买</el-button
                  >
                  <el-button class="bbt1 btn_1" @click="addCart(loopcartList)"
                    >加入购物车</el-button
                  >
                </div>
                <div class="btn_" v-else>
                  <el-button
                    class="btn_1"
                    v-model="centerDialogVisible"
                    @click="download"
                    >立即下载</el-button
                  >
                  <el-button class="bbt1 btn_1" @click="exchange(loopcartList)"
                    >更换新LOGO</el-button
                  >
                </div>
              </div>
              <div class="btn_ btnm" v-if="status == 2">
                <el-button
                  class="btn_1"
                  v-model="centerDialogVisible"
                  @click="download"
                  >立即下载</el-button
                >
              </div>
              <div class="store_change">
                <div class="change_1" @click="toggleStatus">
                  <div v-show="is_collect == 1" class="collect__">
                    <div class="change_img">
                      <img src="../../assets/order/icon_38@2x.png" alt />
                    </div>
                    <span>已收藏</span>
                  </div>
                  <div v-show="is_collect == 0" class="collect__">
                    <div class="change_img">
                      <img src="../../assets/order/icon_36@2x (2).png" alt />
                    </div>
                    <span style="color: #ccc">未收藏</span>
                  </div>
                </div>
                <div
                  class="change__share"
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                >
                  <div
                    slot="reference"
                    class="share_box"
                    :class="share == true ? 'acive' : ''"
                  >
                    <div class="ser" @click="shareclick">
                      <div class="change_img_">
                        <img
                          src="../../assets/image/share3.png"
                          v-if="share == true"
                          alt
                        />
                        <img src="../../assets/image/share.png" v-else alt />
                      </div>
                      <span class="share_name">分享</span>
                    </div>
                    <div class="sharing" v-if="sharebox">
                      <div class="imgbox">
                        <div class="img1">
                          <div class="im4">
                            <img
                              src="../../assets/image/aicon_3.png"
                              alt
                              @click="wechatChange"
                              slot="reference"
                            />
                          </div>
                          <div class="wechant" v-if="visible">
                            <!-- <p class="messages">{{message}}</p> -->
                            <!-- <div style="text-align: right; margin: 0 ;" class="items">
                              <el-button
                                type="primary"
                                v-clipboard:copy="message"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                size="mini"
                              >复制链接</el-button>
                            </div>-->
                            <my-star :myurl="message"></my-star>
                          </div>
                        </div>
                        <div class="img2">
                          <img
                            src="../../assets/image/aicon_2.png"
                            alt
                            @click="sharefacebook"
                          />
                        </div>
                        <div class="img3">
                          <img
                            src="../../assets/image/aicon_1.png"
                            alt
                            @click="shareWeibo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--此商品包含以下商品  轮播图 -->
        <div class="row_loop" v-if="type == 2">
          <div class="loop_title">
            <a href="#">此商品包含以下子商品</a>
          </div>
          <!-- 此商品包含以下商品 -->
          <div
            class="loops"
            @mouseenter.stop="mouseover"
            @mouseleave.stop="removeActive"
          >
            <swiper :options="swiperOption">
              <swiper-slide
                class="swiper_item"
                v-for="(item, index) in groomList"
                :key="index"
              >
                <div class="list_loops" @click="ToDetails(item)">
                  <div class="img__">
                    <img :src="item.image" alt />
                  </div>
                  <div class="flash_sale" v-if="item.reduced_price != 0">
                    <div class="time_limit">
                      <div class="sale">
                        <span>限时特惠</span>
                      </div>
                    </div>
                  </div>
                  <div class="text two_text">{{ item.name }}</div>
                  <div class="price">
                    <div class="price_red">
                      <span v-if="item.price > 0" class="icon">￥</span>
                      <span class="span">{{
                        item.reduced_price == 0
                          ? item.price
                          : item.reduced_price
                      }}</span>
                      <del v-if="item.reduced_price > 0"
                        >￥{{ item.price }}</del
                      >
                    </div>
                    <div class="people">
                      <div class="ids">
                        <img src="../../assets/image/eye.png" alt />
                        <span>{{ item.view_num }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div class="prev btn_1 btn_prev" v-show="up">
              <img
                src="../../assets/image/index_tab_l.png"
                class="left-btn sm-btn"
              />
            </div>
            <div class="next btn_1 btn_next" v-show="up">
              <img
                src="../../assets/image/index_tab_r.png"
                class="right-btn sm-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  相关推荐 -->
    <div class="content">
      <div class="w clearfix">
        <div class="left_content left" :data="recommended">
          <div class="title">
            <div class="title_img">
              <p>相关推荐</p>
            </div>
            <div class="fresh" @click="freshed">
              <img src="../../assets/image/fresh.png" alt />
              <span>换一组</span>
            </div>
          </div>
          <div class="shop_list">
            <div
              class="list_img_1"
              v-for="(items, index) in recommended"
              :key="index"
              @click="toIntroduce(items)"
            >
              <div class="img__img">
                <img :src="items.image" alt />
              </div>
              <!-- 限时抢购 -->
              <div class="flash_sale" v-if="items.reduced_price != 0">
                <div class="time_limit">
                  <div class="sale">
                    <span>限时特惠</span>
                  </div>
                </div>
              </div>
              <div class="text two_text">{{ items.name }}</div>
              <div class="price">
                <div class="price_red">
                  <span v-if="items.price != '免费'" class="icon">￥</span>
                  <span class="span">{{
                    items.reduced_price == 0 ? items.price : items.reduced_price
                  }}</span>
                  <del v-if="items.reduced_price > 0">￥{{ items.price }}</del>
                </div>
                <div class="people">
                  <div class="ids">
                    <img src="../../assets/image/eye.png" alt />
                    <span>{{ items.view_num }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧大图展示 -->
        <div
          class="right_content left"
          @contextmenu.prevent="selectBtn"
          @onselectstart.prevent="selectBtn"
        >
          <el-tabs type="border-card" class="fu_box" v-model="activeTab">
            <el-tab-pane label="内容介绍" name="content">
              <div v-html="loopcartList.content" class="listContent"></div>
            </el-tab-pane>
            <el-tab-pane label="累计评价" name="appraise">
              <div class="block" v-if="loopcartList.score != 0">
                <el-rate
                  :value="loopcartList.score != 0 ? loopcartList.score : 0"
                  disabled
                  class="star"
                ></el-rate>
                <p class="disabled">好评率</p>
                <p class="disableds">{{ loopcartList.good_rate }}</p>
              </div>
              <div class="good_rate" v-if="loopcartList.score == 0">
                {{ loopcartList.good_rate }}
              </div>
              <!--  评价列表 -->
              <div
                class="appraise_one"
                v-for="(item, index) in moreComment"
                :key="index"
              >
                <div class="appraise">
                  <div class="head clearfix left">
                    <div class="head_img">
                      <img :src="item.avatar" alt />
                    </div>
                    <div class="head_name">
                      <p class="hi">{{ item.nickname }}</p>
                      <p class="ps">{{ item.createtime }}</p>
                    </div>
                  </div>
                  <div class="five_star right">
                    <el-rate
                      :value="item.score"
                      disabled
                      class="e_rate"
                    ></el-rate>
                  </div>
                </div>
                <div class="articles">
                  <p class="arr_content">{{ item.content }}</p>
                </div>
              </div>
              <!--  查看更多评论 -->
              <div
                class="more_review"
                @click="lookmoreComment"
                v-if="loopcartList.evaluate_num > 20"
              >
                <p>查看更多评论 >></p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 弹窗部分 -->
    <div class="pophp">
      <el-dialog
        title="下载"
        :visible.sync="centerDialogVisible"
        width="584px"
        center
        show-close
        class="dialog_box"
        :data="download"
      >
        <div class="dialog_box_">
          <div class="pop">
            <img :src="downloadFile.image" alt />
          </div>
          <div class="pop_title">
            <div class="my_title">
              <div class="title_left">
                <img src="../../assets/image/data81.png" alt />
                <span>资料说明</span>
              </div>
              <div class="title_right">
                <span>(共{{ downloadFile.size }})</span>
              </div>
            </div>

            <div class="pop_list">
              <div
                class="list_1"
                v-for="(item, index) in downloaded"
                :key="index"
              >
                <div class="imgs">
                  <img :src="item.logo" alt />
                </div>
                <p>{{ item.filename }}</p>
              </div>
            </div>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="loadfile" class="download">下载</el-button>
            <el-button @click="centerDialogVisible = false" class="download_1"
              >取消</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import wxapi from "@/filter/index";
import local from "@/utils/local";
import { mapActions } from "vuex";
export default {
  inject: ["reload"],
  name: "loopcart",


  data() {
    return {
      wechat: false,
      grade_name: [],
      category: [],
      type: '',
      goods_id: "",
      page: 0,
      message: '',
      visible: false,
      bigShowVideo: true,
      showBigIMG: true,
      bigImgsItem: '',
      bigIMG: [],
      videoImg: true,
      status: "", //  状态:1=付费,2=免费
      activeTab: "content",
      value: "",
      loopcartList: "",
      sharebox: false,
      evaluate_list: [],
      groomList: [], //此商品包含以下商品
      recommended: [], //  相关推荐
      moreComment: [],
      is_collect: 0, // 0=未收藏  1 收藏
      downloaded: [], // 获取下载文件详情
      downloadFile: "", // 获取下载文件详情页
      limit: 3,
      num: 1,
      up: false, //  轮播图显示/隐藏
      smallShow: false,
      centerDialogVisible: false,
      emtpyCart: [],   // 添加购物车的id
      share: false,
      smallSwiperOption: {
        slidesPerView: 5,
        spaceBetween: 5,
        freeMode: true, // 不止滑动一格
        navigation: {
          nextEl: ".swiper_button_next",
          prevEl: ".swiper_button_prev"
        },
      },
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true, // 不止滑动一格
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        },
      },
      is_number: '',
      admin_id: '',
    };
  },
  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
    let token = localStorage.getItem("koudaishangcheng-key");
    const routeParams = this.$route.query;
    this.goods_id = routeParams.goods_id
    this.type = routeParams.type
    this.getLoopCartList();
    this.getRecommended();
    if (token) {
      this.getlimes()
    }

  },

  methods: {
    ...mapActions(['addStoreCount']),
    exchange(item) {
      let that = this
      let status = item.status
      let goods_id = item.id
      let is_number = this.is_number
      console.log(is_number)
      if (is_number) {
        console.log(is_number);
        that.$confirm('新LOGO会覆盖旧LOGO，请在更换前及时下载并保存好旧LOGO的教案。若后续教案内容有更新，仅支持重新免费下载最新LOGO版的教案。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$router.push({
            path: "/confirm",
            query: {
              routeParams: JSON.stringify({
                goods_id: goods_id,
                num: that.num,
                status: status,
                logo: 2
              })
            }
          });

        }).catch(() => {
        });
      } else {
        this.$message.warning('您已达到更换LOGO次数上限')
      }
    },
    async getLoopCartList() {      // 获取页面数据
      try {
        const {
          data: { data }
        } = await this.$http.post("api/goods/goodsInfo", {
          goods_id: this.goods_id
        });
        console.log(data);
        this.loopcartList = data;
        this.evaluate_list = data.evaluate_list; //  获取-----评价
        this.groomList = data.goods; //  获取-----此商品包含以下商品数据
        this.status = data.status;
        this.bigIMG = data.images
        this.category = data.category_name.split(',')
        this.grade_name = data.grade_name.split(',')
        this.lookmoreComment(); //  调用更多评价
        this.richesHandle(data.content)
      } catch (err) {
        console.log(err);
        this.$router.push('/404')
      }
    },
    async getlimes() {// 获取更换次数
      try {
        const {
          data: { data }
        } = await this.$http.post("api/order_logo/checkChangeLogo", {
          goods_id: this.goods_id
        });
        console.log(data, "获取更换次数");
        this.is_number = data
      } catch (err) {
        console.log(err);
      }
    },
    clickgradeName(send) {
      let keyword = ''
      let gradeName = this.grade_name
      gradeName.forEach((item, index) => {
        if (index == send) {
          keyword = item
        }
      })
      // console.log(keyword);
      this.$router.push({ path: '/articles', query: { keyword: keyword } })
    },
    clickcategory(send) {
      let keyword = ''
      let category = this.category
      category.forEach((item, index) => {
        if (index == send) {
          keyword = item
        }
      })
      this.$router.push({ path: '/articles', query: { keyword: keyword } })
    },
    ToDetails(items) {
      this.$router.replace({ path: "/loopcart", query: { goods_id: items.id, type: items.type } });
      location.reload()
    },
    wxRegCallback() {
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },
    wxShareTimeline() {
      let option = {
        title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
        link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareTimeline(option)
    },
    wxShareAppMessage() {
      // 微信自定义分享给朋友
      let option = {
        title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
        desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
        link: window.location.href.split('#')[0], // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },
    itemTo(item) {
      this.bigShowVideo = false
      this.bigIMG.forEach((value, index) => {
        if (value == item) {
          this.bigImgsItem = item
          this.showBigIMG = true
          this.videoImg = true
        }
      })


    },
    changeVideo() {
      let list = this.loopcartList
      this.showBigIMG = !this.showBigIMG
      this.bigShowVideo = true
      if (list.video_image != '' || list.video != '') {
        let vide = this.$refs.vide
        if (vide.paused) {
          vide.play();
        } else if (vide.play()) {
          vide.pause();
        }
      }
    },
    clickShowBigIMG() {
      this.showBigIMG = !this.showBigIMG
      this.bigShowVideo = true
    },
    async getRecommended() {  // 获取-----相关推荐
      try {
        const {
          data: { data }
        } = await this.$http.post("api/goods/randGoods", { limit: this.limit });
        this.recommended = data;
      } catch (err) {
        this.$message.error("获取相关推荐失败");
      }
    },
    freshed() { // 换一组
      this.reload();
      this.recommended = "";
      this.getRecommended();
    },
    async toggleStatus() {  // 添加收藏  当前状态为未收藏
      let that = this
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        if (that.is_collect == 1) {
          const {
            data: { data }
          } = await that.$http.post("api/sundry/addGoodsCollect", {
            goods_id: that.goods_id
          });
          that.$message.success("取消收藏成功");
          that.is_collect = 0;
          // console.log("点击取消", this.is_collect);
        } else {
          const {
            data: { data }
          } = await that.$http.post("api/sundry/addGoodsCollect", {
            goods_id: that.goods_id
          });
          that.$message.success("添加收藏成功");
          that.is_collect = 1;
          // console.log("点击状态", this.is_collect);
        }
      } else {
        that.$confirm('您尚未登录 ，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$router.push('/login')
        }).catch(() => {

        });
      }

    },
    richesHandle(data) {   // 富文本处理
      let fn_result = data
      fn_result = fn_result.replace(/()/g, "");
      fn_result = fn_result.replace(/(&nbsp;)/g, "");
      fn_result = fn_result.replace("<html><head><title></title></head><body>", "");
      fn_result = fn_result.replace("</body></html>", "")
      return fn_result;
    },
    toGOPlay(item) {  // 立刻购买
      let obj = window.location.href
      console.log(obj);
      if (obj.indexOf('&') != -1) {
        let art = obj.substring(obj.lastIndexOf('=') + 1);
        this.admin_id = art
      }
      let that = this
      let status = item.status
      let goods_id = item.id
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        that.$router.push({
          path: "/confirm",
          query: {
            routeParams: JSON.stringify({
              goods_id: goods_id,
              num: that.num,
              status: status,
              admin_id: that.admin_id  // 用于分销
            })
          }
        });

      } else {
        that.$confirm('您尚未登录 ，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // that.$router.push('/login')
          this.$router.push({ path: '/login', query: { toLogin: '1' } })
        }).catch(() => {

        });
      }
    },
    async addCart(item) {     // 添加购物车
      let shopCart = JSON.parse(localStorage.getItem('shopCart'))
      let shopCartID = JSON.parse(localStorage.getItem('shopCartID'))
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        try {
          const { data } =
            await this.$http.post("api/sundry/addCar", {
              goods_id: item.id
            })
          this.$message.success(data.msg);
          // this.getcount()     // 全局函数
        } catch (err) {
          this.$message.error("该商品已添加购物车");
        }
      } else {
        if (shopCartID) {
          if (shopCartID.indexOf(item.id) == -1) {
            shopCart.push(item)
            shopCartID.push(item.id)
            this.$message.success("已放入购物车");
          } else {
            this.$message.error("该商品已添加购物车");
          }
          console.log(shopCart);
          localStorage.setItem('shopCart', JSON.stringify(shopCart))
          localStorage.setItem('shopCartID', JSON.stringify(shopCartID))
          // this.getcount()     // 全局函数
        } else {
          let obj = []
          let ary = []
          obj.push(item)
          ary.push(item.id)
          localStorage.setItem("shopCart", JSON.stringify(obj))
          localStorage.setItem("shopCartID", JSON.stringify(ary))
          this.$message.success("已放入购物车");
          // this.getcount()     // 全局函数
        }
      }

    },
    async download() {     // 立即下载
      this.centerDialogVisible = !this.centerDialogVisible;
      try {
        const {
          data: { data }
        } = await this.$http.post("api/goods/getGoodsFile", {
          goods_id: this.goods_id
        });
        this.downloaded = data.list;
        this.downloadFile = data;
        console.log("下载文件详情", data);
      } catch (err) {
        console.log(err);
      }

    },
    async loadfile() {
      await this.$http
        .post("api/goods/downloadGoodsFile", { goods_id: this.goods_id })
        .then(res => {
          console.log(res);
          this.centerDialogVisible = !this.centerDialogVisible;
          let url = res.data.data;
          window.location.href = "https://glaforteachers.com" + url;
          this.$message.success("下载成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.success("下载失败");
        });
    },
    toIntroduce(item) {    // 相关推荐 跳转详情
      // console.log(item);
      this.$router.replace({ path: "/loopcart", query: { goods_id: item.id, type: item.type } });
      location.reload()
    },
    mouseover() {
      this.up = true;
    },
    removeActive() {
      this.up = false;
    },
    async lookmoreComment() { // 查看更多评论
      this.page++
      const {
        data: { data }
      } = await this.$http.post("api/evaluate/evaluateList", {
        goods_id: this.goods_id,
        page: this.page
      });
      this.moreComment = data;
    },
    wechatChange() {
      this.visible = !this.visible
      this.message = 'https://m.glaforteachers.com/detailsList?goods_id=' + this.goods_id

    },
    onCopy(e) {
      console.log(e);
      this.$message({
        message: `复制成功！`,
        type: 'success'
      });
      this.visible = !this.visible
      this.sharebox = !this.sharebox
    },
    onError(e) {
      console.log(e);
      this.$message.error('复制失败！')
    },

    shareclick() {
      this.sharebox = !this.sharebox
      this.share = true
    },
    mouseLeave() {
      this.share = !this.share
    },
    mouseOver() {
      this.share = !this.share
    },
    shareWeibo() {   // 分享到微博
      window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=口袋商品&pic=图片&appkey=微博平台申请的key');
    },
    sharefacebook() {
      window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(document.location.href) + '&t=' + encodeURIComponent(document.title), '_blank', 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350'); void (0)
    },

    smallMouseover() {
      this.smallShow = true;
    },
    smallRemoveActive() {
      this.smallShow = false;
    },
    async getcount() {
      let obj = JSON.parse(localStorage.getItem('shopCart'))
      console.log(obj);
      const {
        data: {
          data
        }
      } = await this.$http.post("api/user/car");
      let totalCount = data.total
      console.log(totalCount);
      this.addStoreCount(totalCount)

    },
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  .store_box {
    margin: 30px 0;
    .w {
      width: 1200px;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 5px 5px 5px #f9f9f9;
      .top_details_ {
        padding: 32px 24px 32px;
        box-sizing: border-box;
        height: 340px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        // 左侧图片
        .left_img {
          width: 408px;
          .bit_img {
            width: 408px;
            height: 245px;
            border-radius: 8px;
            position: relative;
            .video_vid {
              width: 408px;
              border-radius: 8px;
              height: 100%;
            }
            .video_img {
              position: absolute;
              top: 0;
              left: 0;
              width: 408px;
              height: 100%;
              border-radius: 8px;
            }
          }
          .big_img_img {
            width: 408px;
            height: 245px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
          }

          .loop_item {
            margin-top: 10px;
            height: 60px;
            width: 408px;
            position: relative;
            .swiper_loop {
              height: 60px;
              display: flex;
              align-items: center;
              .img__loop {
                height: 46px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 8px;
                }
              }
            }
            .swiper_button_prev {
              position: absolute;
              top: 20px;
              left: 10px;
              z-index: 2;
              img {
                width: 14px;
                height: 20px;
              }
            }
            .swiper_button_next {
              position: absolute;
              top: 20px;
              right: 10px;
              z-index: 2;
              img {
                width: 14px;
                height: 20px;
              }
            }
          }
        }
        //  右侧内容信息
        .right_txt {
          // float: left;
          flex: 1;
          .store_name {
            margin-bottom: 5px;
            .store_name_t {
              width: 610px;
              height: 48px;
              padding-left: 20px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              p {
                font-size: 20px;
                color: #2c2c2c;
                font-weight: bold;
              }
            }
            .person_num {
              width: 110px;
              p {
                text-align: center;
              }
              p:nth-child(1) {
                font-size: 22px;
                font-weight: 500;
                color: #416fae;
                height: 27px;
              }
              p:nth-child(2) {
                font-size: 12px;
                color: #999999;
                height: 17px;
              }
            }
          }
          // 中
          .store_data {
            .data_price {
              height: 40px;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              .price {
                display: block;
                width: 100px;
                height: 40px;
                line-height: 40px;
                padding-left: 20px;
                box-sizing: border-box;
                font-size: 16px;
                color: #999999;
              }
              .item_price {
                flex: 1;
                display: flex;
                align-items: center;
                .red_pri {
                  display: flex;
                  align-items: baseline;
                  .span1 {
                    color: #ff0000;
                    font-size: 14px;
                    font-weight: 500;
                  }
                  .span2 {
                    color: #ff0000;
                    font-size: 24px;
                    font-weight: 500;
                  }
                }

                .del_pri {
                  margin-left: 20px;
                  display: flex;
                  align-items: baseline;
                  .span3 {
                    font-size: 14px;
                    color: #ccc;
                    text-decoration: line-through; // 删除线
                  }
                }
              }
            }
            .data_grade {
              height: 40px;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              .grade {
                display: block;
                width: 100px;
                height: 40px;
                line-height: 40px;
                padding-left: 20px;
                box-sizing: border-box;
                font-size: 16px;
                color: #999999;
              }
              .s {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                height: 40px;
                align-items: center;
                .r_grade {
                  font-size: 16px;
                  color: #2c2c2c;
                  margin-right: 5px;
                }
              }
            }
            .data_sort {
              height: 42px;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              .sort {
                display: block;
                width: 100px;
                height: 42px;
                line-height: 40px;
                padding-left: 20px;
                box-sizing: border-box;
                font-size: 16px;
                color: #999999;
              }
              .cls {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                height: 42px;
                align-items: center;
                overflow: hidden;

                .p_sort {
                  font-size: 16px;
                  color: #2c2c2c;
                  margin-right: 5px;
                }
              }
            }
            .data_size {
              height: 40px;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              .size {
                display: block;
                width: 100px;
                height: 40px;
                line-height: 40px;
                padding-left: 20px;
                box-sizing: border-box;
                font-size: 16px;
                color: #999999;
              }
              p {
                font-size: 16px;
                color: #2c2c2c;
              }
            }
          }
          // 下
          .store_btn {
            height: 86px;
            position: relative;
            .btn {
              float: left;
              margin: 20px 10px 20px 90px;
              .btn_1 {
                width: 168px;
                height: 46px;
                text-align: center;
                font-size: 19px;
                color: #416fae;
                background-color: #fff;
                border: 2px solid #416fae;
                border-radius: 10px;
                margin: 0 5px;
              }

              .btn_1:nth-child(1) {
                color: #fff;
                background-color: #416fae;
              }
            }
            .btn_ {
              float: left;
              // margin: 10px 10px 20px 90px;
              .btn_1 {
                width: 168px;
                height: 46px;
                text-align: center;
                font-size: 19px;
                color: #fff;
                background-color: #416fae;
                border: 2px solid #416fae;
                border-radius: 10px;
                margin: 0 5px;
              }
            }
            .btnm {
              margin: 10px 90px;
            }

            .store_change {
              position: absolute;
              right: 20px;
              bottom: 30px;
              width: 200px;
              height: 44px;
              display: flex;
              align-items: center;
              // margin-left: 80px;
              .change_1 {
                display: flex;
                height: 26px;
                line-height: 26px;
                .collect__ {
                  width: 90px;
                  .change_img {
                    float: left;
                    width: 26px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    img {
                      width: 26px;
                      height: 26px;
                    }
                  }
                  span {
                    float: left;
                    margin-left: 10px;
                    color: #416fae;
                    font-size: 14px;
                  }
                }
              }

              .change__share {
                display: flex;
                height: 26px;
                line-height: 26px;
                padding-left: 20px;
                .share_box {
                  position: relative;
                  .ser {
                    .change_img_ {
                      float: left;
                      width: 22px;
                      height: 22px;
                      line-height: 22px;
                      text-align: center;
                      position: relative;
                      img {
                        position: absolute;
                        top: 6px;
                        left: 6px;
                        width: 12px;
                        height: 10px;
                      }
                    }
                    span {
                      float: left;
                      margin-left: 10px;
                      color: #ccc;
                      font-size: 14px;
                    }
                  }
                  .sharing {
                    position: absolute;
                    top: -75px;
                    left: -55px;
                    width: 188px;
                    padding: 10px 10px;
                    box-sizing: border-box;
                    background-color: #ccc;
                    height: 70px;
                    border-radius: 8px;
                    .imgbox {
                      display: flex;
                      align-items: center;
                      .img1 {
                        margin: 0 4px;
                        position: relative;
                        .im4 {
                          width: 48px;
                          height: 48px;
                          img {
                            width: 100%;
                          }
                        }
                        .wechant {
                          position: absolute;
                          top: -30px;
                          right: 60px;
                          z-index: 6;
                          width: 120px;
                          height: 120px;
                          background-color: #f9f9f9;
                          border-radius: 8px;
                          padding: 10px;
                          box-sizing: border-box;

                          .messages {
                            font-size: 14px;
                            color: #2c2c2c;
                          }
                          .items {
                            position: absolute;
                            right: 10px;
                            bottom: 10px;
                          }
                        }
                      }
                      .img2 {
                        margin: 0 4px;
                        width: 48px;
                        height: 48px;
                        img {
                          width: 100%;
                        }
                      }
                      .img3 {
                        margin: 0 4px;
                        width: 48px;
                        height: 48px;
                        img {
                          width: 100%;
                        }
                      }
                    }
                  }
                }
                .acive {
                  .ser {
                    .change_img_ {
                      border: 2px solid #416fae;
                      border-radius: 50%;
                    }
                    .share_name {
                      color: #416fae;
                    }
                  }
                }
              }
            }
          }
        }
      }
      //    横向轮播图
      .row_loop {
        width: 1200px;
        padding: 0px 20px 20px;
        box-sizing: border-box;
        .loop_title {
          margin-left: 20px;
          height: 50px;
          line-height: 50px;
          a {
            color: #416fae;
            font-size: 18px;
            font-weight: 600;
          }
        }
        .loops {
          height: 272px;
          width: 100%;
          position: relative;

          .swiper_item {
            width: 100%;
            height: 272px;
            .list_loops {
              height: 272px;
              box-sizing: border-box;
              background-color: #fff;
              border-radius: 6px;
              .img__ {
                width: 100%;
                img {
                  border-radius: 6px 6px 0 0;
                  width: 100%;
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
                .time_limit {
                  position: relative;
                  .sale {
                    width: 40px;

                    color: #fff;
                    font-size: 14px;
                    position: absolute;
                    font-family: 迷你简菱心;
                    line-height: 15px;
                    top: -32px;
                    left: -28px;
                    transform: rotate(-45deg);
                  }
                }
              }
              .text {
                font-size: 18px;
                line-height: 26px;
                text-align: left;
                padding: 5px 16px;
                box-sizing: border-box;
                height: 62px;
              }
              .price {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 26px;
                padding: 5px 16px;
                box-sizing: border-box;
                .price_red {
                  .icon {
                    font-size: 12px;
                    color: #ff0000;
                    font-weight: bold;
                  }
                  .span {
                    color: #ff0000;
                    font-size: 18px;
                    font-weight: bold;
                  }

                  del {
                    color: #ccc;
                    margin-left: 10px;
                  }
                }
                .people {
                  .ids {
                    display: flex;
                    align-items: center;
                    img {
                      width: 20px;
                      height: 10px;
                    }
                    span {
                      color: #999999;
                      font-size: 14px;
                      margin-left: 5px;
                    }
                  }
                }
              }
            }
          }
          .btn_prev {
            position: absolute;
            top: 80px;
            left: 10px;
            z-index: 2;
          }
          .btn_next {
            position: absolute;
            right: 10px;
            top: 80px;
            z-index: 2;
          }
        }
      }
    }
  }

  // 相关推荐
  .content {
    margin-top: 30px;
    .w {
      // 左侧相关推荐
      .left_content {
        width: 290px;
        .title {
          width: 272px;
          p {
            margin-left: 10px;
            box-sizing: border-box;
            font-size: 20px;
            font-weight: 600;
            line-height: 40px;
          }
        }
        // 图文展示
        .shop_list {
          width: 272px;
          .list_img_1 {
            height: 280px;
            width: 272px;
            margin: 8px 0px;
            box-sizing: border-box;
            background-color: #fff;
            position: relative;
            border-radius: 6px;
            .img__img {
              width: 272px;
              height: 170px;
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
              .time_limit {
                position: relative;
                .sale {
                  width: 40px;
                  color: #fff;
                  font-size: 14px;
                  position: absolute;
                  font-family: 迷你简菱心;
                  line-height: 15px;
                  top: -32px;
                  left: -28px;
                  transform: rotate(-45deg);
                }
              }
            }
            .text {
              font-size: 18px;
              line-height: 26px;
              text-align: left;
              padding: 5px 16px;
              box-sizing: border-box;
              height: 62px;
            }
            .price {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 26px;
              padding: 5px 16px;
              box-sizing: border-box;
              .price_red {
                .icon {
                  font-size: 12px;
                  color: #ff0000;
                  font-weight: bold;
                }
                .span {
                  color: #ff0000;
                  font-size: 18px;
                  font-weight: bold;
                }

                del {
                  color: #ccc;
                  margin-left: 10px;
                }
              }
              .people {
                .ids {
                  display: flex;
                  align-items: center;
                  img {
                    width: 20px;
                    height: 10px;
                  }
                  span {
                    color: #999999;
                    font-size: 14px;
                    margin-left: 5px;
                  }
                }
              }
            }
          }
        }

        .title {
          width: 272px;
          height: 40px;
          padding: 5px 0;

          .title_img {
            float: left;
            p {
              font-size: 24px;
              line-height: 40px;
            }
          }
          .fresh {
            float: right;
            position: relative;
            img {
              position: absolute;
              top: 12px;
              left: -24px;
            }
            span {
              color: #416fae;
              font-weight: 600;
              font-size: 14px;
              line-height: 40px;
            }
          }
        }
      }
      // 右侧大图展示
      .right_content {
        width: 900px;
        margin-left: 9px;

        .fu_box {
          width: 100%;
          .block {
            line-height: 30px;
            padding: 0 0 15px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #f5f5f5;
            .el-rate {
              height: 30px;
              display: flex;
              align-items: center;
            }
            .disabled {
              font-size: 14px;
              color: #999999;
            }
            .disableds {
              color: #ff0000;
              font-size: 14px;
              margin-left: 10px;
            }
          }
          .good_rate {
            color: #ff0000;
            font-size: 14px;
          }
          .appraise_one {
            border-bottom: 1px solid #f5f5f5;
            padding: 5px 0 5px;
            box-sizing: border-box;
            margin: 10px 0;
            .appraise {
              height: 64px;
              .head {
                .head_img {
                  float: left;
                  width: 64px;
                  height: 64px;
                  border-radius: 50%;
                  img {
                    width: 100%;
                    height: 64px;
                    border-radius: 50%;
                  }
                }
                .head_name {
                  float: left;
                  padding: 10px 20px;
                  box-sizing: border-box;
                  .hi {
                    color: #000;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 24px;
                  }
                  .ps {
                    color: #999999;
                    font-size: 14px;
                    line-height: 20px;
                  }
                }
              }
              .five_star {
                width: 270px;
                height: 64px;
                .e_rate {
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  height: 100%;
                }
              }
            }
            .articles {
              padding: 5px 5px;
              box-sizing: border-box;
              .arr_content {
                color: #666666;
                font-size: 16px;
                line-height: 32px;
              }
            }
          }
          // 查看更多评论
          .more_review {
            height: 60px;
            p {
              height: 60px;
              line-height: 60px;
              text-align: center;
              color: #5393eb;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  // -------------------------------------------------------------------------------
  // 弹窗部分
  .pophp {
    .dialog_box_ {
      height: 100%;
      padding-bottom: 20px;
      box-sizing: border-box;
      .pop {
        width: 100%;
        height: 300px;
        img {
          width: 100%;
          height: 300px;
        }
      }
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
  }
}
</style>
<style>
.el-popper[x-placement^="bottom"] {
  margin-top: 32px !important;
}
.listContent >>> img {
  display: block;
  margin: 0 auto;
  max-width: 100% !important;
  height: auto !important;
}
.listContent >>> p {
  max-width: 100%;
  word-break: break-all;
  font-size: 16px !important;
}
.listContent >>> span {
  max-width: 100%;
  word-break: break-all;
  font-size: 16px !important;
}
.listContent >>> table {
  max-width: 100%;
}
</style>