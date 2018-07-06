/**
var a = ajax({
    type: 'GET',
    url: '/',
    dataType: 'text',
    data: {},
    success: function (res, xhr) {
        console.log(this)
        console.log(res)
        console.log(xhr)
    },
    error: function (xhr, error) {
        console.error(this)
        console.error(xhr)
        console.error(error)
    }
})

// 取消
a.abort()

ajax({
    type: 'POST',
    url: 'http://www.hululi.cn/api/discover/new_index_v3',
    dataType: 'json',
    data: {
        hululi_client_system: 'h5',
        hululi_version: '2.2'
    },
    success: function (res, xhr) {
        console.log(this)
        console.log(res)
        console.log(xhr)
    },
    error: function (xhr, error) {
        console.error(this)
        console.error(xhr)
        console.error(error)
    }
})
 */
var ajax = function (option) {
    option = (typeof option === 'object') ? option : {}
    option.type = option.type ? option.type.toUpperCase() : 'GET'
    option.url = option.url || ''
    option.data = option.data || {}
    option.headers = option.headers || {}
    option.dataType = option.dataType || 'text'
    option.success = option.success || function () {}
    option.error = option.error || function () {}
    option.timeout = option.timeout || 10000 // 默认10秒

    // 拼接字符串 a=1&b=2
    function serialize(obj) {
        var ret = []
        Object.keys(obj).forEach(key => {
            ret.push('' + key + '=' + obj[key])
        })
        return ret.join('&')
    }

    // get方法 拼接字符串 ?a=1&b=2
    if (option.type === 'GET') {
        let dataStr = serialize(option.data)
        if (dataStr !== '') {
            option.url = option.url + '?' + dataStr
        }
    }

    // var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    var xhr = new XMLHttpRequest()
    xhr.open(option.type, option.url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    for (var key in option.headers) {
        xhr.setRequestHeader(key, option.headers[key])
    }

    // 超时
    var isTimeout = false
    var timeoutFun = setTimeout(function () {
        isTimeout = true
        xhr.abort()
    }, option.timeout)

    xhr.onabort = function () {
        isTimeout = true
    }

    xhr.send(option.type === 'GET' ? '' : serialize(option.data))
    xhr.onreadystatechange = function () {
        // 如果超时则中止请求
        if (isTimeout) return
        // 取消等待的超时
        clearTimeout(timeoutFun)

        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                let response = xhr.responseText
                if (option.dataType === 'text') {
                    option.success.call(option, response, xhr)
                } else if (option.dataType === 'json') {
                    try {
                        response = JSON.parse(response)
                        option.success.call(option, response, xhr)
                    } catch (error) {
                        option.error.call(option, xhr, error)
                    }
                } else {
                    option.success.call(option, response, xhr)
                }
            } else {
                option.error.call(option, xhr, 'error')
            }
        }
    }
    return xhr
}

export default ajax