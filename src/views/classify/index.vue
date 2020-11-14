<template>
  <div class="classify-wrap column">

    <!-- icon菜单栏 -->
    <div class="classify-list row">
      <!-- 一级筛选 -->
      <div class="classify-item" v-for="(item, i) in allList" :key="item.id" @click="changeOne(i)">
        <img :src="item.icon" alt="" />
        <span>{{item.name}}</span>
      </div>
      <!-- <div class="classify-item">
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
      </div> -->
    </div>

    <!-- 筛选区域 -->
    <div class="classify-area row">
      <div class="left-menu" :style="{height:leftHeight}">
        <!-- 二级筛选 -->
          <div
          class="menu-item-name row ac jc"
          :class="{ active: i == activeIndex }"
          v-for="(item, i) in second"
          :key="item.id"
          @click="changeMenu(i)">
          {{ item.name }}
        </div>
      </div>
      <!-- 文字筛选 -->
      <div class="right-content" ref="rightBox">
        <!-- 三级筛选 -->
        <div class="top-search row ac" v-show="isThrid" ref="lv3box">
          <span
            :class="{ 'active-text': thirdIdx==i }"
            v-for="(item, i) in third"
            :key="item.id"
            @click="changeThird(i)"
            >{{ item.name }}</span
          >
        </div>

        <!-- 条件筛选 -->
        <div class="search-wrap column" >
          <div class="prepar-wrap row sb ac" ref="filterBox">
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
            <div class="searched-goods" ref="resultBox" :style="`height:${dynamicHeight}px`">
          <list @load="loadMore">
              <div class="goods-card row" v-for="item in 8" :key="item">
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
          </list>
            </div>
        </div>
      </div>
    </div>

    <!-- 占位 -->
    <div class="useless"></div>

    <pop-up :show="isPop" position="right-center" @onModalClick="isPop=!isPop">
      <preparation-inner></preparation-inner>
    </pop-up>
    <myFooter></myFooter>
  </div>
</template>

<script>
import {list } from 'vant'
import api from '../../api/classify'
import myFooter from "../../components/common/my/footer";
import preparation from "../../components/common/my/preparation";
import popUp from '../../components/common/popUp'
import preparationInner from '../../components/common/my/preparation-inner'
export default {
  data() {
    return {
      activeIndex: 0, //二级选中idx
      thirdIdx:-1, //三级筛选 选中id
      fuck:0,
      isPop:false, //筛选pop弹框
      conditionIdx: 0, //条件筛选 选中idx
      salesCondition: 0,  //筛选状态 
      isThrid:true, //三级显示状态
      timer: null,

      //xin
      allList:[],
      second:[],
      third:[],
      scroll:null,
      leftHeight: 400,
      dynamicHeight:400
    };
  },
  methods: {
    changeOne(i){ //一级
      this.second = this.allList[i].children
      // 给二级复位
      this.changeMenu(0)
    },
    changeMenu(i) { //二级
      this.third = this.second[i].children
      this.activeIndex = i;
      this.isThrid = this.third.length>0
      // this.resizeCon()
    },
    changeThird(i){
      this.thirdIdx = i
    },
    loadMore(){
      if(!this.timer){
        this.timer = setTimeout(()=>{
          clearTimeout(this.timer)
            console.log('bo')
          }, 2000)
      }
    },
    changeCondition(i) { //切换筛选类型
      this.conditionIdx = i;
    },
    async getAllClassifyList(){
      let res = await api.getAllList()
      this.allList = res.result
      this.second = this.allList[0].children
      this.third = this.second.children||[]
      this.isThrid = this.third.length>0 //判断一开始有莫有三级
    },
    updateDynamicHeight(){ //动态计算 content高度
      let {  rightBox,lv3box,  filterBox } = this.$refs;
      let rh = rightBox.clientHeight;
      let fh = filterBox.clientHeight;
      let lv3h = lv3box.clientHeight;
      this.dynamicHeight=rh-fh-lv3h 
      this.leftHeight = rh
      console.log(rh,fh,lv3h)    
    }
  },
  created(){
    this.getAllClassifyList()
  },
  mounted() {
    // this.updateDynamicHeight()
    
  },
  watch: {
    salesCondition(n) {
      console.log(n);
    },
    isThrid(n){
    setTimeout(this.updateDynamicHeight,0)
    }
  },
  components: {
    myFooter,
    preparation,
    popUp,
    preparationInner,
    list
  },
};
</script>

<style lang="less" scoped>
.useless{
  width: 100%;
  min-height: 0.83rem;
  flex-shrink: 0;
}
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
  // padding-bottom: 0.83rem;
  flex-grow: 1;
  .active {
    background-color: #ffffff;
  }
  .active-text {
    color: #2ecb62;
  }
  .left-menu {
    width: 1.81rem;
    height: 9.4rem;
    // padding-bottom: 0.82rem;
    box-sizing: border-box;
    background-color: #f6f6f6;
    // flex-shrink: 0;
    // overflow: hidden;
    overflow: scroll;
    .menu-item-name {
      height: 0.68rem;
      // background-color: #ffffff;
      font-size: 0.21rem;
      color: #1a1a1a;
      text-align: center;
    }
  }
  .right-content {
    flex: 1;
    height: 100%;
    background-color: #ffffff;
    overflow: hidden;
    .top-search {
      // height: 0.75rem;
      line-height: 1;
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
      // flex: 1;
      // height: 80vh;
      // height: 75vh;
      // height: 1.28rem;
      // padding: 0 0.18rem;
      // padding-bottom: 0.83rem;
      overflow-y: scroll;
      flex-grow: 1;
      padding-bottom:.82rem;
      box-sizing: border-box;
      .goods-card {
        margin-top: 0.18rem;
        height: 1.28rem;
        // flex-shrink: 0;
        img {
          width: 1.24rem;
          height: 1.24rem;
          border-radius: 0.06rem;
          flex-shrink: 0;
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