import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Clock from './component/Clock/Clock'
import Test from './component/Test/Test'
import LoginControl from './component/LoginControl/LoginControl'

class App extends Component {

    componentDidMount() {


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
                    <Test name="test" testObj={{ aaa: "aaa" }} />
                    <LoginControl />
                </section>
            </div>
        )
    }
}
export default App
