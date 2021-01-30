<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!-- 确认订单 -->
    <div class="confirm_order">
      <div class="w">
        <div class="confirm_title">
          <div class="my_order">
            <img src="../../assets/image/shop(2).png" alt />
            <span>我的订单</span>
          </div>
          <div class="flow">
            <ul class="clearfix">
              <li>
                <p class="item0">1</p>
                <span class="itemj">我的购物车</span>
                <p class="item2">>></p>
              </li>
              <li>
                <p class="item0">2</p>
                <span class="itemj">确认订单</span>
                <p class="item2">>></p>
              </li>
              <li>
                <p class="item0">3</p>
                <span class="itemj">提交订单</span>
              </li>
            </ul>
          </div>
        </div>
        <!--  选择付款的方式 -->
        <div class="pay_way">
          <div class="pay_box">
            <div class="pay">
              <img src="../../assets/order/icon_50@2x.png" alt />
              <span>选择付款方式</span>
            </div>
          </div>
          <div class="pay_change">
            <el-radio-group
              v-model="reqParams.pay_type"
              class="pay_change_tiem"
            >
              <el-radio label="wechat" class="pay_let" @change="weChat">
                <img src="../../assets/image/data89.png" class="pSpan" alt />
                <span>微信</span>
              </el-radio>
              <el-radio label="alipay" class="pay_let" @change="aliPay">
                <img src="../../assets/image/zhifubao.png" alt class="pSpan" />
                <span>支付宝</span>
              </el-radio>
              <el-radio label="balance" class="pay_let" @change="Balance">
                <img src="../../assets/image/data90.png" class="pSpan" alt />
                <span>余额</span>
                <span class="money_p">{{ money }}元</span>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 选择LOGO设置 -->
        <div class="logo_set">
          <div class="logo_box">
            <div class="logo">
              <img src="../../assets/image/set(1).png" alt />
              <span>选择LOGO设置</span>
              <span>*</span>
              <span
                >点预览效果上传LOGO，满意预览效果后再付款，虚拟商品不支持退费，请您理解</span
              >
            </div>
            <div class="logo_change">
              <el-radio-group
                v-model="checkedOne"
                @change="toExclusiveLogo"
                :disabled="disabled"
              >
                <el-radio :label="1" class="logo_let letimg1">
                  <span>授权专属LOGO</span>
                  <span
                    class="nthspan"
                    @mouseover="overed(1)"
                    @mouseleave="leaved(1)"
                    >?</span
                  >
                </el-radio>
                <div class="classXx" v-show="upXiaoXI">
                  <div class="dk">
                    授权后可以换上您的专属LOGO，让我们的原创成为您的原创
                  </div>
                </div>
                <el-radio :label="2" class="logo_let">
                  <span :class="logo == 2 ? 'logoTrue' : ''"
                    >使用口袋宇宙LOGO</span
                  >
                </el-radio>
                <el-button class="logo_let btn" @click="showPreview"
                  >预览效果</el-button
                >
                <!--   确认预览的弹窗  -->
                <div
                  class="arr1"
                  v-if="showPreviewED"
                  @click.stop="showPreviewED = false"
                >
                  <div class="arr2">
                    <div class="arr3">
                      <div class="arr4" @click="showPreviewED = false">
                        <img src="../../assets/image/quit_white.png" alt />
                      </div>
                      <el-carousel :interval="5000" arrow="always">
                        <el-carousel-item
                          v-for="(item, index) in loops"
                          :key="index"
                        >
                          <div class="arr_img">
                            <img
                              :src="item"
                              class="img_report_kou"
                              :fit="fits"
                              alt
                            />
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                      <el-button class="validated bbt1" @click="showPreview"
                        >确认使用</el-button
                      >
                      <div class="logo"></div>
                    </div>
                  </div>
                </div>
              </el-radio-group>
              <!-- 弹窗  授权logo-->
              <div class="register_Logo" v-show="changeLogo">
                <div class="userwrap_Logo">
                  <div class="logo_txt">
                    <div class="w">
                      <!-- 标题 -->
                      <div class="change_logo">
                        <div class="my_logo">
                          <img src="../../assets/image/change.png" alt />
                          <span>更换LOGO</span>
                        </div>
                        <div class="downup" @click="changeLogoShow">
                          <img src="../../assets/image/quit.png" alt />
                        </div>
                      </div>
                      <!-- 上传头像 -->
                      <div class="upload">
                        <div class="upload_head">
                          <el-upload
                            class="avatar-uploader a_card b_car"
                            action
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="changeUpload"
                            :loading="loading"
                          >
                            <img
                              :src="dialogImageUrl"
                              class="avatar"
                              v-show="avatar"
                            />
                            <div class="box" v-show="show__">
                              <img src="../../assets/order/camera.png" alt />
                              <span>上传LOGO 长宽比1:1</span>
                            </div>
                          </el-upload>
                        </div>
                        <div class="preview_btn" @click="previewIMG">
                          <el-button class="preview">预览</el-button>
                          <!--  确认预览的弹窗 -->
                          <div
                            class="register_5g"
                            v-if="Preview"
                            :data="loopsLogo"
                            @click.stop="offPreview"
                          >
                            <div class="userwrap_5g">
                              <div class="all_box">
                                <div class="quit_btn">
                                  <img
                                    src="../../assets/image/quit_white.png"
                                    alt
                                  />
                                </div>
                                <el-carousel :interval="5000" arrow="always">
                                  <el-carousel-item
                                    v-for="(item, index) in loopsLogo"
                                    :key="index"
                                  >
                                    <div class="arr_img_zi">
                                      <div class="logo_box">
                                        <div
                                          class="dialogImageUrl"
                                          v-if="dialogImageUrl"
                                        >
                                          <img
                                            :src="dialogImageUrl"
                                            @contextmenu.prevent="selectBtn"
                                            @click="selectBtn(index)"
                                            alt
                                          />
                                        </div>
                                        <img
                                          :src="item"
                                          class="img_report_zi"
                                          @click="selectBtn(index)"
                                          @contextmenu.prevent="selectBtn"
                                          :fit="fits"
                                          alt
                                        />
                                      </div>
                                    </div>
                                  </el-carousel-item>
                                </el-carousel>
                              </div>
                              <el-button class="validated" @click="togo"
                                >确认使用</el-button
                              >
                            </div>
                          </div>
                          <div class="content_p">
                            <span>*</span>
                            <span
                              >请上传正方形LOGO，图片不小于148*148。满意预览效果后再付款，虚拟商品不支持退费，请您理解。如遇其他问题，可联系小口袋微信：shucai_001，帮您解决！</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品名称  操作 -->
        <div class="store_name">
          <ul class="clearfix">
            <li>商品名称</li>
            <li>操作</li>
          </ul>
        </div>
        <div class="store_list">
          <!--非 数组类型得数据 -->
          <div class="order_content" v-show="reqParams.num == 1">
            <div class="order_left_img">
              <img :src="storeList_.image" alt />
              <div class="flash_sale" v-if="storeList_.reduced_price != 0">
                <div class="time_limit">
                  <div class="sale">
                    <span>限时特惠</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧内容 -->
            <div class="order_right_content">
              <div class="top_content clearfix">
                <div class="content_details left">
                  <div class="item_name two_text">{{ storeList_.name }}</div>
                  <div class="logo_money">
                    <div class="el_checkbox" @click.stop="toExclusiveLGONE">
                      <img
                        src="../../assets/image/changefang.png"
                        v-if="this.reqParams.is_authorize_logo == 1"
                        alt
                      />
                      <img src="../../assets/image/fang.png" v-else alt />
                    </div>
                    <div class="s_LOGO">授权专属LOGO({{ logomoney }}元/个)</div>
                    <span
                      class="nthspan"
                      @mouseover="overed(2)"
                      @mouseleave="leaved(2)"
                      >?</span
                    >
                  </div>
                  <div class="classXxbox" v-show="upXiao">
                    <div class="dk">
                      授权后可以换上您的专属LOGO，让我们的原创成为您的原创
                    </div>
                  </div>
                </div>
                <div class="order_price left">
                  <div class="pris">
                    <span class="soan">￥</span>
                    <span class="spanimg">{{
                      storeList_.reduced_price == 0
                        ? storeList_.price
                        : storeList_.reduced_price
                    }}</span>
                  </div>
                  <del v-if="storeList_.reduced_price != 0"
                    >￥{{ storeList_.price }}</del
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- 数组类型得数据 -->
          <div
            class="order_content"
            v-for="(item, index) in storeList"
            :key="index"
            v-show="reqParams.num == 2"
          >
            <div class="order_left_img">
              <img :src="item.image" alt />
              <div class="flash_sale" v-if="item.reduced_price != 0">
                <div class="time_limit">
                  <div class="sale">
                    <span>限时特惠</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右侧内容 -->
            <div class="order_right_content">
              <div
                class="top_content clearfix"
                @click.stop="godetails(item.id)"
              >
                <div class="content_details left">
                  <div class="item_name two_text">{{ item.name }}</div>
                  <div class="logo_money">
                    <div
                      class="el_checkbox"
                      @click.stop="toExclusiveLGCar(index)"
                    >
                      <img
                        src="../../assets/image/changefang.png"
                        v-if="item.is_authorize_logo == 1"
                        alt
                      />
                      <img src="../../assets/image/fang.png" v-else alt />
                    </div>
                    <div class="s_LOGO">授权专属LOGO({{ logomoney }}元/个)</div>
                    <span
                      class="nthspan"
                      @mouseover="overeds(index)"
                      @mouseleave="leaveds(index)"
                      >?</span
                    >
                    <div class="classXxbox" v-show="item.updownbox == 1">
                      <div class="dk">
                        授权后可以换上您的专属LOGO，让我们的原创成为您的原创
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order_price left">
                  <div class="pris">
                    <span class="soan">￥</span>
                    <span class="spanimg">{{
                      item.reduced_price == 0 ? item.price : item.reduced_price
                    }}</span>
                  </div>
                  <del v-if="item.reduced_price != 0">￥{{ item.price }}</del>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ---------------------------------------------------------- -->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <!-- ---------------------------------------------------------- -->
    <!--  合计 -->
    <div class="totaldown">
      <div class="w">
        <div class="downlist">
          <div class="downone" v-if="logo != 2">
            <div class="topones">
              <div class="totalnum">
                已选择
                <span class="red">{{
                  extra.goods_num ? extra.goods_num : 0
                }}</span>
                件商品
              </div>
              <div class="totalprice">
                <span class="total_name">合计价：</span>
                <div class="order_price tot2">
                  <span class="icon_price in1" v-if="extra.total > 0">￥</span>
                  <span class="price_Item in2">{{
                    extra.total ? extra.total : 0
                  }}</span>
                </div>
              </div>
            </div>
            <div class="toptwo">
              <div class="discount_name">
                <span class="total_name1">总价：</span>
                <div class="order_price tot1">
                  <span class="icon_price icon1" v-if="extra.price > 0"
                    >￥</span
                  >
                  <span class="price_Item icon2">{{
                    extra.price ? extra.price : 0
                  }}</span>
                </div>
              </div>
              <div class="discount_name discount_nam_">
                <span class="total_name1">折扣：</span>
                <div class="order_price tot1">
                  <span class="icon_price icon1" v-if="extra.discount > 0"
                    >￥</span
                  >
                  <span class="price_Item icon2">{{
                    extra.discount ? extra.discount : 0
                  }}</span>
                </div>
              </div>
              <div class="price_count">
                <span class="total_name2">优惠券：</span>
                <div class="order_price tot1">
                  <span class="icon_price icon1" v-if="extra.face_value > 0"
                    >￥</span
                  >
                  <span class="price_Item icon2">{{
                    extra.face_value ? extra.face_value : 0
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="changelogomoney" v-else>
            <div class="totalprice">
              <span class="total_name">更换LOGO：</span>
              <div class="order_price tot2">
                <span class="icon_price in1">￥</span>
                <span class="price_Item in2">{{ logomoney }}</span>
              </div>
            </div>
          </div>
          <div class="pay">
            <el-button
              class="bbt"
              style="width: 160px"
              @click="submitOrder"
              v-if="logo != 2"
              >付款</el-button
            >
            <el-button
              class="bbt"
              style="width: 160px"
              @click="submitOrdelogo"
              v-else
              >付款</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper" v-if="clickWeichat">
      <div class="popup_content">
        <div class="delimglogo">
          <div class="s_title">微信支付</div>
          <div class="l_icon" v-loading="loading2">
            <img src="../../assets/image/quit.png" alt />
          </div>
        </div>
        <div class="payimg">
          <img :src="url" alt />
        </div>
      </div>
      <div class="login_bg"></div>
    </div>

    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
<script>
import { mapState } from "vuex"
import local from "@/utils/local";
import EventBus from "@/components/bus";

export default {
  // 确认订单页面
  name: "confirm",
  data() {
    return {
      disabled: false,
      dialogVisible: false, // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 295, // 默认生成截图框宽度
        autoCropHeight: 413, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组 // 防止重复提交
      loading: false,
      fits: ['none'],
      Preview: false,
      dialogImageUrl: "",   //上传图片
      loopsLogo: [],//  预览轮播图
      show__: true, // 图像相机
      avatar: false,
      changedStatus: '',   // 对提交订单做区分  1.商品详情  2. 购物车 
      car_id: [],
      goods_id: '',
      data: [],
      dated: [],
      changeLogo: false,
      loopsObj: '',
      checkedOne: 1,
      loops: [],  // 轮播
      submit: " 提交订单",
      storeList: [], // 接口返回多条数据
      storeList_: "", // 接口返回单条数据
      showPreviewED: false,
      extra: "", // 合计
      arr: "",
      order_id: '',
      order_num: "", // 订单号
      status: '',
      reqParams: {
        num: "", // 做购物车来源判断   1. 详情 单件 2. 购物车
        goods_id: [], // 商品id
        pay_type: "wechat", // 支付类型 wechat=微信支付  alipay=支付宝,balance=余额支付
        is_authorize_logo: 1, //  是否授权logo
        logo_image: "", //是否授权logo
        coupons_id: "", //优惠券id
        ueer_cpupons_id: "", //用户优惠券id
        coupons_price: "", //优惠券优惠金额
        data: "",
        admin_id: '',
      },
      headimg: '',
      newarr: [],
      newary: [],
      newarrd: [],
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      xiaoxi: '',
      upXiaoXI: false,
      upXiao: false,
      previewNum: 1,
      logo: 0,
      logomoney: '',
      url: '',
      newstatus: 3,  // 
      clickWeichat: false,
      loading2: false,
      order_logo_id: '',
      newarrayPrice: '',
    };
  },

  created() {

    let routeParams = JSON.parse(this.$route.query.routeParams);
    this.reqParams.num = routeParams.num
    this.reqParams.admin_id = routeParams.admin_id
    this.car_id = routeParams.car_id
    this.data = routeParams.data
    this.logo = routeParams.logo
    this.reqParams.data = routeParams   // 商品详情传过来的参数
    this.reqParams.goods_id = routeParams.goods_id
    this.status = routeParams.status
    this.getStoreList();
    if (this.logo == 2) {
      this.changelogomoney()
      this.disabled = true
    } else {
      this.changelogomoney()
      this.disabled = false
    }
  },
  computed: {
    ...mapState(['money']),
  },
  methods: {
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.fileinfo = file
      console.log(file.raw)
      var formdata = new FormData();
      formdata.append("file", file.raw);
      this.$http.post("api/common/upload", formdata).then(res => {
        console.log(res);
        this.option.img = res.data.data.url
        console.log(this.option.img);
        this.dialogVisible = true
      }).catch(err => {
        console.log(err);
      })
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropData((data) => {
        this.loading = true
        var formdata = new FormData();
        formdata.append("base64_img", data);
        this.$http.post("api/common/upload_base64", formdata).then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.avatar = true
            this.show__ = false
            this.loading = false
            this.dialogVisible = false;
            this.headimg = res.data.data.url;
            this.dialogImageUrl = res.data.data.priview_url
          }
        }).catch(err => {
          console.log(err);
        })
      })
    },
    async getStoreList() {
      if (this.reqParams.num == 1) {  // 商品详情过来的
        try {
          const {
            data: { data }
          } = await this.$http.post("api/order/order", { goods_id: this.reqParams.goods_id, is_authorize_logo: this.reqParams.is_authorize_logo });
          this.storeList_ = data.data;
          this.changedStatus = 1;
          this.goods_id = data.data.id
          console.log(data, "详情");
          let ary = {}
          ary.goods_id = data.data.id
          ary.is_authorize_logo = data.data.is_authorize_logo
          this.newarrd.push(ary)
          this.dated = this.newarrd
          this.totalNUM()
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const {
            data: { data }
          } = await this.$http.post("api/order/carOrder", { car_id: this.car_id.toString() });
          console.log(data);
          this.changedStatus = 2;
          data.data.forEach((value, index) => {
            value.is_authorize_logo = 1
            value.updownbox = 0
            let ary = {}
            ary.goods_id = value.id
            ary.is_authorize_logo = value.is_authorize_logo
            this.newarrd.push(ary)
          })
          this.storeList = data.data
          this.dated = this.newarrd
          this.totalNUM()
        } catch (err) {
          console.log(err);
        }

      }
    },
    godetails(id) {
      console.log(id);
      this.$router.push('/')
    },
    // async getaddCartLogo() {   // 购物车授权logo 
    //   let that = this
    //   try {
    //     const { data: { data } } = await this.$http.post("api/sundry/addCarLogo", { car_id: carId });
    //     console.log(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async showPreview() {  // 显示预览   口袋预览
      var that = this;
      if (that.previewNum == 1) {
        this.changeLogo = !this.changeLogo
      } else {
        that.previewNum == 1
        this.showPreviewED = !this.showPreviewED;
        if (this.car_id) {
          let id = that.data[0].goods_id;
          const {
            data: { data }
          } = await this.$http.post("api/goods/getGoodsImages", { goods_id: id });
          this.loops = data
        } else {
          const {
            data: { data }
          } = await this.$http.post("api/goods/getGoodsImages", { goods_id: this.reqParams.goods_id });
          console.log(data, "data");
          this.loops = data
        }
      }


    },
    async previewIMG() {
      this.Preview = !this.Preview;
      if (this.car_id) {
        let id = this.storeList[0].id
        const {
          data: { data }
        } = await this.$http.post("api/goods/getGoodsImages", { goods_id: id });
        this.loopsLogo = data

      } else {
        const {
          data: { data }
        } = await this.$http.post("api/goods/getGoodsImages", { goods_id: this.reqParams.goods_id });
        this.loopsLogo = data
        console.log(data);

      }
    },
    async submitOrder() {  // 提交订单

      if (this.changedStatus == 1) {
        if (this.reqParams.is_authorize_logo == 1 && this.reqParams.logo_image == '') {
          this.$message.error('请点击预览效果上传LOGO')
        } else {
          const {
            data: { data }
          } = await this.$http.post("api/order/addOrder", this.reqParams);
          this.order_id = data.order_id;
          this.order_num = data.order_num;
        }
      } else {
        // console.log(this.newarrayPrice, "dated");
        const {
          data: { data }
        } = await this.$http.post("api/order/addCarOrder", { data: this.newarrayPrice, car_id: this.car_id.toString(), pay_type: this.reqParams.pay_type, logo_image: this.reqParams.logo_image });
        // } = await this.$http.post("api/order/addCarOrder", { car_id: this.car_id.toString(), pay_type: this.reqParams.pay_type, logo_image: this.reqParams.logo_image });
        this.order_num = data.order_num;
        this.order_id = data.order_id;
        this.newarrayPrice = [];
      }
      if (this.reqParams.pay_type == "balance") {
        //  订单支付
        await this.$http
          .post("api/order/orderPay", { order_id: this.order_id })
          .then(res => {
            if (res.data.code == 1) {
              this.$router.push({
                path: "/paysuccess",
                query: {
                  order_id: this.order_id,
                  order_num: this.order_num
                }
              });
            } else {
              this.$message.error("余额不足");
            }
          });
      } else if (this.reqParams.pay_type == "alipay") {
        this.alipayZFB()
      } else {
        this.$router.push({
          path: "/submit",
          query: {
            order_num: this.order_num, order_id: this.order_id, pay_type: this.reqParams.pay_type
          }
        });
      }
      // }

    },
    async changelogomoney() {
      try {
        const {
          data: { data }
        } = await this.$http.post('api/sundry/getLogoPrice');
        this.logomoney = data;
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async submitOrdelogo() {
      let that = this
      let obj = {}
      console.log(this.reqParams);
      if (this.reqParams.logo_image != '') {
        obj.goods_id = that.reqParams.goods_id
        obj.logo_image = that.reqParams.logo_image
        obj.pay_type = that.reqParams.pay_type
        try {
          const {
            data: { data }
          } = await that.$http.post('api/order_logo/addOrderLogo', obj);
          console.log(data);
          let logoOrder = data.order_logo_id
          if (obj.pay_type == 'wechat') {

            this.$router.push({
              path: "/submit",
              query: {
                order_logo_id: logoOrder,
                logo: that.logo,
                pay_type: obj.pay_type
              }
            });
          } else if (obj.pay_type == 'balance') {
            await this.$http
              .post("api/order_logo/orderLogoPay", { order_logo_id: logoOrder })
              .then(res => {
                console.log(res);
                if (res.data.code == 1) {
                  this.$router.push({
                    path: "/paysuccess",
                    query: {
                      order_logo_id: logoOrder,
                      logo: that.logo
                    }
                  });
                } else {
                  this.$message.error("余额不足");
                }
              });

          } else if (obj.pay_type == 'alipay') {
            const { data: { data } } = await this.$http.post(
              "api/order_logo/orderLogoPay", { order_logo_id: logoOrder }
            )
            // console.log(data);
            var { href } = this.$router.resolve({
              path: '/newpage',
              query: {
                htmls: data.result
              }
            });
            window.open(href, '_blank');
          }
        } catch (err) {
          console.log(err.data);
        }

      } else {
        this.$message.error('请点击预览效果上传LOGO')
      }
    },
    toExclusiveLogo(value) {  // 跳转到专属logo
      if (this.reqParams.num == 1) {
        this.checkedOne = value;
        this.previewNum = value
        console.log(value, "value");
        if (value == 1) {
          this.reqParams.is_authorize_logo = 1
          this.totalNUM() // 合计金额
        } else {
          this.reqParams.is_authorize_logo = 2
          this.previewNum = 2
          this.totalNUM() // 合计金额
        }
      } else { // 购物车
        this.previewNum = value
        this.dated = []
        if (value == 1) {
          this.storeList.forEach((value, index) => {
            value.is_authorize_logo = 1
            let obj = {}
            obj.goods_id = value.id
            obj.is_authorize_logo = value.is_authorize_logo
            this.dated.push(obj)
          })
          // console.log(this.dated);

        } else {
          this.storeList.forEach((value, index) => {
            console.log(value);
            value.is_authorize_logo = 2
            let obj = {}
            obj.goods_id = value.id
            obj.is_authorize_logo = value.is_authorize_logo
            this.dated.push(obj)
            console.log(obj);
            console.log(this.dated, "dateddd");
          })
        }
        this.totalNUM() // 合计金额
        this.storeList = this.storeList
        this.previewNum = this.previewNum

      }
    },
    toExclusiveLGONE() {
      if (this.reqParams.is_authorize_logo == 1) {
        this.reqParams.is_authorize_logo = 2
        this.checkedOne = 2
      } else {
        this.reqParams.is_authorize_logo = 1
        this.checkedOne = 1
      }
      this.totalNUM()
    },
    toExclusiveLGCar(index2) {      // 购物车商品
      var that = this, list = [];
      that.newary = []
      that.dated = []
      that.storeList.forEach((item, index) => {
        if (index == index2) {
          if (item.is_authorize_logo == 1) {
            item.is_authorize_logo = 2
          } else {
            item.is_authorize_logo = 1
          }
        }
        if (item.is_authorize_logo == 1) {
          list.push(item.is_authorize_logo)
        }
        if (list.length > 0) {
          that.checkedOne = 1
        } else {
          that.checkedOne = 2
        }
      })
      that.storeList.forEach((value, index) => {
        let ary = {}
        ary.goods_id = value.id
        ary.is_authorize_logo = value.is_authorize_logo
        that.newary.push(ary)
      })
      that.newary = that.newary
      that.dated = that.newary
      that.storeList = that.storeList
      that.totalNUM()
    },
    async totalNUM() {
      let that = this
      console.log(this.dated, "dateddd");
      let obj = {}
      obj.goods_id = that.goods_id
      obj.is_authorize_logo = that.reqParams.is_authorize_logo
      if (that.reqParams.num == 1) {
        try {
          const { data: { data } } = await that.$http.post("api/order/getTotal", { data: obj });
          that.extra = data;
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { data: { data } } = await that.$http.post("api/order/getTotal", that.dated);
          that.extra = data;
          console.log(data);
          that.newarrayPrice = that.dated

          that.dated = []
          console.log(that.newarrayPrice, "newarrayPrice");
        } catch (err) {
          console.log(err);
        }
      }
    },
    aliPay(e) {
      this.reqParams.pay_type = e;
    },
    async alipayZFB() {
      const { data: { data } } = await this.$http.post(
        "api/order/orderPay", { order_id: this.order_id }
      )
      console.log(data);
      var { href } = this.$router.resolve({
        path: '/newpage',
        query: {
          htmls: data.result
        }
      });
      // window.open(href, '_blank');
      window.location.href = href


    },
    Balance(e) {
      this.reqParams.pay_type = e;
      // this.submit = "付款并提交订单";
      this.submit = "提交订单";
    },
    weChat(e) {
      // console.log(e);
      this.reqParams.pay_type = e;
    },
    // 移入
    overed(k) {
      if (k == 1) {
        this.upXiaoXI = true
      } else {
        this.upXiao = true
      }
    },
    // 移出
    leaved(k) {
      if (k == 1) {
        this.upXiaoXI = false
      } else {
        this.upXiao = false
      }
    },
    overeds(send) {     // 移入
      let list = this.storeList
      list.forEach((item, index) => {
        if (index == send) {
          if (item.updownbox == 1) {
            item.updownbox = 0
          } else {
            item.updownbox = 1
          }
        }
      })
      this.storeList = list

    },
    leaveds(send) {   // 移出
      let list = this.storeList
      list.forEach((item, index) => {
        if (index == send) {
          if (item.updownbox == 1) {
            item.updownbox = 0
          } else {
            item.updownbox = 1
          }
        }
      })
      this.storeList = list
    },
    changeLogoShow() {
      this.changeLogo = !this.changeLogo
    },
    offPreview() {
      this.Preview = !this.Preview;
    },
    togo() {
      this.reqParams.logo_image = this.headimg
      this.changeLogo = !this.changeLogo
    },

  }
};
</script>
<style>
.el-upload--picture-card {
  width: 176px;
  height: 176px;
  background-color: #e9e9e9 !important ;
  position: absolute;
  left: 44%;
  top: 50%;
}
</style>
<style scoped lang='less'>
.container {
  background-color: #fbf8fb;
  padding-bottom: 50px;
  height: 100%;
  // 确认订单
  .confirm_order {
    .w {
      width: 1200px;
      margin-top: 30px;
      // 确认订单标题
      .confirm_title {
        height: 52px;
        border-bottom: 1px solid #87b4e4;
        margin-bottom: 30px;
        .my_order {
          height: 50px;
          line-height: 48px;
          float: left;
          width: 115px;
          border-bottom: 3px solid #416fae;
          img {
            width: 19px;
            height: 22px;
            vertical-align: baseline;
          }
          span {
            padding-left: 10px;
            font-size: 20px;
            font-weight: bold;
          }
        }
        //  流程
        .flow {
          float: right;
          ul {
            display: flex;
            align-items: center;
            li {
              height: 50px;
              line-height: 50px;
              position: relative;
              display: flex;
              align-items: center;
              .item0 {
                width: 20px;
                height: 20px;
                line-height: 20px;
                background-color: #999999;
                border-radius: 50%;
                text-align: center;
                color: #fff;
              }
              .itemj {
                color: #999999;
                font-size: 16px;
                margin-left: 5px;
              }
              .item2 {
                color: #999999;
                margin: 0 30px;
              }
            }
            li:nth-child(2) {
              .item0 {
                background-color: #416fae;
              }
              .itemj {
                color: #416fae;
              }
              .item2 {
                color: #416fae;
              }
            }
          }
        }
      }
      // <!--  选择付款的方式 -->
      .pay_way {
        height: 168px;
        background-color: #fff;
        padding: 24px;
        box-sizing: border-box;
        box-shadow: 10px 10px 10px #ccc;
        margin-bottom: 20px;
        .pay_box {
          height: 52px;
          border-bottom: 1px solid #87b4e4;
          .pay {
            height: 50px;
            line-height: 48px;
            float: left;
            width: 160px;
            border-bottom: 3px solid #416fae;
            img {
              width: 24px;
              height: 24px;
              vertical-align: baseline;
            }
            span {
              padding-left: 10px;
              font-size: 20px;
            }
          }
        }
        .pay_change {
          height: 96px;
          line-height: 96px;

          .pay_change_tiem {
            display: flex;
            align-items: center;
            margin-top: 25px;

            .pay_let {
              width: 364px;
              height: 40px;
              display: flex;
              align-items: center;
              position: relative;
              .pSpan {
                width: 28px;
                height: 28px;
                position: absolute;
                top: 6px;
                left: 20px;
              }
              span {
                font-size: 20px;
                margin-left: 33px;
                height: 30px;
              }
              .money_p {
                color: #ff0000;
                margin-left: 10px;
              }
            }
          }
        }
      }
      //  选择LOGO设置
      .logo_set {
        height: 168px;
        background-color: #fff;
        padding: 24px;
        box-sizing: border-box;
        box-shadow: 10px 10px 10px #ccc;
        margin-bottom: 20px;
        .logo_box {
          height: 50px;
          border-bottom: 1px solid #87b4e4;
          .logo {
            height: 50px;
            line-height: 48px;
            float: left;
            img {
              width: 28px;
              height: 24px;
            }
            span:nth-child(2) {
              display: inline-block;
              border-bottom: 3px solid #416fae;
              width: 180px;
              padding-left: 10px;
              font-size: 20px;
            }
            span:nth-child(3) {
              color: #ff0000;
            }
            span:nth-child(4) {
              color: #999999;
              font-size: 13px;
            }
          }
          .logo_change {
            height: 96px;
            line-height: 96px;
            position: relative;

            .logo_let {
              width: 364px;
              height: 30px;
              // background-color: #ccc;

              span {
                font-size: 20px;
                line-height: 25px;
                color: #333333;
              }
              .nthspan {
                display: inline-block;
                width: 20px;
                height: 20px;
                color: #fff;
                background-color: #416fae;
                text-align: center;
                border-radius: 50%;
                margin-left: 10px;
                line-height: 20px;
                font-size: 14px;
              }
              .logoTrue {
                color: #ccc;
              }
            }
            .btn {
              width: 160px;
              height: 48px;
              color: #fff;
              border-style: none;
              // background-color: #416fae;
              background: linear-gradient(to right, #416fae, #27508c);
              border: 1px solid #416fae;
              border-radius: 25px;
              text-align: center;
              margin-left: 180px;
            }
            .classXx {
              width: 200px;
              background-color: #f5f5f5;
              border-radius: 8px;
              padding: 10px 20px;
              box-sizing: border-box;
              position: absolute;
              bottom: 0;
              left: 193px;
              .dk {
                font-size: 14px;
                line-height: 32px;
                color: #000;
              }
            }
            //  弹窗  确认使用
            .arr1 {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 999;
              text-align: center;
              .arr2 {
                height: 80%;
                width: 100%;
                border-radius: 10px;
                position: absolute;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%);
                .arr3 {
                  position: relative;
                  height: 100%;
                  .arr4 {
                    position: absolute;
                    top: 0px;
                    right: -34px;
                    z-index: 1999;
                  }
                  .arr_img {
                    width: auto;
                    height: 100%;
                    text-align: center;

                    .img_report_kou {
                      max-width: 100%;
                      max-height: 100%;
                    }
                  }

                  .l_arrows {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background-color: #b8b8b8;
                    position: absolute;
                    top: 400px;
                    left: -80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .r_arrows {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background-color: #b8b8b8;
                    position: absolute;
                    top: 400px;
                    right: -80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .logo {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    width: 68px;
                    height: 76px;
                    z-index: 20;
                    .box {
                      position: relative;
                      width: 68px;
                      height: 76px;

                      img {
                        position: absolute;
                        top: -17px;
                        right: -14px;
                        width: 100%;
                        height: 100%;
                      }
                    }
                  }
                }
              }
              .validated {
                text-align: center;
                margin: 30px 210px;
                width: 160px;
                height: 48px;
                border-radius: 25px;
                background-color: #fff;
                color: #416fae;
                font-size: 16px;
              }
            }

            //   更换LOGO
            .register_Logo {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 999;
              .userwrap_Logo {
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 1);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .logo_txt {
                  .w {
                    // 更换LOGO
                    .change_logo {
                      height: 52px;
                      border-bottom: 2px solid #8b9cbc;
                      .my_logo {
                        float: left;
                        height: 50px;
                        line-height: 48px;
                        float: left;
                        width: 136px;
                        border-bottom: 4px solid #416fae;

                        img {
                          width: 19px;
                          height: 22px;
                          vertical-align: baseline;
                        }
                        span {
                          padding-left: 10px;
                          font-size: 20px;
                          color: #2c2c2c;
                          font-weight: bold;
                        }
                      }
                      .downup {
                        float: right;
                        width: 48px;
                        height: 52px;
                        position: relative;
                        img {
                          width: 30px;
                          height: 30px;
                          position: absolute;
                          top: 10px;
                          left: 10px;
                        }
                      }
                    }
                  }
                  //  上传头像
                  .upload {
                    height: 580px;
                    background-color: #fff;
                    .upload_head {
                      height: 360px;
                      position: relative;
                      .a_card {
                        position: absolute;
                        top: 116px;
                        left: 523px;
                        background-color: #f5f5f5;
                        width: 149px;
                        height: 149px;

                        .box {
                          height: 50px;
                          line-height: 30px;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);

                          img {
                            width: 40px;
                            height: 30px;
                          }
                          span {
                            display: block;
                            width: 116px;
                            text-align: center;
                            line-height: 46px;
                            color: #000;
                          }
                        }
                      }

                      .avatar {
                        width: 148px;
                        height: 148px;
                      }

                      .camera {
                        width: 148px;
                        height: 148px;
                        background-color: #e9e9e9;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-top: -75px;
                        margin-left: -75px;

                        .box {
                          // width: 176px;
                          height: 100%;
                          line-height: 30px;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          justify-content: center;
                          position: relative;

                          img {
                            position: absolute;
                            top: 50px;
                            left: 53px;
                            width: 40px;
                            height: 30px;
                          }
                          span {
                            position: absolute;
                            top: 83px;
                            left: 0px;
                            display: block;
                            height: 20px;
                            width: 148px;
                            color: #999999;
                            text-align: center;
                            line-height: 20px;
                          }
                        }
                      }
                    }
                    //   预览按钮
                    .preview_btn {
                      text-align: center;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      .preview {
                        width: 160px;
                        height: 48px;
                        background-color: #416fae;
                        text-align: center;
                        color: #fff;
                        border-radius: 25px;
                        font-size: 16px;
                        margin-bottom: 20px;
                      }
                      .content_p {
                        width: 538px;
                        line-height: 21px;
                        span:nth-child(1) {
                          color: #ff0000;
                        }
                        span:nth-child(2) {
                          font-size: 12px;
                          line-height: 21px;
                          color: #999999;
                        }
                      }
                      //  上传头像弹窗  确认使用
                      .register_5g {
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 999;
                        .userwrap_5g {
                          height: 80%;
                          width: 100%;
                          max-width: 100%;
                          max-height: 100%;
                          border-radius: 10px;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          // background-color: rgba(0, 0, 0, 0.5);
                          .all_box {
                            position: relative;
                            height: 100%;
                            .quit_btn {
                              position: absolute;
                              top: 0;
                              right: -34px;
                              z-index: 1999;
                              line-height: 0;
                            }

                            .arr_img_zi {
                              width: auto;
                              height: 100%;
                              .logo_box {
                                position: relative;
                                height: 100%;
                                display: inline-block;
                                .dialogImageUrl {
                                  position: absolute;
                                  top: 10px;
                                  right: 10px;
                                  width: 90px;
                                  height: 90px;
                                  z-index: 1999;

                                  img {
                                    position: absolute;
                                    top: 0px;
                                    left: 0px;
                                    width: 100%;
                                    height: 90px;
                                  }
                                }
                              }
                              .img_report_zi {
                                max-width: 100%;
                                max-height: 100%;
                                position: relative;
                              }
                            }

                            .l_arrows {
                              width: 48px;
                              height: 48px;
                              border-radius: 50%;
                              background-color: #b8b8b8;
                              position: absolute;
                              top: 400px;
                              left: -80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            }
                            .r_arrows {
                              width: 48px;
                              height: 48px;
                              border-radius: 50%;
                              background-color: #b8b8b8;
                              position: absolute;
                              top: 400px;
                              right: -80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            }
                            .validated {
                              margin-top: 30px;
                              width: 160px;
                              height: 48px;
                              border-radius: 25px;
                              background-color: #f5f5f5;
                              color: #416fae;
                              font-size: 16px;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //  商品名称
    .store_name {
      margin: 20px 0;
      height: 48px;
      line-height: 48px;
      background-color: #f4f5f9;
      ul {
        li {
          width: 570px;
          float: left;
          margin-left: 24px;
          color: #333333;
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
    .store_list {
      .order_content {
        background-color: #fff;
        padding: 20px 15px;
        box-sizing: border-box;
        display: flex;
        margin: 10px 0;
        .order_left_img {
          width: 224px;
          height: 139px;
          position: relative;
          img {
            width: 224px;
            height: 139px;
            border-radius: 6px;
          }
          // 限时特惠
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
        }
        .order_right_content {
          flex: 1;
          position: relative;
          .top_content {
            display: flex;
            .content_details {
              flex: 1;
              position: relative;
              .item_name {
                font-size: 18px;
                line-height: 24px;
                padding: 10px 20px;
                box-sizing: border-box;
                height: 62px;
              }
              .logo_money {
                height: 20px;
                margin: 5px 20px;
                display: flex;
                align-items: center;
                .el_checkbox {
                  width: 18px;
                  height: 18px;
                  img {
                    width: 100%;
                  }
                }
                .s_LOGO {
                  font-size: 16px;
                  margin-left: 10px;
                }
                .nthspan {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  line-height: 20px;
                  color: #fff;
                  background-color: #416fae;
                  text-align: center;
                  border-radius: 50%;
                  margin-left: 10px;
                  font-size: 14px;
                }
                .j_img {
                  width: 20px;
                  height: 20px;
                  line-height: 20px;
                  color: #fff;
                  background-color: #416fae;
                  text-align: center;
                  border-radius: 50%;
                  margin-left: 10px;
                  font-size: 14px;
                }
              }
              .classXxbox {
                width: 200px;
                background-color: #f5f5f5;
                border-radius: 8px;
                padding: 10px 20px;
                box-sizing: border-box;
                position: absolute;
                bottom: -33px;
                left: 250px;

                .dk {
                  font-size: 14px;
                  line-height: 32px;
                  color: #000;
                }
              }
            }
            .order_price {
              width: 200px;
              text-align: right;

              p {
                color: red;
                font-weight: bold;
                font-size: 35px;
              }
              .pris {
                display: flex;
                align-items: baseline;
                width: 100%;
                justify-content: flex-end;
                .soan {
                  font-size: 18px;
                  color: #ff0000;
                  font-weight: bold;
                }
                .spanimg {
                  color: #ff0000;
                  font-weight: bold;
                  font-size: 35px;
                }
              }
              del {
                color: #999999;
              }
            }
          }
        }
      }
    }
  }
}
//   合计
.totaldown {
  width: 100%;
  height: 100px;
  background-color: #fbf8fb;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  .downlist {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    .downone {
      flex: 1;
      height: 100px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 20px;
      box-sizing: border-box;

      .topones {
        display: flex;
        align-items: center;
        .totalnum {
          font-size: 18px;
          color: #000;
          .red {
            color: #ff0000;
            font-size: 18px;
          }
        }
        .totalprice {
          display: flex;
          align-items: center;
          margin-left: 20px;
          .total_name {
            font-size: 18px;
            color: #000;
          }
          .order_price {
            text-align: right;
            .icon_price {
              color: #ff0000;
              font-size: 14px;
            }
            .price_Item {
              color: #ff0000;
              font-size: 22px;
            }
          }
        }
      }
      .toptwo {
        display: flex;
        align-items: center;

        .discount_name {
          display: flex;
          align-items: center;
          .total_name1 {
            font-size: 16px;
            color: #000;
          }
          .order_price {
            text-align: right;
            .icon_price {
              color: #000;
              font-size: 12px;
            }
            .price_Item {
              color: #000;
              font-size: 16px;
            }
          }
        }
        .discount_nam_ {
          margin: 0 10px;
        }
        .price_count {
          display: flex;
          align-items: center;
          .total_name2 {
            font-size: 16px;
            color: #000;
          }
          .order_price {
            text-align: right;
            .icon_price {
              color: #ff0000;
              font-size: 12px;
            }
            .price_Item {
              color: #ff0000;
              font-size: 16px;
            }
          }
        }
      }
    }
    .changelogomoney {
      flex: 1;
      height: 100px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 20px;
      box-sizing: border-box;
      .totalprice {
        display: flex;
        align-items: center;
        margin-left: 20px;
        .total_name {
          font-size: 18px;
          color: #000;
        }
        .order_price {
          text-align: right;
          .icon_price {
            color: #ff0000;
            font-size: 14px;
          }
          .price_Item {
            color: #ff0000;
            font-size: 22px;
          }
        }
      }
    }
    .pay {
      width: 160px;
      height: 100px;
      display: flex;
      align-items: center;
    }
  }
  .cropper-content {
    .cropper  {
      width: auto;
      height: 300px;
    }
  }
}
.wrapper {
  width: 100%;
  height: 100%;

  .popup_content {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -210px;
    margin-left: -220px;
    width: 440px;
    height: 420px;
    background-color: #fff;
    z-index: 10005;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    .delimglogo {
      height: 30px;
      display: flex;
      align-items: center;

      .s_title {
        font-size: 20px;
        color: #2c2c2c;
        font-weight: bold;
        flex: 1;
        text-align: center;
      }
      .l_icon {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 30px;
        height: 30px;
        img {
          width: 100%;
        }
      }
    }
    .payimg {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 15px;
      box-sizing: border-box;
      img {
        width: 300px;
        height: 300px;
        border: 1px solid red;
      }
    }
  }
  .login_bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1004;
  }
}
</style>
<style>
.el-carousel {
  height: 100%;
  box-sizing: border-box;
}

.el-carousel__container {
  height: 100% !important;
  box-sizing: border-box;
}

.imgPostion {
  width: auto !important;
  height: 100% !important;
  position: relative !important;
}
</style>