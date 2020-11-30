import req from '../utils/request'

export default {
    //getPD: params => req.get('popularize/statistics', { params }),
    getCollectList: data => req.post('/memberSubApi/listCollectCommodity', data),
    getMemberSourceList: (params) => req.get('/popularize/memberSourceList', { params }), // 推广人列表
    getOrderSourceList: (params) => req.get('/popularize/orderSourceList', { params }), // 推广订单列表
    getPopularize: id => req.get('/popularize/statistics?memberId=' + id),
    getPrifitList: params => req.get('/popularize/amountList', { params }), // 推广收益列表
}