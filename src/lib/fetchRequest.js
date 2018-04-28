// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://segmentfault.com/p/1210000009184668/read
// https://github.com/camsong/fetch-jsonp
// https://github.com/camsong/fetch-ie8
let fetchRequest = (option = {}) => {
    option.type = option.type.toUpperCase() || 'GET'
    option.url = option.url || ''
    option.data = option.data || {}
    option.dataType = option.dataType || 'text'
    option.timeout = option.timeout || 10000

    // 拼接字符串 a=1&b=2
    let serialize = function (obj) {
        let ret = []
        Object.keys(obj).forEach(key => {
            ret.push('' + key + '=' + obj[key]);
        })
        return ret.join('&');
    }

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

        // 超时
        let timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Request Timeout'))
            }, option.timeout)
        })

        let fetchPromise = fetch(option.url, requestConfig).then((response) => {
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
            return response
        })

        return Promise.race([
            fetchPromise,
            timeoutPromise
        ]).then((response) => {
            return response
        }).catch((error) => {
            // 如果不想要统一处理 则去掉catch 但是外面就需要加catch
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
//     console.log(res)
//     return fetchRequest({
//         type: 'GET',
//         url: '/v1/cities',
//         dataType: 'json',
//         data: {
//             type: 'hot'
//         }
//     })
// }).then((res) => {
//     console.log(res)
//     return fetchRequest({
//         type: 'GET',
//         url: '/',
//         dataType: 'text',
//         data: {}
//     })
// }).then((res) => {
//     console.log(res)
// })




// fetchRequest({
//     type: 'GET',
//     url: '/v1/cities',
//     dataType: 'json',
//     data: {
//         type: 'hot'
//     }
// }).then((res) => {
//     console.log(res)
// })

// fetchRequest({
//     type: 'GET',
//     url: '/',
//     dataType: 'text',
//     data: {}
// }).then((res) => {
//     console.log(res)
// })





export default fetchRequest