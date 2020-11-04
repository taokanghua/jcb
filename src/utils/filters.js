//此处 为 strick 模式, 调用内建函数请注意使用强类型
export default {
    formatDate(str) { //"2019-12-05"
        return format(str, 'yyyy-MM-dd')
    },
    formatDateTime(str) { // "2019-12-05 16:44:57"
        return format(str, 'yyyy-MM-dd HH:mm:ss')
    },
    formatDateDiy(str, pattern) {
        return format(str, pattern)
    },
    /**
     * 
     * @param {string} str 时间字符串
     * @returns {string} 一天内 返回HH:mm,一天以上返回 yyyy-MM-dd
     */
    formatDay(str) {
        let d = new Date(str.replace(/\-/g, '/'))
        let n = new Date()
        let pattern = n - d < oneDay ? 'HH:mm' : 'yyyy-MM-dd'
        return format(str, pattern)

    },


}
const oneDay = 24 * 60 * 60 * 1000
const x2MethodName = {
    y: 'FullYear',
    M: 'Month',
    d: 'Date',
    H: 'Hours',
    m: 'Minutes',
    s: 'Seconds'
}
const x2Method = {
    y: d => d.getFullYear(),
    M: d => d.getMonth() + 1,
    d: d => d.getDate(),
    H: d => d.getHours(),
    m: d => d.getMinutes(),
    s: d => d.getSeconds()
}

function format(str, pattern) {
    if (str === undefined) return ''
    let needs = ['y', 'M', 'd', 'H', 'm', 's'].filter(v => new RegExp(v, 'g').test(pattern))
    let d = new Date(str)
    let arr = needs.map(k => String(x2Method[k](d))).map(v => v.padStart(2, 0))

    let yearIndex = needs.indexOf('y')
    if (yearIndex > -1) {
        let len = pattern.match(/y+/g)[0].length
        if (len < 4) { //年份位数匹配
            let year = arr[yearIndex]
            arr[yearIndex] = year.slice(len * -1)
        }
    }
    let res = needs.reduce((pre, v, i) => pre.replace(new RegExp(`${v}+`), arr[i]), pattern)
    return res;

}