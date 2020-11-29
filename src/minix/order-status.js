import api from '../api/order'
import { Dialog } from 'vant'
export default {
    data() {
        return {
            orderId: '',
            orderInfo: { getApiVo: {} }
        }
    },
    methods: {
        async getOrderInfo() {
            let res = await api.getOrder(this.orderId)
            this.orderInfo = res.result
        },

        confirm() {
            Dialog.confirm({
                    title: '提示',
                    message: '请确认收到货物',
                })
                .then(async() => {
                    // on confirm
                    let res = await api.confirmGoods(this.orderInfo.orderCode)
                    if (!res.success) return this.showToast(res.message)
                    this.showToast(res.result)
                    this.$router.replace({ path: '/orderList' })
                })
                .catch(() => {
                    // on cancel
                });
        }
    },
    created() {
        this.orderId = this.$route.query.orderId
        this.getOrderInfo()
    },
}