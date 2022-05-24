import "./clockwidget.css";
import cd from "../../../../images/icon_cd.png";
import React from "react";

class ClockWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    let padzero = (x) => (x < 10 ? "0" + x : x);
    let strTime = padzero(hours) + ":" + padzero(minutes) + " " + ampm;
    return strTime;
  }

  render() {
    return (
      <div id="clockWidget">
        <div className="menu-icon">
          <img src={cd} alt="compactdisk-icon"/>
        </div>
        <div id="clock">
          <span>{this.formatTime(this.state.time)}</span>
        </div>
      </div>
    );
  }
}

// export default function ClockWidget() {

// }

export default ClockWidget;
