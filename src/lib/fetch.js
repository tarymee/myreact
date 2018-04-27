// 拼接字符串 a=1&b=2
function serialize(obj) {
    var ret = []
    Object.keys(obj).forEach(key => {
        ret.push('' + key + '=' + obj[key]);
    })
    return ret.join('&');
}

var Ajax = function (option) {
    option = (typeof option === 'object') ? option : {}
    option.type = option.type ? option.type.toUpperCase() : 'GET'
    option.url = option.url || ''
    option.data = option.data || {}
    option.headers = option.headers || {}
    option.dataType = option.dataType || 'text'
    option.success = option.success || function () { }
    option.error = option.error || function () { }
    option.timeout = option.timeout || 10000 // 默认10秒

    // get方法 拼接字符串 ?a=1&b=2
    if (option.type === 'GET') {
        let dataStr = serialize(option.data)
        if (dataStr !== '') {
            option.url = option.url + '?' + dataStr
        }
    }

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')
    xhr.open(option.type, option.url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    for (var key in option.headers) {
        xhr.setRequestHeader(key, option.headers[key])
    }

    // 超时
    var isTimeout = false
    var timeout_fn = setTimeout(function () {
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
        clearTimeout(timeout_fn)

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


// Ajax({
//     type: 'POST',
//     url: '/v1/captchas',
//     dataType: 'json',
//     data: {},
//     success: function (res, xhr, textStatus) {
//         console.error(this)
//         // console.log(res)
//         console.log(xhr)
//         // console.log(textStatus)
//     },
//     error: function (xhr, textStatus, error) {
//         console.error(this)
//         console.error(xhr)
//         console.error(textStatus)
//         console.error(error)
//     }
// })

var a = Ajax({
    type: 'POST',
    url: 'http://www.hululi.cn/api/discover/new_index_v3',
    dataType: 'json',
    timeout: 10,
    data: {
        hululi_client_system: 'h5',
        hululi_version: '2.2'
    },
    success: function (res, xhr, textStatus) {
        // console.error(this)
        // console.log(res)
        console.log(xhr)
        // console.log(textStatus)
    },
    error: function (xhr, textStatus, error) {
        // console.error(this)
        console.error(xhr)
        console.error(textStatus)
        console.error(error)
    }
})

// a.abort()



// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://segmentfault.com/p/1210000009184668/read
// https://github.com/camsong/fetch-jsonp
// https://github.com/camsong/fetch-ie8
var fetchRequest = (option = {}) => {
    option.type = option.type.toUpperCase() || 'GET'
    option.url = option.url || ''
    option.data = option.data || {}
    option.dataType = option.dataType || 'text'

    // get方法 拼接字符串 ?a=1&b=2
    if (option.type === 'GET') {
        let dataStr = serialize(option.data)
        if (dataStr !== '') {
            option.url = option.url + '?' + dataStr
        }
    }

    if (window.fetch) {
        let requestConfig = {
            credentials: 'include', // 默认发送cookie
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            method: option.type,
        }

        if (option.type === 'POST') {
            requestConfig.body = JSON.stringify(option.data)
        }

        return fetch(option.url, requestConfig).then((response) => {
            if (response.status === 200 || response.status === 304) {
                return response
            }
            const error = new Error(response.statusText)
            error.response = response
            throw error
        }).then((response) => {
            if (option.dataType === 'text') {
                return response.text()
            } else if (option.dataType === 'json') {
                return response.json()
            } else {
                return response.text()
            }
        }).then((response) => {
            console.log('fetch success')
            return response
        }).catch((error) => {
            // 如果不想要统一处理 则去掉catch 但是外面就需要加catch
            console.error('fetch fail')
            console.error(error)
        })
    }
}
// fetchRequest({
//     type: 'POST',
//     url: '/v1/captchas',
//     dataType: 'json',
//     data: {}
// }).then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })

// fetchRequest({
//     type: 'GET',
//     url: '/v1/cities',
//     dataType: 'json',
//     data: {
//         type: 'hot'
//     }
// }).then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })

// fetchRequest({
//     type: 'GET',
//     url: '/',
//     dataType: 'text',
//     data: {}
// }).then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })

        // function fetchProgress(url, opts = {}, onProgress) {
        //     return new Promise(funciton(resolve, reject) {
        //         var xhr = new XMLHttpRequest()
        //         xhr.open(opts.method || 'get', url)
        //         for(var key in opts.headers || {}){
        //             xhr.setRequestHeader(key, opts.headers[key]);
        //         }

        //         xhr.onload = e => resolve(e.target.responseText)
        //         xhr.onerror = reject;
        //         if (xhr.upload && onProgress) {
        //             xhr.upload.onprogress = onProgress; //上传
        //         }
        //         if ('onprogerss' in xhr && onProgress) {
        //             xhr.onprogress = onProgress; //下载
        //         }
        //         xhr.send(opts.body)
        //     })
        // }


        // fetch('http://www.hululi.cn/api/discover/new_index_v3', {
        //     hululi_client_system: 'h5',
        //     hululi_version: '2.2'
        // }, 'POST', 'fetch').then((res) => {
        //     console.log(555555555555555)
        //     console.log(res)
        // }).catch((error) => {
        //     console.error('error')
        //     console.error(error)
        // })

export {
    fetchRequest,
    Ajax
}