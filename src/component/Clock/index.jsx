import React from 'react';
import './Clock.css';

import util from '../../lib/util';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {


    util.now()


    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="m-clock">{this.state.date.toLocaleTimeString()}</div>
    );
  }
}

export default Clock;
