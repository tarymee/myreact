import React from 'react';
import './test.css';
// import { test } from '../../lib/util'
// import util, { v1, v2 } from '../../lib/util'
import * as util from '../../lib/util'
import fetchRequest from '../../lib/fetchRequest'

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
