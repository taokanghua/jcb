import req from '../utils/request'

export default {
  getGoodsList:params=>req.get('/productInfo/homeList', {params})
}