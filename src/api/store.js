import req from '../utils/request'

export default {
    getStoreDetail: data => req.post('store/details', data),
    getStoreGoods: data => req.post('memberEsQuery/searchProductByStore', data),
    addShopcart: data => req.post('shopCartApi/addCartCom', data),
    collectStore: params => req.get('memberSubApi/collectionCommodity', {params})
}