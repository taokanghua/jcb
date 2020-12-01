import req from '../utils/request'

export default {
    orderList: params => req.get('order/list', { params }),
    getOrder: id => req.get('/order/' + id),
    cancelOrder: data => req.post('/order/cancel?orderId=' + data.orderId, data),
    applyRefund: data => req.post('/order/return', data),
    confirmGoods: orderId => req.post('order/confirmOrder/' + orderId),
    cancelRefund: data => req.post('order/CloseRefunded', data),
    pay: id => req.post('order/payContinue/'+id)
}