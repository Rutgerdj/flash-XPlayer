import React from "react";
import "./taskbaricon.css";

export default class TaskbarIcon extends React.Component {
  render() {
    return (
      <div
        className="taskbaricon"
        onClick={() => this.props.handleClick(this.props.obj.id)}
      >
        <img src={this.props.obj.icon} alt="application icon"></img>
        <span className="taskbaricon-name">{this.props.obj.title}</span>
      </div>
    );
  }
}
