import React from "react";
import StartMenu from "../start/start";
import ClockWidget from "./clockwidget/clockwidget";
import ProgramContext from "app/app/Contexts";
import "./taskbar.css";
import TaskbarIcon from "./taskbaricon/taskbaricon";

export default class TaskBar extends React.Component {
  static context = ProgramContext;

  render() {
    return (
      <ProgramContext.Consumer>
        {(value) => (
          <div id="taskbar">
            <StartMenu />

            <div className="active-apps">
              {value.windows.map((x) => (
                <TaskbarIcon
                  obj={x}
                  handleClick={this.props.handleClick}
                  key={x.id}
                />
              ))}
            </div>

            <ClockWidget />
          </div>
        )}
      </ProgramContext.Consumer>
    );
  }
}
