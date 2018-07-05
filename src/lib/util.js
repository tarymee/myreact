// 转换为数字 如果不是数字 转为0
function toFloat(value) {
    var num = parseFloat(value)
    if (isNaN(num)) {
        num = 0
    }
    return num
}

// 转化为整数 如果不是数字 转为0
function toInt(value) {
    var num = parseInt(value)
    if (isNaN(num)) {
        num = 0
    }
    return num
}

// 四舍五入保留2位小数
function to2Decimals(value) {
    return Math.round(toFloat(value) * 100) / 100
}

// 输出保留两个小数的字符串
function to2DecimalsString(value) {
    value = to2Decimals(value).toString()
    var xsd = value.split('.')
    if (xsd.length === 1) {
        value = value + '.00'
        return value
    } else if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value + '0'
        }
        return value
    }
}

// 获取url参数
var getUrlParameter = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
    return null
}

// 拼接字符串 a=1&b=2
var serialize = function (obj) {
    obj = obj || {}
    let ret = []
    Object.keys(obj).forEach(key => {
        ret.push('' + key + '=' + obj[key])
    })
    return ret.join('&')
}


/**
 * 转化为指定格式的String
 * dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS 星期w 第q季度')
 * ==>
 * 2018-04-19 18:43:24.829 星期四 第2季度
 */
function dateFormat(date, fmt) {
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
    if (!date) {
        console.error('date未定义')
        return false
    }
    var o = {
        'y': date.getFullYear(), // 年份，注意必须用getFullYear
        'M': date.getMonth() + 1, // 月份，注意是从0-11
        'd': date.getDate(), // 日期
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'w': ['日', '一', '二', '三', '四', '五', '六'][date.getDay()], // 星期，注意是0-6
        'H': date.getHours(), // 24小时制
        'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
        'm': date.getMinutes(), // 分钟
        's': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
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

// 是否函数
function isFunction(arg) {
    return typeof arg === 'function'
    // return Object.prototype.toString.call(arg) === '[object Function]'
}

function isArray(arg) {
    return Array.isArray(arg)
    // return Object.prototype.toString.call(arg) === '[object Array]'
}

export default {
    isFunction,
    isArray,
    toFloat,
    toInt,
    to2Decimals,
    to2DecimalsString,
    getUrlParameter,
    serialize,
    dateFormat
}
