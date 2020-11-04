export const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export const withUnit = (strNum) => {
    let num = parseInt(strNum);
    let unitMax = 10000;
    if (num > unitMax) {
        return Math.round((num / unitMax) * 100) / 10 + "W";
    }
    return strNum;
}
export const isIPhoneX = () => {

    return isIOS && window.screen.height == 812 && window.screen.width == 375
}

/**解决 ios 不能转化横杆时间格式 如: 2019-09-12 */
export const myDate = (date) => {
    date = isIOS ? date.replace(/-/g, '/') : date
    return new Date(date)
}
export const debounce = (fn, wait) => {
    let timeout = 0


    return function (...rest) {
        if (timeout) {
            console.log('forbidden');
             
           clearTimeout(timeout);
           timeout=0
            return
        }
        timeout = setTimeout(fn, wait, ...rest);
    }
}
/**
* 快速点击3次 响应事件，跳到清除token 页面
* @param {object} vm vue组件实例
*/
export  function tripleKill (vm) {
    let first = 0;
    let count = 0;
    return function (e) {
        count++;
        if (!first) {
            first = e.timeStamp;
            return;
        }
        if (count == 3) {
            if (e.timeStamp - first < 600) {
                vm.$router.push("/mine/clear");
            }
            count = 0;
            first = 0;
        }
    };
};
