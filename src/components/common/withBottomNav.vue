<template>
    <div class="playground">
        <transition name="slide">
            <div class="base_height smooth" :class="{[direction]:true} ">
                <transition name="slide">
                    <router-view />
                </transition>
                <footer-nav />
            </div>
        </transition>
    </div>
</template>

<script>
import footerNav from "./footer.vue";
export default {
    data() {
        return {
            menus: {
                "/": 1,
                "/mall": 2,
                "/appointment": 3,
                "/mine": 4
            },
            direction: "toLeft"
        };
    },
    components: {
        footerNav
    },
    watch: {
        $route({ path }, old) {
            let index = this.menus[path];

            if (!index) return (this.direction = "toRight");
            let before = this.menus[old.path];
            if (!before) return (this.direction = "toLeft");
            this.direction = before > index ? "toLeft" : "toRight";
        }
    }
};
</script>
<style scoped>
.base_height {
    position: relative;
    /* height: 100%;
  overflow-y: scroll; */
}

.playground > div > div:not(.footer) {
    /* width: 100%; */
    max-width: 100%;
}
.toLeft > .slide-leave-active {
    transform: translateX(100%) !important;
}
.toRight > .slide-enter {
    transform: translateX(100%) !important;
}
.toRight > .slide-leave-to {
    transform: translateX(-100%) !important;
}
</style>