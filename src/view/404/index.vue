<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>

    <!-- 404部分 -->
    <div class="nofound">
      <div class="w">
        <div class="nopage clearfix">
          <div class="nofound_img left">
            <img src="../../assets/image/img_404.png" alt width="650px" />
          </div>
          <div class="nofound_txt left">
            <h3>呀，这个页面找不到了...</h3>
            <p>可能有外星人劫持信号哦，快打开窗户看看！</p>
            <div class="forward">
              <a @click="gohome">返回首页</a>
              <a @click="goTotopPage">返回上一页</a>
            </div>
            <div class="reason">
              <p>没找到您要的访问的网页，原因可能如下：</p>
              <ul>
                <li>
                  <span></span>
                  <span>可能网速太慢，或网络中断</span>
                </li>
                <li>
                  <span></span>可能页面已被删除
                </li>
                <li>
                  <span></span>这个网页太受欢迎，太多人在访问
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  // 404页面
  name: 'nofound',
  methods: {
    goTotopPage() {
      this.$router.back(-1)
    },
    gohome() {
      this.$router.push('/')
    }

  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  background-color: #fbf8fb;
  height: 900px;

  .top {
    height: 32px;
    background-color: #416fae;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .w {
      .nav {
        height: 20px;
        line-height: 20px;
        float: right;
        ul {
          height: 20px;
          li {
            float: left;
            a {
              color: #fff;
            }
            span {
              color: #fff;
              margin: 0 10px;
            }
          }
        }
      }
    }
  }
  .logo_search {
    height: 120px;
    background-color: #fff;

    .w {
      height: 120px;
      display: flex;
      align-items: center;
      .logo {
        width: 218px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .box {
          img {
            width: 100%;
          }
        }
        .logo_p {
          width: 102px;
          height: 48px;
          margin-top: 30px;
          margin-left: -8px;

          p {
            color: #416fae;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
      .search_shop {
        margin-left: 220px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .search {
          width: 602px;
          display: flex;
          .search_input {
            border: 1px solid #416fae;
            display: flex;
            justify-content: flex-start;
            position: relative;
            .el-icon-search {
              position: absolute;
              left: 16px;
              top: 18px;
            }
            input:nth-child(2) {
              text-indent: 30px;
              width: 488px;
              height: 44px;
              line-height: 44px;
              color: #ccc;
              font-size: 20px;
              border: none;
            }
            input:nth-child(3) {
              float: left;
              width: 104px;
              background-color: #416fae;
              border: none;
              color: #fff;
              font-size: 18px;
            }
          }
        }
      }
      .shopping_cart {
        display: flex;
        right: -5px;
        width: 144px;
        height: 44px;
        background-color: #416fae;
        border: 1px solid #416fae;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        a {
          color: #fff;
          font-size: 19px;
          padding-left: 10px;
        }
        span {
          display: block;
          border: 1px solid #ccc;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 50%;
          background-color: red;
          color: #fff;
          position: absolute;
          right: -10px;
          top: -10px;
        }
      }
    }
  }
  //   404区域
  .nofound {
    margin-top: 30px;
    .w {
      background: #fff;
      height: 500px;
      text-shadow: 5px 5px 5px #ccc;
      .nopage {
        .nofound_img {
          padding: 60px;
          width: 500px;
          height: 400px;
          img {
            width: 100%;
          }
        }
        .nofound_txt {
          padding: 60px;
          box-sizing: border-box;
          h3 {
            margin-top: 50px;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            height: 46px;
            line-height: 46px;
            color: #2c2c2c;
          }
          p {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: #999999;
          }
          .forward {
            margin: 40px 0;
            a {
              border-bottom: 1px solid #416fae;
              padding: 5px 0;
              margin-right: 20px;
            }
          }
          .reason {
            p {
              font-size: 16px;
              color: #2c2c2c;
              height: 30px;
              line-height: 30px;
            }
            ul {
              li {
                height: 30px;
                line-height: 30px;
                color: #999999;
                span {
                  display: block;
                  float: left;
                }
                span:nth-child(1) {
                  width: 4px;
                  height: 4px;
                  background-color: #416fae;
                  margin: 14px 6px 0;
                }
                span:nth-child(2) {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
  //尾部
  .footer {
    margin-top: 30px;
    .w {
      .photos {
        // height: 108x;
        .small_box {
          display: flex;
          flex-direction: row;
          justify-content: center;

          .foot {
            margin: 0 -15px;
            width: 180px;
            height: 108px;
            line-height: 108px;

            a {
              width: 136px;
              margin-top: 16px;
              margin-left: 15px;
              display: block;
              height: 62px;
              line-height: 62px;
              text-align: center;
              background-color: #fff;
              border: 1px #ccc solid;
              span {
                padding-left: 5px;
                color: black;
                font-weight: bold;
                font-size: 15px;
              }
            }
          }
        }
      }
      .record {
        margin-top: 10px;
        p {
          color: #5d5d5d;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>