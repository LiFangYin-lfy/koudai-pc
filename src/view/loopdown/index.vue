<template>
  <div class="assets-search height-all">
    <div class="search-layout">
      <div class="search-title">让数据触手可及</div>
      <div class="search-input-layout">
        <!--<el-input class="search-input" placeholder="检索数据"
             @keyup.enter.native="searchAssets($event)"
             v-model="searchContent">
          <el-button style="color: white"
                @click="searchAssets(searchContent)"
                slot="append">搜 索</el-button>
        </el-input>-->
        <el-autocomplete
          class="inline-input search-input"
          v-model="searchContent"
          ref="autocomplete"
          :fetch-suggestions="requestDoSuggest"
          placeholder="请输入您需要检索资源名称或者中文"
          @keyup.enter.native="searchAssets($event)"
          :trigger-on-focus="false"
          @select="handleSelect"
        >
          <el-button @click="searchAssets" slot="append">搜 索</el-button>
        </el-autocomplete>
        <div class="search-word-layout" v-show="searchWordList.length">
          <span class="search-word-title">热门搜索：</span>
          <div class="search-word-list">
            <span
              class="search-word"
              v-for="(item, index) in searchWordList"
              @click="clickHotWord(item)"
              :key="index"
            >{{item}}</span>
          </div>
        </div>
      </div>
      <el-button v-if="false" class="db-number-layout">{{`资产库：${ddNumber}`}}</el-button>
    </div>

    <div v-for="(item, index) in list" :key="index">
      <div class="list leftFloat" v-if="item.type == 1">
        <div class="touxiang"></div>
        <div class="content">{{item.content}}</div>
      </div>

      <div class="list rightFloat" v-if="item.type == 2">
        <div class="content">{{item.content}}</div>
        <div class="touxiang"></div>
      </div>
    </div>

    <div>
      <input type="text" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "search",
  created() {
    this.requestHotWord();
  },
  data() {
    return {
      searchContent: '',
      ddNumber: 3445,
      searchWordList: [],
      hotWordSize: 5,



















    }
  },
  methods: {
















    // ...mapActions(['_AJAX']),
    /**
     * 点击热词搜索
     */
    clickHotWord(item) {
      this.searchContent = item;
      this.searchAssets();
    },
    /**
     * 跳转到搜索结果页面
     */
    searchAssets(event) {
      if (event) {
        event.target.blur();
        this.$refs.autocomplete.close();
      }
      // let viewRoute = this.$router.resolve({
      //   path: '/assets/searchResult',
      //   query: {
      //     searchContent: this.searchContent,
      //   }
      // });
      window.open(viewRoute.href, '_blank');
    },
    /**
     * 自动补全
     */
    requestDoSuggest(queryString, cb) {
      let params = {
        url: 'esSearch.doSuggest',
        data: {
          input: queryString,
          size: 4,
        },
        method: 'GET'
      };
      this._AJAX(params)
        .then(res => {
          let list = res.result.map((item) => {
            return { value: item }
          })
          cb(list);
        })
    },
    async requestDoSuggest1() {
      const {
        data: { data }
      } = await this.$http.post("api/index/goodsList", this.reqParams);
      this.searchList = data.list || {};
      if (this.searchList.length > 0) {
        this.$emit("result", this.searchList);
      } else {
        this.$message.error("未查询到内容");
      }
    },
    /**
     * 选择联想出来的数据
     */
    handleSelect(item) {
      this.searchContent = item.value;
      this.searchAssets();
    },
    /**
     * 请求热词列表
     */
    requestHotWord() {
      let params = {
        url: '',
        data: {
          size: this.hotWordSize,
        },
        method: 'GET'
      };
      this._AJAX(params)
        .then(res => {
          this.searchWordList = res.result;
        })
    }
  },
}
</script>
<style lang="less" scoped>
.assets-search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #6ba9ec;
  .search-layout {
    text-align: center;
    .search-title {
      font-size: 50px;
      color: white;
      font-weight: bold;
      padding-bottom: 40px;
    }
    .search-input-layout {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .search-input {
        width: 50%;
      }
      .search-word-layout {
        text-align: left;
        width: 50%;
        padding: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .search-word-title {
          font-size: 15px;
          color: white;
        }
        .search-word-list {
          span:hover {
            color: #666666;
          }
        }
        .search-word {
          font-size: 15px;
          color: white;
          padding-right: 10px;
          cursor: pointer;
        }
      }
    }
    .db-number-layout {
      margin-top: 80px;
    }
  }
  .el-input-group--append .el-input__inner {
    border-radius: 0;
    height: 48px;
    line-height: 48px;
  }
  .el-input-group__append {
    // background: $color-assist;
    // border-color: $color-assist;
    border-radius: 0;
    color: white;
  }
}
</style>