<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header :num="storeNumber"></my-header>
    <div :data="introduces">
      <!-- 商品详情区域 -->
      <div class="store_box">
        <div class="w">
          <div class="top_introduce">
            <!-- 左侧图片 -->
            <div class="left_img left">
              <div class="big_img" v-show="bigShowVideo">
                <template
                  v-if="introduces.video && introduces.video_image != ''"
                >
                  <video
                    :src="introduces.video"
                    controls
                    class="video_vid"
                    ref="vide"
                  ></video>
                  <img
                    :src="introduces.video_image"
                    class="video_img"
                    alt
                    @click="playVideo"
                    v-show="videoImg"
                  />
                </template>
                <template v-else>
                  <div
                    class="big_img_img"
                    v-for="(item, index) in bigIMG"
                    :key="index"
                  >
                    <img v-if="index === 0" :src="item" alt />
                  </div>
                </template>
              </div>
              <div
                class="big_img_img"
                v-show="showBigIMG"
                @click="clickShowBigIMG"
              >
                <img :src="bigImgsItem" alt />
              </div>

              <div
                class="loop_item"
                @mouseenter.stop="smallMouseover"
                @mouseleave.stop="smallRemoveActive"
              >
                <swiper :options="smallSwiperOption">
                  <swiper-slide
                    class="swiper__"
                    v-for="(item, index) in introduces.images"
                    :key="index"
                  >
                    <div class="list_loop">
                      <div class="img__">
                        <img :src="item" alt @click="itemTo(item)" />
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="prev btn_1 prev" v-show="smallShow">
                  <img
                    src="../../assets/image/arrowLeft.png"
                    class="left-btn sm-btn"
                  />
                </div>
                <div class="next btn_1 next" v-show="smallShow">
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
                  <p class="one_text_t">{{ introduces.name }}</p>
                </div>
                <div class="person_num left">
                  <p>{{ introduces.view_num }}</p>
                  <p>浏览量</p>
                </div>
              </div>
              <!-- 中间 -->
              <div class="store_data">
                <div class="data_price">
                  <label for="价格" class="price">价格</label>
                  <div class="item_price">
                    <div class="red_pri">
                      <span class="span1" v-if="introduces.price != '免费'"
                        >￥</span
                      >
                      <span class="span2">{{
                        introduces.reduced_price == 0
                          ? introduces.price
                          : introduces.reduced_price
                      }}</span>
                    </div>
                    <div class="del_pri" v-if="introduces.reduced_price != 0">
                      <span class="span3">￥</span>
                      <span class="span3">{{ introduces.price }}</span>
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
                  <p>{{ introduces.size }}</p>
                </div>
              </div>
              <!-- 下部分 -->
              <div class="store_btn">
                <div
                  class="btn"
                  v-if="
                    status == 1 || (introduces.is_order == 0 && status == 1)
                  "
                >
                  <button class="btn_1" @click="buyNow">立即购买</button>
                  <button class="btn_1" @click="addCart(introduces)">
                    加入购物车
                  </button>
                </div>
                <!-- <div class="btn_" v-show="status==2 ||introduces.is_order == 1 "> -->
                <div class="btn_" v-else>
                  <el-button
                    class="btn_1"
                    v-model="centerDialogVisible"
                    @click="download"
                    >立即下载</el-button
                  >
                  <!-- 弹窗部分 -->
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
                        <el-button @click="loadfile" class="download"
                          >下载</el-button
                        >
                        <el-button
                          @click="centerDialogVisible = false"
                          class="download_1"
                          >取消</el-button
                        >
                      </div>
                    </div>
                  </el-dialog>
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
                  <div class="change_2">
                    <el-popover
                      placement="bottom"
                      trigger="click"
                      class="share_box"
                    >
                      <div slot="reference">
                        <img src="../../assets/image/share.png" alt />
                        <span>分享</span>
                      </div>
                      <div class="sharing">
                        <img
                          src="../../assets/image/aicon_3.png"
                          alt
                          @click="wechat"
                          slot="reference"
                        />
                        <el-popover
                          placement="top"
                          width="200"
                          v-model="visible"
                        >
                          <p>{{ message }}</p>
                          <div
                            style="
                              text-align: right;
                              margin: 0;
                              margin-top: 20px;
                            "
                          >
                            <el-button
                              type="primary"
                              size="mini"
                              @click="visible = false"
                              v-clipboard:copy="message"
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                              >复制链接</el-button
                            >
                          </div>
                        </el-popover>
                        <img
                          src="../../assets/image/aicon_2.png"
                          alt
                          @click="sharefacebook"
                        />
                        <img
                          src="../../assets/image/aicon_1.png"
                          alt
                          @click="shareWeibo"
                        />
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  相关推荐 -->
      <div class="content">
        <div class="w clearfix">
          <!-- 左侧相关推荐 -->
          <div class="left_content left">
            <!-- 标题 -->
            <div class="title">
              <div class="title_img">
                <img src="../../assets/image/recommend.png" alt />
              </div>
              <div class="fresh" @click="freshed">
                <img src="../../assets/image/fresh.png" alt />
                <span>换一组</span>
              </div>
            </div>
            <!-- 图文展示 -->
            <div class="shop_list" :data="shop_list">
              <div
                class="list_img_1"
                v-for="items in shop_list"
                :key="items.id"
                @click="goToLoopcart(items)"
              >
                <div class="img__img">
                  <img :src="items.image" alt />
                </div>
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
                    <span v-if="items.price > 0" class="icon">￥</span>
                    <span class="span">{{
                      items.reduced_price == 0
                        ? items.price
                        : items.reduced_price
                    }}</span>
                    <del v-if="items.reduced_price > 0"
                      >￥{{ items.price }}</del
                    >
                  </div>
                  <div class="people">
                    <img src="../../assets/image/eye.png" alt />
                    <span>{{ items.view_num }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧大图展示 -->
          <div class="right_content left">
            <el-tabs type="border-card" class="fu_box" v-model="activeName">
              <el-tab-pane label="内容介绍" name="first">
                <div v-html="introduces.content" class="listContent"></div>
              </el-tab-pane>
              <el-tab-pane label="累计评价" name="second">
                <div class="block" v-if="introduces.score != 0">
                  <el-rate
                    :value="introduces.score > 0 ? introduces.score : 0"
                    disabled
                  ></el-rate>
                  <p class="disabled">好评率</p>
                  <p class="disableds">{{ introduces.good_rate }}</p>
                </div>
                <div class="good_rate" v-if="introduces.score == 0">
                  {{ introduces.good_rate }}
                </div>
                <!--  评价列表 -->
                <div
                  class="appraise_one"
                  v-for="(arr, index) in moreComment"
                  :key="index"
                >
                  <div class="appraise">
                    <div class="head clearfix left">
                      <div class="head_img">
                        <img :src="arr.avatar" alt />
                      </div>
                      <div class="head_name">
                        <p class="hi">{{ arr.nickname }}</p>
                        <p class="ps">{{ arr.createtime }}</p>
                      </div>
                    </div>
                    <div class="five_star right">
                      <el-rate
                        :value="arr.score"
                        disabled
                        class="e_rate"
                      ></el-rate>
                    </div>
                  </div>
                  <div class="articles">
                    <p class="arr_content">{{ arr.content }}</p>
                  </div>
                </div>
                <!--  查看更多评论 -->
                <div
                  class="more_review"
                  @click="lookmoreComment"
                  v-if="introduces.evaluate_num > 20"
                >
                  <p>查看更多评论 >></p>
                </div>
                <!-- </el-scrollbar> -->
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <!-- 尾部 -->
      <my-footer></my-footer>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import local from "@/utils/local";
import { mapActions } from "vuex";
export default {
  // 商品详情的内容介绍
  name: "introduce",
  inject: ["reload"],
  data() {
    return {
      grade_name: [],
      category: [],
      page: 0,
      message: '',
      visible: false,
      bigShowVideo: true,
      showBigIMG: false,
      bigImgsItem: '',
      bigIMG: [],
      shopCart: [], // 未登录添加购物车
      videoImg: true,
      emtpyCart: [],    // 添加购物车的id
      moreComment: [],
      storeNumber: 0,
      activeName: "first",
      fiveStar: "", //星星
      value: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      introduces: "", // 初始化数据
      evaluate_list: "",
      shop_list: [], // 左侧商品推荐列表
      limit: 3,
      is_collect: 0, // 0=未收藏  1 收藏
      status: "", //  状态:1=付费,2=免费
      downloaded: [], // 获取下载文件详情
      downloadFile: "", // 获取下载文件详情页
      goods_id: "",
      is_authorize_logo: "授权专属LOGO",
      num: 1,
      smallShow: false,
      centerDialogVisible: false,
      editorOption: {},
      smallSwiperOption: {
        slidesPerView: 5,
        spaceBetween: 5,
        freeMode: true, // 不止滑动一格
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        },
      },
    };
  },
  created() {
    this.goods_id = this.$route.query.goods_id || '';
    this.getIntroduces();
    this.getShop_list();
  },
  computed: {
  },
  updated() {
    // window.scroll(0, 0);
  },
  methods: {
    ...mapActions(['addStoreCount']),
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
      // console.log(keyword);
      this.$router.push({ path: '/articles', query: { keyword: keyword } })
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
      let vide = this.$refs.vide
      console.log(vide.paused, " this.$refs.vide.paused");
      if (vide.paused) {
        vide.play();
      } else if (vide.play()) {
        vide.pause();
      }
    },
    clickShowBigIMG() {
      this.showBigIMG = !this.showBigIMG
      this.bigShowVideo = true
    },
    // 获取页面数据
    async getIntroduces() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/goods/goodsInfo", {
          goods_id: this.goods_id
        });
        console.log(data, "getIntroduces");
        this.introduces = data;
        this.is_collect = data.is_collect;
        this.status = data.status; // 是否为付费
        this.bigIMG = data.images;
        let grade_name = data.grade_name.split(',')
        let category = data.category_name.split(',')
        this.category = category
        this.grade_name = grade_name
        this.lookmoreComment(); //  调用更多评价
        this.richesHandle(data.content)
        console.log(data);
      } catch (err) {
        this.$router.push('/404')
      }
    },
    // 推荐相关数据
    async getShop_list() {
      await this.$http
        .post("api/goods/randGoods", { limit: this.limit })
        .then(res => {
          this.shop_list = res.data.data;
        })
        .catch(err => {
          this.$message.error("获取相关推荐失败");
        });
    },
    // 换一组
    freshed() {
      this.reload(); // 局部刷新
      this.shop_list = "";
      this.getShop_list();
    },
    // 点击商品，跳转商品详情
    goToLoopcart(item) {
      if (item.type == 2) {
        // 跳转到组合产品详情
        this.$router.push({ path: "/loopcart", query: { goods_id: item.id } });
      } else {
        var query = { goods_id: item.id }
        this.$router.push({ path: '/introduce', query: query })
        this.getIntroduces()
      }
    },
    // 立即购买
    buyNow() {
      let that = this
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        that.$router.push({
          path: "/confirm",
          query: {
            routeParams: JSON.stringify({
              goods_id: that.goods_id,
              num: that.num,
            })
          }
        });

      } else {
        that.$confirm('您尚未登录 ，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$router.push('/login')
          this.$router.push({ path: '/login', query: { toLogin: '1' } })
        }).catch(() => {

        });
      }

    },
    // 加入购物车
    async addCart(item) {
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        try {
          const { data: { code } } =
            await this.$http.post("api/sundry/addCar", {
              goods_id: item.id
            })
          this.getcount()
          this.$message.success("加入购物车成功");
          this.emtpyCart.push(item.id)
          this.emtpyCart = JSON.parse(JSON.stringify(this.emtpyCart))

        } catch (err) {
          this.$message.error("该商品已添加购物车");
        }

      } else {
        if (localStorage.getItem("shopCart")) {
          var obj = JSON.parse(localStorage.getItem('shopCart'))
          obj.push(item)
          localStorage.setItem('shopCart', JSON.stringify(obj))
          this.$message.success("加入购物车成功");
          this.getcount()
        } else {
          var obj = []
          obj.push(item)
          localStorage.setItem("shopCart", JSON.stringify(obj))
          this.$message.success("加入购物车成功");
          this.getcount()
        }
      }

    },

    async download() {     //  立即下载
      this.centerDialogVisible = !this.centerDialogVisible;
      const {
        data: { data }
      } = await this.$http.post("api/goods/getGoodsFile", {
        goods_id: this.goods_id
      });
      this.downloaded = data.list;
      this.downloadFile = data;
    },
    // 添加收藏 取消收藏
    async toggleStatus() {
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
        } else {
          const {
            data: { data }
          } = await that.$http.post("api/sundry/addGoodsCollect", {
            goods_id: that.goods_id
          });

          this.$message.success("添加收藏成功");
          this.is_collect = 1;
        }
      } else {
        that.$confirm('您尚未登录 ，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          that.$router.push('/login')
        }).catch(() => {

        });
      }

    },

    async loadfile() {     // 弹窗内的文件下载
      await this.$http
        .post("api/goods/downloadGoodsFile", { goods_id: this.goods_id })
        .then(res => {
          this.$message.success("下载成功");
          let url = res.data.data;
          window.location.href = "https://glaforteachers.com" + url;
        })
        .catch(err => {
          // console.log(err);
          this.$message.error("下载失败");
        });
    },
    // 查看更多评论
    async lookmoreComment() {
      this.page++
      const {
        data: { data }
      } = await this.$http.post("api/evaluate/evaluateList", {
        goods_id: this.goods_id,
        page: this.page
      });
      this.moreComment = data;
    },
    richesHandle(data) {   // 富文本处理
      let fn_result = data
      fn_result = fn_result.replace(/()/g, "");
      fn_result = fn_result.replace(/(&nbsp;)/g, "");
      fn_result = fn_result.replace("<html><head><title></title></head><body>", "");
      fn_result = fn_result.replace("</body></html>", "")
      return fn_result;
    },
    wechat() {
      this.visible = !this.visible
      this.message = window.location.href
    },
    onEditorReady(editor) {
      console.log(editor);
    },
    // 点击复制
    onCopy(e) {
      // alert(e.text)
      console.log(e);
    },
    onError(e) {
      alert('Failed to copy texts')
    },
    // 分享到微博
    shareWeibo() {
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
    // 播放视频
    playVideo() {
      this.videoImg = false
    },

    async getcount() {
      var obj = JSON.parse(localStorage.getItem('shopCart'))
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
  overflow: hidden;

  //  商品详情区域
  .store_box {
    margin: 30px 0;
    .w {
      .top_introduce {
        background-color: #fff;
        padding: 32px 24px;
        box-sizing: border-box;
        height: 380px;
        box-shadow: 20px 20px 20px #f9f9f9;
        display: flex;
        align-items: center;
        // 左侧图片

        .left_img {
          width: 408px;
          .big_img {
            width: 408px;
            height: 245px;
            position: relative;
            .video_vid {
              width: 408px;
              height: 245px;
              border-radius: 8px;
            }
            // 调整播放器样式
            .video-js .vjs-icon-placeholder {
              width: 100%;
              height: 100%;
              display: block;
            }
            .video_img {
              position: absolute;
              top: 0;
              left: 0;
              width: 408px;
              height: 100%;
              border-radius: 8px;
            }
            .big_img_img {
              width: 408px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 8px;
              }
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
            .swiper__ {
              height: 60px;
              .list_loop {
                box-sizing: border-box;
                background-color: #fff;
                position: relative;
                .img__ {
                  height: 46px;

                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                  }
                }
              }
            }

            .prev {
              position: absolute;
              top: 13px;
              left: 10px;
              z-index: 2;
              img {
                width: 14px;
                height: 20px;
              }
            }
            .next {
              position: absolute;
              right: 10px;
              top: 13px;
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
          flex: 1;

          .store_name {
            margin-bottom: 5px;
            .store_name_t {
              width: 610px;
              padding-left: 20px;
              box-sizing: border-box;
              height: 48px;
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
              height: 40px;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              .sort {
                display: block;
                width: 100px;
                height: 40px;
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
                height: 40px;
                align-items: center;

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
            position: relative;
            height: 86px;
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
              margin: 10px 10px 20px 90px;
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

              // -------------------------------------------------------------------------------
              // 弹窗部分
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
            .store_change {
              position: absolute;
              right: 20px;
              bottom: 30px;
              width: 200px;
              height: 44px;
              display: flex;
              align-items: center;
              margin-left: 80px;
              .change_1 {
                display: flex;
                height: 26px;
                line-height: 26px;
                .collect__ {
                  width: 115px;
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
              .change_2 {
                height: 26px;
                line-height: 26px;
                float: left;
                .share_box {
                  display: inline-block;
                  span {
                    margin-left: 5px;
                    color: #b7b7b7;
                    font-size: 14px;
                    line-height: 26px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // 相关推荐
  .content {
    .w {
      // 左侧相关推荐
      .left_content {
        width: 290px;
        // margin-right: 6px;
        .title {
          width: 272px;
          height: 20px;
          padding: 20px 0;
          .title_img {
            float: left;
            img {
              width: 100%;
            }
          }
          .fresh {
            float: right;
            position: relative;
            img {
              position: absolute;
              top: 6px;
              left: -24px;
            }
            span {
              color: #416fae;
              font-weight: 600;
              font-size: 14px;
              line-height: 30px;
            }
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
            }
            .price {
              .price_red {
                position: absolute;
                left: 16px;
                bottom: 16px;
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
                position: absolute;
                right: 16px;
                bottom: 16px;
                img {
                  width: 20px;
                  height: 10px;
                }
                span {
                  color: #999999;
                  font-size: 10px;
                  margin-left: 5px;
                }
              }
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
            // height: 30px;
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
}
</style>
<style>
.el-popper[x-placement^="bottom"] {
  margin-top: 12px !important;
}
.el-tabs--border-card > .el-tabs__content {
  min-height: 825px;
}
.container-tab .el-tabs__content {
  flex-grow: 1;
}
.el-rate__icon {
  font-size: 36px !important;
}
.el-rate__text {
  font-size: 17px !important;
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