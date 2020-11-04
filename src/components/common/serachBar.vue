<template>
    <div class="index_search">
        <img src="../../assets/images/logo.png" class="logo" @click="$router.push('/')" />
        <div class="search_box">
            <input type="text" class="search_input" v-model="searchText" @keyup.enter="onSearch" />
            <i class="iconfont iconsousuo" @click="onSearch"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: ["type"], //type==1时为讲师搜索
    data() {
        return {
            searchText: "",
        };
    },
    methods: {
        onSearch() {
            if (!this.searchText) return;
            if (this.type) {
                this.$router.push(`/lecturer/list/${this.searchText}`);
            } else {
                this.$router.push(`/list/${this.searchText}`);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.index_search {
    background: #ffffff;
    padding: 0.22rem 0.2rem;
    position: relative;
    display: flex;
    align-items: center;
    .logo {
        width: 0.92rem;
        height: 0.68rem;
        margin-right: 0.15rem;
    }
    .search_box {
        flex: 1;
        display: flex;
        height: 0.66rem;
        align-items: center;
        font-size: 0.28rem;
        .search_input {
            flex: 1;
            height: 0.51rem;
            background-color: #f6f6f6;
            border-radius: 0.25rem;
            padding: 0 0.7rem 0 0.3rem;
            font-size: 0.25rem;
        }
        .iconsousuo {
            color: #d5d5d5;
            font-size: 0.33rem;
            position: absolute;
            right: 0.5rem;
            bottom: 0.38rem;
        }
        .search_input::-webkit-input-placeholder,
        .search_input::-moz-placeholder,
        .search_input:-moz-placeholder,
        .search_input:-ms-input-placeholder {
            color: #b8b8b8;
            font-size: 0.3rem;
        }
        .search_btn {
            color: var(--primary);
            margin-left: 0.35rem;
        }
    }
}
</style>

