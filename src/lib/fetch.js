
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
    option.dataType = option.dataType || 'text'
    option.success = option.success || function () { }
    option.error = option.error || function () { }

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
    xhr.send(option.type === 'GET' ? '' : serialize(option.data))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                let response = xhr.responseText
                if (option.dataType === 'text') {
                    option.success.call(this, response, xhr)
                } else if (option.dataType === 'json') {
                    try {
                        response = JSON.parse(response)
                        option.success.call(this, response, xhr)
                    } catch (error) {
                        // console.error('ajax return not json')
                        option.error.call(this, null, xhr)
                    }
                } else {
                    option.success.call(this, response, xhr)
                }
            } else {
                option.error.call(this, null, xhr)
            }
        }
    }

}







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






export {
    fetchRequest,
    Ajax
}