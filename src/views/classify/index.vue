<template>
  <div class="classify-wrap column">
    <div class="top row ac jc">
      <input
        type="text"
        class="search"
        placeholder="请输入商品名称或店铺名称搜索"
      />
    </div>
    <!-- icon菜单栏 -->
    <div class="classify-list row">
      <div class="classify-item">
        <img src="../../assets/img/分类图标/电动工具.png" alt="" />
        <span>电动工具</span>
      </div>
      <div class="classify-item">
        <img src="../../assets/img/分类图标/电线电缆.png" alt="" />
        <span>电动工具</span>
      </div>
      <div class="classify-item">
        <img src="../../assets/img/分类图标/装饰材料.png" alt="" />
        <span>电动工具</span>
      </div>
      <div class="classify-item">
        <img src="../../assets/img/分类图标/工具配件.png" alt="" />
        <span>电动工具</span>
      </div>
      <div class="classify-item">
        <img src="../../assets/img/分类图标/电工电器_1.png" alt="" />
        <span>电动工具</span>
      </div>
      <div class="classify-item">
        <img src="../../assets/img/分类图标/焊割工具.png" alt="" />
        <span>电动工具</span>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="classify-area row">
      <div class="left-menu">
        <div
          class="menu-item-name row ac jc"
          :class="{ active: i == activeIndex }"
          v-for="(item, i) in menuList"
          :key="item"
          @click="changeMenu(i)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 文字筛选 -->
      <div class="right-content" ref="contentBox">
        <div class="top-search row">
          <span
            :class="{ 'active-text': activeIndex == i }"
            v-for="(item, i) in menuList"
            :key="item"
            @click="activeIndex = i"
            >{{ item }}</span
          >
        </div>

        <!-- 条件筛选 -->
        <div class="search-wrap column" ref="searchBox">
          <div class="prepar-wrap row sb ac">
            <div class="row left sb">
              <span
                :class="{ 'active-text': conditionIdx == 0 }"
                @click="changeCondition(0)"
                >综合</span
              >
              <span
                :class="{ 'active-text': conditionIdx == 1 }"
                @click="changeCondition(1)"
                >销量</span
              >
              <span
                class="row ac"
                :class="{ 'active-text': conditionIdx == 2 }"
                @click="changeCondition(2)"
              >
                价格
                <preparation :status.sync="salesCondition"></preparation>
              </span>
            </div>
            <div class="row right" @click="isPop=true">
              <i class="iconfont iconshaixuan"></i> 筛选
            </div>
          </div>

          <!-- 筛选出来的商品 -->
          <div class="searched-goods">
            <div class="goods-card row" v-for="item in fuck" :key="item">
              <img src="../../assets/img/分类220x220.png" alt="" />
              <div class="right-info column sb">
                <span class="name e2"
                  >得力(deli) 10.8V无线单锂电电钻18+1电钻……</span
                >
                <div class="price row">
                  <div class="now">￥199</div>
                  <div class="old">￥200</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <pop-up :show="isPop" position="right-center" @onModalClick="isPop=!isPop">
      <div style="background-color:#fff; width:80%;margin-left:auto;height:100vh">1231231</div>
    </pop-up>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myFooter from "../../components/common/my/footer";
import preparation from "../../components/common/my/preparation";
import popUp from '../../components/common/popUp'
export default {
  data() {
    return {
      activeIndex: 0,
      results: [],
      fuck:0,
      isPop:false,
      menuList: [
        "电钻工具",
        "电锯工具",
        "测绘工具",
        "打磨工具",
        "电焊机",
        "电动工具附件",
        "包装工具",
      ],
      conditionIdx: 0, //条件筛选
      salesCondition: 0,
    };
  },
  methods: {
    changeMenu(i) {
      this.activeIndex = i;
    },
    changeCondition(i) {
      this.conditionIdx = i;
    },
  },
  mounted() {
    let { contentBox: cbox, searchBox: sbox } = this.$refs;
    let ph = cbox.clientHeight;
    let ch = cbox.children[0].clientHeight;
    let sh = sbox.children[0].clientHeight;
    let ssh = ph - ch - sh;
    sbox.children[1].style.height = ssh + "px";
    // 测试专用
    setTimeout(()=>{
      this.fuck = 8
    })
  },
  watch: {
    salesCondition(n) {
      console.log(n);
    },
  },
  components: {
    myFooter,
    preparation,
    popUp
  },
};
</script>

<style lang="less" scoped>
.classify-wrap {
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  .top {
    padding: 0.12rem 0.27rem;
    .search {
      height: 0.51rem;
      background-color: #f6f6f6;
      border-radius: 0.25rem;
      padding-left: 0.12rem;
      font-size: 0.18rem;
      color: #bbbbbb;
    }
  }
}
.classify-list {
  padding: 0.23rem 0.3rem;
  // flex: 1;
  overflow: auto;
  flex-shrink: 0;
  .classify-item {
    flex-shrink: 0;
    margin-right: 0.45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 0.72rem;
      height: 0.72rem;
    }
    span {
      color: #1a1a1a;
      font-size: 0.2rem;
      margin-top: 0.11rem;
    }
  }
}
.classify-area {
  // background-color: red;
  padding-bottom: 0.83rem;
  flex-grow: 1;
  .active {
    background-color: #ffffff;
  }
  .active-text {
    color: #2ecb62;
  }
  .left-menu {
    width: 1.81rem;
    height: 100%;
    background-color: #f6f6f6;
    flex-shrink: 0;
    .menu-item-name {
      height: 0.68rem;
      // background-color: #ffffff;
      font-size: 0.21rem;
      color: #1a1a1a;
    }
  }
  .right-content {
    height: 100%;
    background-color: #ffffff;
    overflow: hidden;
    .top-search {
      // height: 0.75rem;
      padding: 0.26rem 0.18rem;
      overflow: auto;
      span {
        box-sizing: border-box;
        font-size: 0.21rem;
        // color: #2ecb62;
        flex-shrink: 0;
        margin-right: 0.42rem;
      }
    }
    .search-wrap {
      box-sizing: border-box;
      padding: 0 0.27rem;
      // height:calc(100% - 5.84vh);
      .prepar-wrap {
        padding: 0 0.16rem;
        height: 0.68rem;
        background-color: #f6f6f6;
        border-radius: 0.06rem;
        font-size: 0.21rem;
        color: #1a1a1a;
        line-height: 1;
        .left {
          flex: 3;
        }
        .right {
          flex: 2;
          justify-content: flex-end;
          i {
            font-size: 0.19rem;
            margin-right: 0.01rem;
          }
        }
      }
    }
    .searched-goods {
      // height: 1.28rem;
      // padding: 0 0.18rem;
      // padding-bottom: 0.83rem;
      overflow-y: scroll;
      flex-grow: 1;
      // padding-bottom:.82rem;
      .goods-card {
        margin-top: 0.18rem;
        height: 1.28rem;
        // flex-shrink: 0;
        img {
          width: 1.24rem;
          height: 1.24rem;
          border-radius: 0.06rem;
        }
        .right-info {
          margin-left: 0.17rem;
          .name {
            color: #1a1a1a;
            font-size: 0.24rem;
          }
          .price {
            align-items: flex-end;
            line-height: 1;
            .now {
              font-size: 0.31rem;
              color: #fc0808;
            }
            .old {
              font-size: 0.18rem;
              color: #a8a8a8;
              margin-left: 0.05rem;
              text-decoration:line-through;
            }
          }
        }
      }
    }
  }
}
</style>