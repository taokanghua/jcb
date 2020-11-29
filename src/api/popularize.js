import req from '../utils/request'

export default {
    getPD: params => req.get('popularize/statistics', {params})
}