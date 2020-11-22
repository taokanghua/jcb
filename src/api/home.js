import req from '../utils/request'
const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export default {
    getGoodsList: data => req.post('/productInfo/homeList', data),
    getGoodsDetail: data => req.post('/productInfo/details', data),
    createOrder: data => req.post('/order/add', data),
    getDeliveryPrice: data => req.post('order/countAmount', data),
    payment: data => req.post('/order/payServiceApi', data),
    getOrder: params => req.get('order/queryByIds', { params }),
    searchEntries: params => req.get('/memberEsQuery/searchByEntries', { params }),
    searchGoods: data => req.post('/memberEsQuery/screenProduct', data),
    searchStore: data => req.post('/memberEsQuery/screenStore', data),
    getAllBrand: params => req.get('productBrand/list', { params }),
    getRecomBrand: params => req.get('productBrand/recommend', { params }),
    geographic: params => req.get('geographic/options', { params }),
    upgrade: data => req.post('/store', data),
    getUserInfo: () => req.get('member/loadMemberInfo'),
    getNewStore: () => req.get('store/listNewStore'),
    takeFirstCoupon: id => req.put('/member/updateFirstCoupon/' + id),
    getStoreType: () => req.get('store/level/options'), //集采/加盟
    getNotice: params => req.get('notice/get', { params }),
    getBanner: data => req.post('carousel/get', data),
    upload: data => req.post('oss/upload', data, config)
}