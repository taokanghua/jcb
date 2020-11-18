import req from '../utils/request'

export default {
    getList: params => req.get('shopCartApi/getByMemberId', {params})
}