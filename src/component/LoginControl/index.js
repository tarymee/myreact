import React from 'react';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      logingText: "登录"
    };
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      logingText: this.state.isLoggedIn ? "登录" : "注册"
    });
  }


  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
        <button onClick={this.handleLoginClick.bind(this)}>{this.state.logingText}</button>
      </div>
    );
  }
}

function Greeting(props) {
  if (props.isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

export default LoginControl;