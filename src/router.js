import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [{
            path: '/',
            component: () =>
                import ('./components/common/withBottomNav.vue'),
            children: [{
                    path: '/',
                    meta: { title: '首页' },
                    component: () =>
                        import ('./views/home/index.vue')
                },
                {
                    path: '/kinds',
                    meta: { title: '分类' },
                    component: () =>
                        import ('./views/kinds/index.vue')
                }, {
                    path: '/shoppingCar',
                    meta: { title: '购物车' },
                    component: () =>
                        import ('./views/shoppingCar/index.vue')
                },
               
                {
                    path: '/mine',
                    meta: { title: '我的' },
                    component: () =>
                        import ('./views/mine/index.vue')
                }
            ]
        },
        //新页面在这开始加
        // {
        //     path: '/new-course/:type?',
        //     meta: { title: '最新课程' },
        //     component: () =>
        //         import ('./views/course/new-course.vue')
        // }, 
    ]
})