import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Clock from './component/Clock'
import Test from './component/Test'
import LoginControl from './component/LoginControl'

import util from './lib/util'



import Extendate from './lib/extendate'


class App extends Component {

    componentDidMount() {
        console.log((new Extendate()).toFormatString('yyyy-MM-dd HH:mm:ss.SSS 星期w 第q季度'))






    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <section>
                    <Clock />
                    <Test name="khkjhkj" obj={{ name: "test" }} />
                    <LoginControl />
                </section>
            </div>
        )
    }
}
export default App
