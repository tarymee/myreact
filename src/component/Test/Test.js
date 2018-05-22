import React from 'react';
import './test.css';


import fetchRequest from '../../lib/fetchRequest'
console.log(fetchRequest)
// import fetch2 from '../../lib/fetch'

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
        // 如何扩展 Create React App 的 Webpack 配置
        // https://zhaozhiming.github.io/blog/2018/01/08/create-react-app-override-webpack-config/




        // var a = function () {
        //     return fetch2('/v1/cities', {
        //         type: 'hot'
        //     })
        // }

        // a().then((res) => {
        //     console.log(res)
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
