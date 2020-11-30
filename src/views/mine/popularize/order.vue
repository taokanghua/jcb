<template>
    <div class="page">
        <div class="top">
            <div class="title">推广人数</div>
            <div class="count">{{$route.query.num||0}}</div>
        </div>

        <div class="tabs-list">
            <tabs
                v-model="active"
                swipeable
                animated
                color="#2ecb62"
                line-width="0.452rem"
                line-height="0.068rem"
            >
                <tab v-for="(item, index) in tabs" :key="index" :title="item">
                    <propleList :sourceType="active+1" />
                </tab>
            </tabs>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs, List, Toast } from "vant";
import propleList from "../component/opoilarize-order";
export default {
    data() {
        return {
            loading: false,
            finished: false,
            active: 0,
            tabs: ["店铺", "一级", "二级"],
        };
    },
    components: {
        Tab,
        Tabs,
        List,
        propleList
    },
};
</script>

<style lang="less" scoped>
.page {
    .top {
        background: url("../../../assets/img/推广中心人数-订单页面底图.png");
        background-size: cover;
        height: 1.808rem;
        background-color: #2ecb62;
        padding-left: 0.2rem;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 0.226rem;
        .title {
            font-size: 0.203rem;
        }
        .count {
            font-size: 0.407rem;
            margin-top: 0.1rem;
        }
    }
    .tabs-list {
        background-color: #ffffff;
        /deep/ .van-tab--active {
            font-weight: bold;
        }
        /deep/ .van-tab__pane-wrapper {
            min-height: 80vh;
        }
    }
}
</style>