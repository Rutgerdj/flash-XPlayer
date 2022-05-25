import React from "react";
import "./taskbaricon.css";

export default class TaskbarIcon extends React.Component {
  render() {
    return (
      <div
        className="taskbaricon"
        onClick={() => this.props.handleClick(this.props.name)}
      >
        <img src={this.props.src} alt=""></img>
        <span className="taskbaricon-name">{this.props.name}</span>
      </div>
    );
  }
}
