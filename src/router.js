import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [
        // {
        //     path: '/',
        //     component: () =>
        //         import ('./components/common/withBottomNav.vue'),
        // children: [
        //     {
        //             path: '/',
        //             meta: { title: '首页' },
        //             component: () =>
        //                 import ('./views/home/index.vue')
        //         },
        //         {
        //             path: '/kinds',
        //             meta: { title: '分类' },
        //             component: () =>
        //                 import ('./views/kinds/index.vue')
        //         }, {
        //             path: '/shoppingCar',
        //             meta: { title: '购物车' },
        //             component: () =>
        //                 import ('./views/shoppingCar/index.vue')
        //         },

        //         {
        //             path: '/mine',
        //             meta: { title: '我的' },
        //             component: () =>
        //                 import ('./views/mine/index.vue')
        //         }
        //     ]
        // },
        //新页面在这开始加
        // {
        //     path: '/new-course/:type?',
        //     meta: { title: '最新课程' },
        //     component: () =>
        //         import ('./views/course/new-course.vue')
        // }, 
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            meta: { title: '登录' },
            component: () => import('@/views/login/loginIn')
        },
        {
            path: '/forget',
            name: 'forget',
            meta: { title: '忘记密码' },
            component: () => import('@/views/login/forget')
        },
        {
            path: '/setPassword',
            name: 'setPassword',
            meta: { title: '忘记密码' },
            component: () => import('@/views/login/setPassword')
        },
        {
            path: '/register',
            name: 'register',
            meta: { title: '注册' },
            component: ()=>import('@/views/login/register')
        },
        {
            path: '/home',
            name: 'home',
            meta: {title:'金材宝商城'},
            component: ()=>import('@/views/home/index')
        },
        {
            path: '/classify',
            name: 'classify',
            meta: { title: '' },
            component: () => import('@/views/classify/index')
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            meta: { title: '购物车' },
            component: () => import('@/views/shopcart/index')
        },
        {
            path: '/mine',
            name: 'mine',
            meta: { title: '个人中心' },
            component: ()=>import('@/views/mine/index')
        },
        {
            path: '/mall',
            name: 'mall',
            meta: { title: '金材宝商城' },
            component: ()=>import('@/views/home/mall')
        },
        {
            path: '/brandzone',
            name: 'brandzone',
            meta: { title: '品牌专区' },
            component: ()=>import('@/views/home/brand-zone')
        },
        {
            path: '/allstores',
            name: 'allstores',
            meta: { title: '全部店铺' },
            component: ()=>import('@/views/home/all-stores')
        },
        {
            path: '/search',
            name: 'search',
            meta: { title: '搜索' },
            component: ()=>import('@/views/home/search-page')
        },
        {
            path: '/store',
            name: 'store',
            meta: { title: '金材宝商城' },
            component: () => import('@/views/store/index')
        },
        {
            path: '/goodsdetail',
            name: '/goodsdetail',
            meta: { title: '商品详情' },
            component:()=>import('@/views/store/goods-detail')
        },
        {
            path: '/evaluate',
            name: 'evaluate',
            meta: { title: '用户评价' },
            component:()=>import('@/views/store/evaluate')
        },
        {
            path: '/confirmorder',
            name: 'confirmorder',
            meta: { title: '确认订单' },
            component:()=>import('@/views/order/confirm-order')

        },
        {
            path: '/address',
            name: 'address',
            meta: { title: '管理地址' },
            component:()=>import('@/views/mine/address')
        },
        {
            path: '/editaddress',
            name: 'editaddress',
            meta: { title: '编辑地址' },
            component:()=>import('@/views/mine/address/modify')
        },
        {
            path: '/chooseAddress',
            name: 'chooseAddress',
            meta: { title: '选择收货地址' },
            component:()=>import('@/views/home/location/choose-address')
        },
        {
            path: '/chooseCity',
            name: 'chooseCity',
            meta: { title: '选择城市' },
            component:()=>import('@/views/home/location/choose-city')
        },
        {
            path: '/editInfo',
            name: 'editInfo',
            meta: { title: '编辑信息' },
            component:()=>import('@/views/mine/edit-info')
        }
    ],
    linkActiveClass:'tabbar-active'
})