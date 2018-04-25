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
        var that = this
        e.preventDefault()
        that.setState({
            clickCount: that.state.clickCount + 1
        })


    }

    componentDidMount() {
        console.log(util)
        console.log(util.v1())
        console.log(util.v2())
        // console.log(v1())
        // console.log(v2())
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
