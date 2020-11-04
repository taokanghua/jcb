import request from './request'
import wxconfig from './wx.config'
import wx from 'weixin-js-sdk';
import webConfig from '../web.config'
// import store from '../store';


const domain = location.origin; //用于分享

const firstUrl = location.href.split('#')[0]
const GetWXConfig = () => request.get(`/wechat/getWxConfig`, { params: { url: firstUrl } })
const defaultShare = { targetUrl: '', imgUrl: webConfig.domain + '/upload/image/202091178562234.png', title: '城大陆和学院', desc: '城大陆和学院师资的培训经历是包括国家认可的相关证书、城大陆和学院培训合格证书。' }
    /** 注入微信配置 */
export const initWxConfig = async function(entity) {
    let res = await GetWXConfig()
    if (!res.success) return console.error(res.msg)
    wxconfig(res.result, wx)
    wx.ready(function() {
        // wx.getLocation({
        //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //     success: function(res) {
        //         localStorage.setItem('location', JSON.stringify(res))
        //         store.commit('home/LOCATION_DATA', res);
        //         store.dispatch('home/getStore');
        //     },
        //     cancel: function(res) {
        //         console.error('getLocation-cancel', res)
        //     },
        //     fail: function(res) {
        //         localStorage.setItem('location', JSON.stringify({ latitude: 135, longitude: 246 }))
        //         store.commit('home/LOCATION_DATA', { latitude: 135, longitude: 246 });
        //         console.error('getLocation-fail', res)
        //     }
        // })
        initShareConfig(entity);
    })
}

/** 初始化 微信分享
 * @param {Object} e 
 * @param {string} e.title 分享标题
 * @param {string} e.desc 分享描述
 * @param {string} e.link 分享链接
 * @param {string} e.imgUrl 分享图标
 * @param {string} e.type 分享类型,music、video或link，不填默认为link
 * @param {string} e.dataUrl 如果type是music或video，则要提供数据链接，默认为空
 * @param {function} e.success,
 * @param {function} e.cancel
 */
const initShareConfig = function(e = {}) {

    for (const key in defaultShare) {
        if (!e[key]) {
            e[key] = defaultShare[key]
        }
    }
    let targetUrl = domain + '/index.html#' + e.targetUrl;
    e['link'] = domain + "/redirect.html?app3Redirect=" + encodeURIComponent(targetUrl)
    wx.onMenuShareQZone(e)
    wx.onMenuShareWeibo(e)
    wx.onMenuShareQQ(e)
    wx.onMenuShareAppMessage(e)
    wx.onMenuShareTimeline(e)

}

/** 调用微信支付
 *@param c.appId 公众号名称，由商户传入
 *@param c.timeStamp 时间戳
 *@param c.nonceStr 随机串
 *@param c.package 扩展包
 *@param c.MD5 微信签名方式
 *@param c.paySign 微信签名
 *@param c.success 回调函数
 *@param c.cancel 回调函数
 *@param c.fail 回调函数
 * @param {{appId:string,
 * timeStamp:string,
 * nonceStr:string,
 * package:string,
 * MD5:string,
 * paySign:string,
 * success:function,
 * cancel:function,
 * fail :function
 * }} c
 */
export const invokeWxPay = (c) => {
    //坑--》 chooseWXPay接受对象 timestamp s小写
    let e = {...c, timestamp: c.timeStamp, signType: 'MD5' }
    wx.chooseWXPay(e)
}



/** 获取地理位置
 * @param {okCallback} ok 成功回调，回调参数 经纬度对象
 * @param {function} fail - 失败回调，回调参数 错误对象
 */
export const getLocation = (ok, fail) => {
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
            conver2Addr(res, ok)
        },
        cancel: function(res) {
            fail(res)
            console.error('getLocation-cancel', res)
        },
        fail: function(res) {
            fail(res)
            conver2Addr({ latitude: 135, longitude: 246 }, ok)
            console.error('getLocation-fail', res)

        }
    })
}

/** 全屏浏览图片
 * 启用微信 图片浏览
 * @param {string} current  当前图片url
 * @param {string[]} allUrls 所有图片url
 */
export const previewPictures = (current, allUrls) => {
        wx.previewImage({
            current,
            allUrls,
            success: function() {
                // console.log(1)
            }
        });
    }
    /** 通过高德地图 api 将经纬度转换成中文地址， 需要安装js库: vue-amap 并在main.js全局注册 */
const conver2Addr = ({ longitude, latitude }, ok) => {
    let map = new AMap.Map('nothing')
    map.plugin('AMap.Geocoder', function() { //回调函数
        //实例化Geocoder
        var geocoder = new AMap.Geocoder({
            city: "" //城市，默认：“全国”
        });
        geocoder.getAddress([longitude, latitude], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                let addr = result.regeocode.addressComponent
                ok(addr.province + addr.city)
            }
        })
    })
}



/**  全局 回调定义*/

/** 成功回调 回调参数 经纬度对象  { latitude, longitude }
 * @callback okCallback
 * @param {{latitude:string,longitude:string}} location
 * @param location.latitude 纬度，浮点数，范围为90 ~ -90
 * @param location.longitude 经度，浮点数，范围为180 ~ -180。
 */