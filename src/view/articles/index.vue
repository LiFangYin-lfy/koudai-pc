<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <div class="content" :data="articles">
      <div class="w">
        <!-- 左侧部分 -->
        <div class="left_text" :data="tdList">
          <div
            class="selected"
            v-if="className.length != 0 || ableChangecate.length != 0"
          >
            <div class="selected_title">
              <div class="small_selected_title">
                <h3>{{ tdList.title1.cn }}/</h3>
                <span>{{ tdList.title1.en }}</span>
              </div>
            </div>
            <div class="selected_grade">
              <p v-if="className.length != 0">年级</p>
              <div class="grade_name">
                <div
                  class="grade_list"
                  v-for="(item, index) in className"
                  :key="index"
                  @click="clickRemove(item)"
                >  
                  <p>{{ item.name }}</p>
                  <div class="cancel">
                    <div class="cancel_1">
                      <img src="../../assets/image/quit_white.png" alt="" srcset="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="selected_grade">
              <p v-if="ableChangecate.length != 0">分类</p>
              <div class="grade_name">
                <div
                  class="grade_list"
                  v-for="(item, index) in ableChangecate"
                  :key="index"
                  @click="clickRemoveCate(item)"
                >
                  <p>{{ item.name }}</p>
                  <div class="cancel">
                    <div class="cancel_1">
                      <img src="../../assets/image/quit_white.png" alt="" srcset="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 班级 -->
          <div class="grade">
            <div class="grade_title">
              <div class="small_title_1">
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
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
                <div style="margin: 15px 0"></div>
                <el-checkbox-group
                  v-model="checkedClasses"
                  @change="handleCheckedCitiesChange"
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
                      v-for="(items, indexs) in item.child"
                      :label="items.id"
                      :key="indexs"
                      style="
                        line-height: 45px;
                        margin-right: 45px;
                        margin-left: 25px;
                      "
                      class="labelBOX"
                      @change="cateChange(items)"
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
                :key="item.id"
                @change="priceChangeitem(item, index)"
              >
                <el-checkbox :checked="item.isShow" class="labelBOX">{{
                  item.name
                }}</el-checkbox>
              </div>
              <div class="hot">
                <img src="../../assets/image/Hot_1.png" alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧部分 -->
        <div class="right_text">
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
          <div class="shop_list" v-if="searchList.length != 0">
            <div
              class="articles_content"
              @click.stop="toStoreDetails(item)"
              v-for="(item, index) in searchList"
              :key="index"
            >
              <div class="articles_left_img">
                <img :src="item.image" alt />
                <div class="pos">
                  <div class="flash_sale" v-if="item.reduced_price > 0">
                    <div class="time_limit">
                      <div class="sale">
                        <span>限时特惠</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 右侧内容 -->
              <div class="articles_right_content">
                <div class="top_content clearfix">
                  <div class="content_details left">
                    <p class="three_text itemName">{{ item.name }}</p>
                    <div class="small_title_change">
                      <p
                        class="pl"
                        v-for="(item1, index1) in item.attr_text"
                        :key="index1"
                      >
                        {{ item1 }}
                      </p>
                    </div>
                  </div>
                  <div class="order_price left">
                    <div class="pt">
                      <span class="icon" v-if="item.price > 0">￥</span>
                      <span class="icon_money">{{
                        item.reduced_price == 0
                          ? item.price
                          : item.reduced_price
                      }}</span>
                    </div>
                    <del v-if="item.reduced_price > 0" class="dels">
                      <span class="hui_money">￥{{ item.price }}</span>
                    </del>
                  </div>
                </div>
                <div class="shopping" @click.stop="goShopCart(item)">
                  <img src="../../assets/order/addshop.png" alt />
                </div>
              </div>
            </div>
          </div>
          <div class="konging" v-else>
            <img
              src="../../assets/image/img404.png"
              v-if="it_cloose == true"
              alt
            />
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
  </div>
</template>

