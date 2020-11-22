import req from '../utils/request'

export default {
  orderList: params =>req.get('order/list', {params})
}