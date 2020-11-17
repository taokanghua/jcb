import req from '../utils/request'
export default {
    /**根据已有的token 获取用户信息 */
    // getUserByToken: () => req.get('user'),

    getAddressList: params => req.get('member/address/list', { params }),
    addAddress: data => req.post('member/address/add', data),
    setDefault: data => req.put('member/address/defaultUse', data),
    getOneAddress: id => req.get('member/address/' + id),
    editAddress: data => req.put('member/address/' + data.id, data),
    deleteAddress: params => req.delete('member/address/deleteBatch', {params})
        //getOrderList:()=>req.get('')
}