function EDate() {
    // bind属于Function.prototype，接收的参数是：object, param1, params2...
    var dateInst = new (Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))();

    // 更改原型指向，否则无法调用EDate原型上的方法
    // ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__
    // Object.setPrototypeOf(dateInst, EDate.prototype);
    dateInst.__proto__ = EDate.prototype

    return dateInst
}
// 原型重新指回Date，否则根本无法算是继承
EDate.prototype.__proto__ = Date.prototype

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 参考 http://momentjs.cn/
 * (new EDate()).format('yyyy-MM-dd HH:mm:ss.SSS www 第q季度') ==> 2018-04-19 18:43:24.829 星期四 第2季度
 */
EDate.prototype.format = function (fmt) {
    var o = {
        'y': this.getFullYear(), // 年份，注意必须用getFullYear
        'M': this.getMonth() + 1, // 月份，注意是从0-11
        'd': this.getDate(), // 日期
        'q': Math.floor((this.getMonth() + 3) / 3), // 季度
        'w': ['日', '一', '二', '三', '四', '五', '六'][this.getDay()], // 星期，注意是0-6
        'H': this.getHours(), // 24小时制
        'h': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 12小时制
        'm': this.getMinutes(), // 分钟
        's': this.getSeconds(), // 秒
        'S': this.getMilliseconds() // 毫秒
    }
    for (var i in o) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
            var val = o[i] + ''
            // if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            if (i == 'w') return val
            // 补0
            for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
            // 截取
            return m.length == 1 ? val : val.substring(val.length - m.length)
        })
    }
    return fmt
}


// var a = new EDate()

// console.log(a.__proto__.__proto__)
// console.log('toISOString: ' + a.toISOString())
// console.log('toJSON: ' + a.toJSON())
// console.log('toGMTString: ' + a.toGMTString())
// console.log('toUTCString: ' + a.toUTCString())

// console.log('toString: ' + a.toString())
// console.log('toTimeString: ' + a.toTimeString())
// console.log('toDateString: ' + a.toDateString())
// console.log('toLocaleDateString: ' + a.toLocaleDateString())
// console.log('toLocaleString: ' + a.toLocaleString())
// console.log('toLocaleTimeString: ' + a.toLocaleTimeString())

// console.log((new EDate()).format('yyyy-MM-dd HH:mm:ss.SSS www q'))
console.log((new EDate()).format('yyyy年M月d日 HH小时mm分ss秒.S 星期w 第q季度'))
console.log((new EDate()).format(''))




export default EDate