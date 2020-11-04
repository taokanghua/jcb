
const TimeHandler = {
    timeFormat(text) {
        //text=2019-01-11-2019-05-12
        let t = text.replace(/\s*/g, ""); //去除空格
        t = t.replace(/-/g, "."); //'-'转'.'
        t = t.split(""); //转换数组
        t[10] = "-"; //把两个时间中间的连字符转回'-'
        return t.join(""); //转回字符串
    },
    getTimeText(second) {
        var h = (second / 3600) | 0
            , temp = second - h * 3600
            , m = (temp / 60) | 0
            , s = (temp % 60) | 0
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return h + ':' + m + ':' + s
    },
     getDateDiffFromNow(start,now) {
       // let nowDateStr = await TimeHandler.getCurrentTime()
       let isIphone = /iphone/gi.test(navigator.userAgent);
       if(isIphone){
           start=start.replace(/\-/g,'/')
           now=now.replace(/\-/g,'/')
       }
         now = new Date(now).getTime()
        start = new Date(start).getTime()
        return (now - start) / 1000

    },
    getCurrentTime() {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('GET', location.origin);
            req.send(null);
            req.onload = () => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        resolve(req.getResponseHeader('Date'))
                    } else {
                        console.error(req.statusText);
                    }
                }
            };
        })

    }
}
export default TimeHandler