<script>
export default {
  name: "articles",
  data() {
    return {
      checkList: [], //已选择的价格
      empty: "",
      isActive_3: false,
      isActived_3: false,
      isActive_1: false,
      isActived_1: false,
      isActive_2: false,
      isActived_2: false,
      select_1: false, // 浏览量
      select_2: false,
      select_3: false,
      select_4: false,
      articles: [],
      classList: [], // 空数组
      dataList: [],
      className: [],
      ableChangecate: [],
      checkedAll: false, // 分类全选
      able: [], //当前选中的分类ID
      ableNum: 0, //所有分类长度
      lableAllList: [], //所有分类ID
      ableList: [], //分类所有数据
      isIndeterminate: true,
      checkAll: false,
      checkedClasses: [], // 选中班级
      searchList: [],
      categoryList: [],
      categoryChildList: [],
      priceList: [],
      total: 0,
      goods_id: "",
      it_cloose: false,
      reqParams: {
        page: 12,
        keyword: "", // 关键字搜索
        grade: "", // 年级id
        category: "", // 分类id
        price: "", //价格筛选
        view_num: "", //	浏览量排序 1=降序,2=升序
        createtime: "", //	上架时间排序 1=降序,2=升序
        price_type: "", // 价格排序 1=降序,2=升序
        type: "", //	教学进程表
        offset: 1, // 页数
      },
      caryList: [],
      tdList: {
        title1: {
          cn: "",
          en: "",
        },
        title2: {
          cn: "",
          en: "",
        },
        title3: {
          cn: "",
          en: "",
        },
        title4: {
          cn: "",
          en: "",
        },
      },
    };
  },
  created() {
    this.reqParams.keyword = this.$route.query.keyword || "";
    this.reqParams.grade = this.$route.query.grade || "";
    this.reqParams.category = this.$route.query.category || "";
    this.reqParams.price = this.$route.query.price || "";
    this.way = this.$route.query.way || "";
    this.getClassList();
    this.getCategory();
    this.getPriceList();
    this.getSearchList();
    this.getTitle();
  },
  watch: {
    $route(to, from) {
      // this.getData(this.$route.query.keyword)
      // this.getSearchList(this.$route.query.keyword)
      if (to.path == "/articles") {
        this.reqParams.keyword = this.$route.query.keyword;
        this.getSearchList();
      }
    },
  },
  methods: {
    async getData(keyword) {
      console.log(keyword);
      const {
        data: { data },
      } = await this.$http.post("api/index/goodsList", {
        keyword: keyword,
        offset: this.reqParams.offset,
        page: this.reqParams.page,
      });
      this.searchList = data.list;

      this.total = data.total;
      console.log(data);
    },
    itemMenu(items) {
      if (items.is_checked) {
        this.categoryChildList.push(items.name);
      }
      this.categoryChildList = JSON.parse(
        JSON.stringify(this.categoryChildList)
      );
    },
    checkeAllCate(vs) {
      // 分类全选
      this.reqParams.keyword = "";
      this.ableChangecate = [];
      var a = [];
      for (var i = 0; i < this.caryList.length; i++) {
        a.push(this.caryList[i].id);
      }
      this.able = vs ? a : [];
      for (var i = 0; i < this.caryList.length; i++) {
        for (var j = 0; j < this.able.length; j++) {
          if (this.caryList[i].id == this.able[j]) {
            this.ableChangecate.push(this.caryList[i]);
          }
        }
      }
      console.log(a);
      console.log(this.ableChangecate);
      this.reqParams.category = a.join(",");
      this.getSearchList();
    },
    cateChange(cate) {
      // 分类单选
      this.reqParams.keyword = "";
      var t = this,
        list = t.caryList,
        x = t.able.indexOf(cate.id),
        j = -1;
      t.ableChangecate.forEach((items, indes) => {
        if (items.id == cate.id) j = indes;
      });
      list.forEach((item, index) => {
        if (cate.id == item.id && x != -1) {
          t.ableChangecate.push(item);
          if (t.able.length == t.caryList.length) t.checkedAll = true;
        } else if (cate.id == item.id && x == -1) {
          t.ableChangecate.splice(j, 1);
          t.checkedAll = false;
        }
      });
      console.log(this.able);
      this.reqParams.category = this.able.join(",");
      this.getSearchList();
    },
    clickRemoveCate(cate) {
      // 已选分类删除
      // console.log(cate);
      this.ableChangecate.forEach((value, index) => {
        if (value.id == cate.id) {
          this.ableChangecate.splice(index, 1);
          this.ableChangecate = JSON.parse(JSON.stringify(this.ableChangecate));
        }
      });
      this.able.forEach((value, index) => {
        if (value == cate.id) {
          this.able.splice(index, 1);
          this.able = JSON.parse(JSON.stringify(this.able));
        }
      });
      if (this.classList.length != this.className.length) {
        this.checkedAll = false;
      } else {
        this.checkedAll = true;
      }
      this.reqParams.category = this.able.join(",");
      this.getSearchList();
    },
    handleCheckAllChange(v) {
      // 您已选择年级全选
      this.reqParams.keyword = "";
      this.className = [];
      var a = [];
      for (var i = 0; i < this.classList.length; i++) {
        a.push(this.classList[i].id);
      }
      this.checkedClasses = v ? a : [];
      for (var i = 0; i < this.classList.length; i++) {
        for (var j = 0; j < this.checkedClasses.length; j++) {
          if (this.classList[i].id == this.checkedClasses[j]) {
            this.className.push(this.classList[i]);
          }
        }
      }
      console.log(this.className);
      console.log(this.checkedClasses);
      if (this.checkedClasses.length == 0) {
        this.empty = 1;
      } else {
        this.empty = 0;
      }
      this.reqParams.grade = this.checkedClasses.join(",");
      this.getSearchList();
    },
    handleCheckedCitiesChange(va) {
      // 已选择班级单选
      this.reqParams.keyword = "";
      this.className = [];
      let checkedCount = va.length;
      this.checkAll = checkedCount === this.classList.length;
      for (var i = 0; i < this.classList.length; i++) {
        for (var j = 0; j < this.checkedClasses.length; j++) {
          if (this.classList[i].id == this.checkedClasses[j]) {
            this.className.push(this.classList[i]);
          }
        }
      }
      let Str = this.checkedClasses;
      this.reqParams.grade = Str.toString();
      this.getSearchList();
      console.log(this.checkedClasses);
    },
    clickRemove(itm) {
      // 点击已选年级删除
      this.className.forEach((value, index) => {
        if (value.id == itm.id) {
          this.className.splice(index, 1);
          this.className = JSON.parse(JSON.stringify(this.className));
        }
      });
      this.checkedClasses.forEach((value, index) => {
        if (value == itm.id) {
          this.checkedClasses.splice(index, 1);
          this.checkedClasses = JSON.parse(JSON.stringify(this.checkedClasses));
        }
      });
      if (this.caryList.length != this.className.length) {
        this.checkAll = false;
      } else {
        this.checkAll = true;
      }
      console.log(this.checkedClasses, "checkedClasses");
      let obj = this.checkedClasses;
      this.className = this.className;
      this.checkedClasses = this.checkedClasses;
      this.reqParams.grade = this.checkedClasses.join(",");
      console.log(this.className, "className");

      this.getSearchList();
    },
    priceChangeitem(idd) {
      // 价格选择
      this.reqParams.keyword = "";
      if (this.checkList.indexOf(idd.id) == -1) {
        this.checkList.push(idd.id);
        this.checkList = JSON.parse(JSON.stringify(this.checkList));
      } else {
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i] == idd.id) {
            this.checkList.splice(i, 1);
            this.checkList = JSON.parse(JSON.stringify(this.checkList));
          }
        }
      }
      this.reqParams.price = this.checkList.toString();
      this.getSearchList();
    },
    async getClassList() {
      // 班级列表
      let that = this;
      that.checkedClasses = [];
      let img = that.reqParams.grade;
      let obj = img.split(",");
      try {
        const {
          data: { data },
        } = await that.$http.post("api/sundry/getGrade");
        if (data.length > 0) {
          data.forEach((item, index) => {
            obj.forEach((item1) => {
              if (item1 == item.id) {
                this.checkedClasses.push(item.id);
                this.className.push(item);
                if (this.checkedClasses.length == data.length) {
                  that.checkAll = true;
                } else {
                  that.checkAll = false;
                }
              }
            });
          });
        }
        that.checkedClasses = that.checkedClasses;
        that.className = that.className;
        that.classList = data;
      } catch (err) {
        this.$message.error(err.data.msg);
      }
    },
    async getCategory() {
      // 分类列表
      this.ableChangecate = [];
      let cate = this.reqParams.category;
      let cated = [];
      if (this.way != 1) {
        cated = cate.split(",");
      }
      try {
        const {
          data: { data },
        } = await this.$http.post("api/sundry/getCategory");
        for (var i = 0; i < data.length; i++) {
          this.ableNum += data[i].child.length;
          for (var y = 0; y < data[i].child.length; y++) {
            this.lableAllList.push(data[i].child[y].id);
            this.ableList.push(data[i].child[y]);
            if (this.way != 1) {
              cated.forEach((items) => {
                if (items == data[i].child[y].id) {
                  this.ableChangecate.push(data[i].child[y]);
                  this.able.push(data[i].child[y].id);
                  if (this.ableChangecate.length == this.ableNum) {
                    this.checkedAll = true;
                  } else {
                    this.checkedAll = false;
                  }
                }
              });
            } else {
              if (data[i].child[y].id == cate) {
                this.ableChangecate.push(data[i].child[y]);
                this.able.push(data[i].child[y].id);
              }
            }
          }
        }
        this.categoryList = data;
        this.ableChangecate = this.ableChangecate;
        this.caryList = this.ableList;
        // console.log(this.ableChangecate, "ableChangecate");
      } catch (err) {
        this.$message.error(err.data.msg);
      }
    },
    async getPriceList() {
      // 价格列表
      let obj = this.reqParams.price;
      let ary = this.checkList;
      if (obj != "") {
        ary.push(obj);
      }
      try {
        const {
          data: { data },
        } = await this.$http.post("api/sundry/getPrice");
        if (data.length > 0) {
          data.forEach((item) => {
            if (item.id == obj) {
              item.isShow = true;
            } else {
              item.isShow = false;
            }
          });
        }
        this.checkList = ary;
        this.priceList = data;
        // console.log(this.checkList, "this.checkLList");
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg);
      }
    },
    async getTitle() {
      try {
        const {
          data: { data },
        } = await this.$http.post("api/sundry/getTitle");
        console.log(data);
        this.tdList = data;
      } catch (err) {
        console.log(err);
        this.$message.error(err.msg);
      }
    },
    pager(newPage) {
      // 分页函数
      this.reqParams.offset = newPage;
      this.getSearchList();
    },
    toStoreDetails(itm) {
      this.$router.push({
        path: "/loopcart",
        query: { goods_id: itm.id, type: itm.type },
      });
    },
    async goShopCart(item) {
      //  加入购物车
      let shopCart = JSON.parse(localStorage.getItem("shopCart"));
      let shopCartID = JSON.parse(localStorage.getItem("shopCartID"));
      let token = localStorage.getItem("koudaishangcheng-key");
      if (item.price != "免费") {
        if (token) {
          try {
            const { data } = await this.$http.post("api/sundry/addCar", {
              goods_id: item.id,
            });
            console.log(data);
            this.$message.success(data.msg);
          } catch (err) {
            this.$message.error("该商品已添加购物车");
          }
        } else {
          if (shopCartID) {
            if (shopCartID.indexOf(item.id) == -1) {
              shopCart.push(item);
              shopCartID.push(item.id);
              this.$message.success("已放入购物车");
            } else {
              this.$message.error("该商品已添加购物车");
            }
            console.log(shopCart);
            localStorage.setItem("shopCart", JSON.stringify(shopCart));
            localStorage.setItem("shopCartID", JSON.stringify(shopCartID));
          } else {
            let obj = [];
            let ary = [];
            obj.push(item);
            ary.push(item.id);
            localStorage.setItem("shopCart", JSON.stringify(obj));
            localStorage.setItem("shopCartID", JSON.stringify(ary));
            this.$message.success("已放入购物车");
          }
        }
      } else {
        this.$message.error("免费商品不支持加入购物车");
      }
    },
    async getSearchList() {
      console.log(this.reqParams.keyword, "keyword");
      let keyword = this.reqParams.keyword;
      let grade = this.reqParams.grade;
      let category = this.reqParams.category;
      let price = this.reqParams.price;
      let price_type = this.reqParams.price_type;
      let type = this.reqParams.type;
      let createtime = this.reqParams.createtime;
      let view_num = this.reqParams.view_num;
      try {
        const {
          data: { data },
        } = await this.$http.post("api/index/goodsList", this.reqParams);
        console.log(data);
        if (data.list.length == 0) {
          this.it_cloose = true;
        } else {
          this.it_cloose = false;
        }
        if (
          keyword == "" &&
          grade == "" &&
          category == "" &&
          price == "" &&
          price_type == "" &&
          type == "" &&
          createtime == "" &&
          view_num == ""
        ) {
          this.searchList = [];
        }
        if (data.total == 0) {
          this.searchList = [];
          this.$message.error("未查询到相关内容");
        } else {
          this.searchList = data.list;
          this.total = data.total;
        }
      } catch (err) {
        console.log(err);
        this.$message.error(err.msg);
      }
    },
    selliu() {
      // 浏览量
      this.select_2 = false;
      this.isActive_2 = false;
      this.isActived_2 = false;
      this.select_3 = false;
      this.isActive_3 = false;
      this.isActived_3 = false;
      this.select_4 = false;
      if (this.isActive_1) {
        this.select_1 = true;
        this.isActive_1 = false;
        this.isActived_1 = true;
        this.reqParams.view_num = 1;
      } else if (this.isActived_1) {
        this.select_1 = false;
        this.isActive_1 = false;
        this.isActived_1 = false;
        this.reqParams.view_num = "";
      } else {
        this.select_1 = true;
        this.isActived_1 = false;
        this.isActive_1 = true;
        this.reqParams.view_num = 2;
      }
      this.reqParams.createtime = "";
      this.reqParams.price_type = "";
      this.reqParams.type = "";
      this.getSearchList();
    },
    seltime() {
      // 上架时间
      this.select_1 = false;
      this.isActive_1 = false;
      this.isActived_1 = false;
      this.select_3 = false;
      this.isActive_3 = false;
      this.isActived_3 = false;
      this.select_4 = false;

      if (this.isActive_2) {
        this.select_2 = true;
        this.isActive_2 = false;
        this.isActived_2 = true;
        this.reqParams.createtime = 1;
        console.log("下");
      } else if (this.isActived_2) {
        this.select_2 = false;
        this.isActive_2 = false;
        this.isActived_2 = false;
        this.reqParams.createtime = "";
        console.log("中");
      } else {
        this.select_2 = true;
        this.isActived_2 = false;
        this.isActive_2 = true;
        this.reqParams.createtime = 2;
        console.log("上");
      }
      this.reqParams.view_num = "";
      this.reqParams.price_type = "";
      this.reqParams.type = "";
      this.getSearchList();
    },
    selprice() {
      // 价格
      this.select_2 = false;
      this.isActive_2 = false;
      this.isActived_2 = false;
      this.select_1 = false;
      this.isActive_1 = false;
      this.isActived_1 = false;
      this.select_4 = false;
      if (this.isActive_3) {
        this.select_3 = true;
        this.isActive_3 = false;
        this.isActived_3 = true;
        this.reqParams.price_type = 1;
      } else if (this.isActived_3) {
        this.select_3 = false;
        this.isActive_3 = false;
        this.isActived_3 = false;
        this.reqParams.price_type = "";
      } else {
        this.select_3 = true;
        this.isActive_3 = true;
        this.isActived_3 = false;
        this.reqParams.price_type = 2;
      }

      this.reqParams.createtime = "";
      this.reqParams.view_num = "";
      this.reqParams.type = "";
      this.showprice = !this.showprice;

      this.getSearchList();
    },
    seltable() {
      // 教学进程表
      this.select_1 = false;
      this.isActive_1 = false;
      this.isActived_1 = false;
      this.select_2 = false;
      this.isActive_2 = false;
      this.isActived_2 = false;
      this.select_3 = false;
      this.isActive_3 = false;
      this.isActived_3 = false;
      this.reqParams.createtime = "";
      this.reqParams.price_type = "";
      this.reqParams.view_num = "";
      if (this.select_4 == false) {
        this.select_4 = true;
        this.reqParams.type = 1;
      } else {
        this.select_4 = false;
        this.reqParams.type = "";
      }
      this.getSearchList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  //   第三部分
  .content {
    padding-bottom: 20px;
    margin-top: 40px;
    height: 100%;

    .w {
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      .left_text {
        width: 320px;
        // 已选择的
        .selected {
          margin-bottom: 20px;
          width: 320px;
          padding-bottom: 20px;
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
                display: -webkit-flex;
                display: -ms-flexbox;
                -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              // justify-content: center;
              align-items: center;
              .grade_list {
                min-width: 112px;
                height: 40px;
                margin: 7px;
                box-sizing: border-box;
                border: 1px solid #416fae;
                border-radius: 6px;
                padding: 0 20px;
                position: relative;
                p {
                  text-align: center;
                  font-size: 16px;
                  line-height: 40px;
                  color: #416fae;
                }
                .cancel {
                  position: absolute;
                  background-color: #416fae;
                  bottom: 0px;
                  right: 0;
                  width: 0;  
                  height: 0;
                  border-top: 12px solid #fff;
                  border-right: 12px solid #416fae;
                  border-bottom: 12px solid #416fae;
                  border-left: 12px solid #fff;
                  border-radius: 0 0 6px 0;

                  .cancel_1 {
                    color: #fff;
                    font-weight: bold;
                    line-height: 14px;
                    position: absolute;
                    font-size: 3px; 
                    top: -4px; 
                    left: 0px;
                    width: 12px;   
                    img{
                      width: 10px;
                      height: 10px;
                    }
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
          background-color: #fff;
          padding-bottom: 20px;
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
              right: 37px;
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
        flex:1;
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

        .shop_list {
          width: 100%;
          .articles_content {
            padding: 20px;
            box-sizing: border-box;
            margin: 10px 0;
            display: flex;
            background-color: #fff;

            .articles_left_img {
              width: 224px;
              height: 139px;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
              }
              .pos {
                position: absolute;
                top: 0;
                left: 0;
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
              }
            }
            .articles_right_content {
              flex: 1;
              position: relative;
              .top_content {
                display: flex;
                .content_details {
                  flex: 1;
                  padding-left: 20px;
                  .itemName {
                    font-size: 16px;
                    height: 65px;
                  }
                  .small_title_change {
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    height: 65px;
                    .pl {
                      color: #fff;
                      font-size: 14px;
                      text-align: center;
                      min-width: 50px;
                      margin: 3px 5px;
                      padding: 3px 10px;
                      box-sizing: border-box;
                      background-color: #2a5491;
                      border-radius: 4px;
                      height: 26px;
                    }
                  }
                }
                .order_price {
                  min-width: 120px;
                  padding-right: 20px;
                  height: 40px;
                  .pt {
                    display: flex;
                    align-items: baseline;
                    justify-content: flex-end;
                    .icon {
                      font-size: 22px;
                      color: #ff0000;
                    }
                    .icon_money {
                      color: #ff0000;
                      font-weight: bold;
                      font-size: 35px;
                    }
                  }
                  .dels {
                    display: flex;
                    align-items: baseline;
                    justify-content: flex-end;
                    .huiicon {
                      font-size: 8px;
                      color: #999999;
                    }
                    .hui_money {
                      color: #999999;
                      font-size: 14px;
                    }
                  }
                }
              }

              .shopping {
                position: absolute;
                bottom: 5px;
                right: 20px;
                width: 40px;
                height: 40px;
                border: 1px solid #416fae;
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
              }
            }
          }
        }
        .konging {
          width: 100%;
          padding-top: 100px;
          box-sizing: border-box;
          img {
            width: 100%;
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
}
</style>