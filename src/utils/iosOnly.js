export const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export const isIphoneX = () => {

    return isIOS && window.screen.height >= 812
}
export const isDeep = () => {
    return pathArr.length > 0
}
export const shouldLiftUp = () => isIphoneX() && pathArr.length == 0;
export const pathArr = []
export const listenrPath = (path) => {
    if (pathArr.length) return
    let deep = path.match(/\//gi).length;
    if (deep > 1) {
        pathArr.push(path)
    }
}
//修复ios 键盘收起后 布局被顶起
export const iosPositionIssue = () => {
    if (!isIOS) return
    const cache = { timeId: 0 }
    const fix = () => {
        document.body.scrollTop = document.body.scrollHeight;
        cache.timeId = 0
    }
    const validation = (el) => el.tagName === 'INPUT' || el.contentEditable === "true"
    document.body.addEventListener("focusout", ({ target }) => {
        if (!validation(target)) return
        cache.timeId = setTimeout(fix, 100);
    });
    document.body.addEventListener("focusin", ({ target }) => {
        if (!validation(target)) return
        if (cache.timeId > 0) {//多个input 焦点切换时 取消
            window.clearTimeout(cache.timeId)
        }
    });
}