import React from 'react';
import './test.css';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0
    };
  }

  static defaultProps = {
    name: 'test'
  };

  clickChange(id, e) {
    console.log(id)
    console.log(e)
    console.log(this)
    e.preventDefault();
    this.setState({
      clickCount: this.state.clickCount + 1
    });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="m-test">
        <div>{this.props.name}</div>
        <div>{this.props.obj.name}</div>
        <a href="#" onClick={this.clickChange.bind(this, "ddddddd")}>点击{this.state.clickCount}次</a>
        <div>点击测试{this.state.clickCount}次</div>
      </div>
    );
  }
}

export default Test;
