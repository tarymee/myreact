import React from 'react';
import './test.css';
// import { test } from '../../lib/util'
// import util, { v1, v2 } from '../../lib/util'
import * as util from '../../lib/util'
import { fetchRequest, Ajax} from '../../lib/fetch'

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clickCount: 0
        }
    }

    // 默认props
    static defaultProps = {
        name: 'defaultPropsName'
    }

    clickChange(id, e) {
        // console.log(id)
        // console.log(e)
        // console.log(this)
        e.preventDefault()
        this.setState({
            clickCount: this.state.clickCount + 1
        })


    }

    componentDidMount() {
        console.log(util)
        console.log(util.v1())
        console.log(util.v2())
        // console.log(v1())
        // console.log(v2())

        // 如何扩展 Create React App 的 Webpack 配置
        // https://zhaozhiming.github.io/blog/2018/01/08/create-react-app-override-webpack-config/




        // Ajax({
        //     type: 'POST',
        //     url: '/v1/captchas',
        //     dataType: 'json',
        //     data: {},
        //     success: function (res, xhr) {
        //         if (res) {
        //             console.log(res)
        //             console.log(xhr)
        //         }
        //     }
        // })

        Ajax({
            type: 'GET',
            url: 'https://www.ba5525idu.com/',
            dataType: 'json',
            data: {},
            success: function (res, xhr) {
                console.log(res)
                console.log(xhr)
            },
            error: function (res, xhr) {
                console.log(res)
                console.log(xhr)
            },
        })

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












        // fetch('/v1/captchas999', {}, 'POST', 'ajax').then((res) => {
        //     console.log(555555555555555)
        //     console.log(res)
        // })


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


    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="m-test">
                {this.props.name} {this.props.testObj.aaa} <a onClick={this.clickChange.bind(this, "ddddddd")}>点击{this.state.clickCount}次</a>
            </div>
        )
    }
}

export default Test
