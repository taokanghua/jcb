import req from '../utils/request'

export default {
    getAllList: () => req.get('/productClassify/allList'),
    getGoods: data => req.post('productClassify/prolistById', data)
}