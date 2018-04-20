/* eslint no-undef: "warn" */
;(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        // Node环境
        module.exports = factory()
    } else {
        if (typeof define === 'function' && define.amd) {
            // AMD环境
            define(factory)
        } else {
            // 其他环境 放全局对象中
            global.Extendate = factory()
        }
    }
})(this, function () {
    'use strict'

    // Object.setPrototypeOf polyfill
    Object.setPrototypeOf = Object.setPrototypeOf ||
        function (obj, proto) {
            obj.__proto__ = proto
            return obj
        }

    /**
     * 继承并扩展原生 Date 对象
     * 如何继承Date对象？
     * https://segmentfault.com/a/1190000012841509#articleHeader7
     * http://momentjs.cn/
     */
    var Extendate = function () {
        // bind属于Function.prototype，接收的参数是：object, param1, params2...
        var dateInst = new (Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))()

        // 更改原型指向，否则无法调用Extendate原型上的方法
        Object.setPrototypeOf(dateInst, Extendate.prototype)

        // 实例变量
        dateInst.version = '1.0.0'

        return dateInst
    }

    // 原型重新指回Date，否则根本无法算是继承
    Object.setPrototypeOf(Extendate.prototype, Date.prototype)

    // 静态变量
    // Extendate.version = 'V1.0.0'


    /**
     * 转化为指定格式的String
     * (new Extendate()).toFormatString('yyyy-MM-dd HH:mm:ss.SSS 星期w 第q季度')
     * ==>
     * 2018-04-19 18:43:24.829 星期四 第2季度
     */
    Extendate.prototype.toFormatString = function (fmt) {
        fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
        var o = {
            'y': this.getFullYear(), // 年份，注意必须用getFullYear
            'M': this.getMonth() + 1, // 月份，注意是从0-11
            'd': this.getDate(), // 日期
            'q': Math.floor((this.getMonth() + 3) / 3), // 季度
            'w': ['日', '一', '二', '三', '四', '五', '六'][this.getDay()], // 星期，注意是0-6
            'H': this.getHours(), // 24小时制
            'h': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 12小时制
            'm': this.getMinutes(), // 分钟
            's': this.getSeconds(), // 秒
            'S': this.getMilliseconds() // 毫秒
        }
        for (var i in o) {
            fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
                var val = o[i] + ''
                if (i === 'w') return val
                // 补0
                for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
                // 截取
                return m.length === 1 ? val : val.substring(val.length - m.length)
            })
        }
        return fmt
    }










    // class Extendate1 extends Date {
    //     constructor() {
    //         super()
    //         this.version = '1.0.0'
    //     }
    //     toFormatString(fmt) {
    //         fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
    //         var o = {
    //             'y': this.getFullYear(), // 年份，注意必须用getFullYear
    //             'M': this.getMonth() + 1, // 月份，注意是从0-11
    //             'd': this.getDate(), // 日期
    //             'q': Math.floor((this.getMonth() + 3) / 3), // 季度
    //             'w': ['日', '一', '二', '三', '四', '五', '六'][this.getDay()], // 星期，注意是0-6
    //             'H': this.getHours(), // 24小时制
    //             'h': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 12小时制
    //             'm': this.getMinutes(), // 分钟
    //             's': this.getSeconds(), // 秒
    //             'S': this.getMilliseconds() // 毫秒
    //         }
    //         for (var i in o) {
    //             fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
    //                 var val = o[i] + ''
    //                 if (i === 'w') return val
    //                 // 补0
    //                 for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
    //                 // 截取
    //                 return m.length === 1 ? val : val.substring(val.length - m.length)
    //             })
    //         }
    //         return fmt
    //     }
    // }

    // let date = new Extendate1()

    // // 正常输出，譬如1515638988725
    // console.log(date.toFormatString())










    return Extendate
})