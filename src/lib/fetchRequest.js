// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://segmentfault.com/p/1210000009184668/read
// https://github.com/camsong/fetch-jsonp
// https://github.com/camsong/fetch-ie8

/**
    import fetchRequest from './fetchRequest.js'

    // 同时请求
    var fetch1 = fetchRequest({
        url: '/'
    })()
    var fetch2 = fetchRequest({
        url: '/index.html'
    })()
    Promise.all([fetch1, fetch2]).then(res => {
        console.log(res[0])
        console.log(res[1])
    })


    // 按顺序请求
    fetchRequest({
        url: '/'
    })().then((res) => {
        console.log(res)
        return fetchRequest({
            url: '/index.html'
        })()
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })


    // 按顺序执行
    var pro1 = fetchRequest({
        url: '/'
    })
    var pro2 = fetchRequest({
        url: '/index.html'
    })
    var psArr1 = [pro1, pro2]
    var asyncFn = async function (PromiseArr, eachCallback) {
        var resultArr = []
        for (var i = 0, len = PromiseArr.length; i < len; i++) {
            var res = await PromiseArr[i]()
            typeof eachCallback === 'function' && eachCallback.call(PromiseArr[i], res, i)
            resultArr.push(res)
        }
        return resultArr
    }
    asyncFn(psArr1, function (res, index) {
        console.log(index)
        console.log(this)
        console.log(res)
    }).then((res) => {
        console.log(res)
    })
 */
let fetchRequest = (option = {}) => {
    return () => {
        option.type = option.type ? option.type.toUpperCase() : 'GET'
        option.url = option.url || ''
        option.data = option.data || {}
        option.headers = option.headers || {}
        option.dataType = option.dataType || 'text' // 返回的数据格式 text | json
        option.timeout = parseInt(option.timeout, 10) || 10000 // 超时 默认10秒

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
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default',
                method: option.type,
            }

            if (option.type === 'POST') {
                requestConfig.body = JSON.stringify(option.data)
            }

            for (var key in option.headers) {
                requestConfig.headers[key] = option.headers[key]
            }

            // 超时
            let timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(option.url + ' request timeout.')
                }, option.timeout)
            })

            let fetchPromise = fetch(option.url, requestConfig).then((res) => {
                if (res.status === 200 || res.status === 304) {
                    return res
                } else {
                    throw new Error(res.statusText)
                }
            }).then((res) => {
                // console.log(res)
                // console.log(res.headers.forEach(function (item, i) {
                //     console.log(item, i)
                // }))
                // console.log(res.headers.get('vary'))
                if (option.dataType === 'json') {
                    return res.json()
                } else {
                    return res.text()
                }
            }).then((res) => {
                return res
            })


            // 取消
            var abortFun = null
            let abortPromise = new Promise((resolve, reject) => {
                abortFun = function () {
                    reject(option.url + ' was abort.')
                }
            })

            var pro = Promise.race([
                fetchPromise,
                timeoutPromise,
                abortPromise
            ])


            pro.abort = function () {
                abortFun()
                return pro
            }

            return pro
            // 不统一加catch 调用时自己加 因为如果加了之后如果不报错之后会继续执行then
        } else {
            console.error('no support fetch.')
        }
    }
}

var request = function (url) {
    return fetchRequest({
        timeout: 1,
        url: url
    })().catch((err) => {
        console.log(5455)
        console.error(err)
    })
}

request('/index.html9').then((res) => {
    console.log(res)
})





// a.abort()


export default fetchRequest