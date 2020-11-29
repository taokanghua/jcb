import req from '../utils/request'
import appid from '../web.config'
const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export default {
    auth: params => req.get(`/login/${appid.appid}/getJsapiSignature`, { params }),
    getGoodsList: data => req.post('/productInfo/homeList', data),
    getGoodsDetail: data => req.post('/productInfo/details', data),
    getJoinCode: params => req.get('/joinCode/sendCode', { params }),
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
    upgrade: data => req.post('/store/add', data),
    getUserInfo: () => req.get('member/loadMemberInfo'),
    getNewStore: () => req.get('store/listNewStore'),
    takeFirstCoupon: id => req.put('/member/updateFirstCoupon/' + id),
    getStoreType: () => req.get('store/level/options'), //集采/加盟
    getNotice: params => req.get('notice/get', { params }),
    getBanner: data => req.post('carousel/get', data),
    upload: data => req.post('oss/upload', data, config),
    getJoinState: openid => req.get('member/joinStatus/' + openid), //查看加盟状态
    getAgreement: type => req.get('/protocol/' + type),
    getSecBrand: params => req.get('productBrand/tags', {params})
}