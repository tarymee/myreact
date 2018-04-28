// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://segmentfault.com/p/1210000009184668/read
// https://github.com/camsong/fetch-jsonp
// https://github.com/camsong/fetch-ie8
var fetchRequest = (option = {}) => {
    option.type = option.type.toUpperCase() || 'GET'
    option.url = option.url || ''
    option.data = option.data || {}
    option.dataType = option.dataType || 'text'

    // 拼接字符串 a=1&b=2
    function serialize(obj) {
        var ret = []
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

export default fetchRequest