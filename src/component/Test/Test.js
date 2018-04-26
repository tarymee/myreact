import React from 'react';
import './test.css';
// import { test } from '../../lib/util'
// import util, { v1, v2 } from '../../lib/util'
import * as util from '../../lib/util'


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



        // // fetch
        // // https://segmentfault.com/a/1190000008484070
        // fetch('/api/discover/new_index_v3', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: new Headers({
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
        //     }),
        //     body: new URLSearchParams({
        //         user_id: '',
        //         auth_token: '',
        //         aaa: [
        //             {
        //                 bbb: '5463546',
        //                 ccc: '5463546'
        //             },
        //             {
        //                 bbb: '5463546',
        //                 ccc: '5463546'
        //             }
        //         ],
        //         hululi_client_system: 'h5',
        //         hululi_version: '2.2'
        //     }).toString()
        // }).then((res) => {
        //     console.log(res)
        //     // console.log(res.body.getReader())
        //     // return res.text()
        //     return res.json()
        // }).then((res) => {
        //     console.log(res)
        // }).catch((error) => {
        //     console.log(error)
        // })




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
