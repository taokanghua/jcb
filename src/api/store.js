import req from '../utils/request'

export default {
    getStoreDetail: data => req.post('store/details', data),
    getStoreGoods: data => req.post('memberEsQuery/searchProductByStore', data)
}