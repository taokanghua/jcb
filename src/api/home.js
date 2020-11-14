import req from '../utils/request'

export default {
    getGoodsList: data => req.post('/productInfo/homeList', data),
    getGoodsDetail: params => req.get('/productInfo/details', { params }),
    createOrder: data => req.post('/order', data),
    getOrder: params => req.get('order/queryByIds', { params }),
    searchEntries: params => req.get('/memberEsQuery/searchByEntries', { params }),
    searchGoods: data => req.post('/memberEsQuery/screenProduct', data),
    searchStore: data => req.post('/memberEsQuery/screenStore', data),
    getAllBrand: params => req.get('productBrand/list', { params }),
    getRecomBrand: params => req.get('productBrand/recommend', {params}),
    geographic: params => req.get('geographic/options', { params }),
    upgrade: data => req.post('/store', data)
}