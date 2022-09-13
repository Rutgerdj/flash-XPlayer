import React from "react";
import SwfWindow from "./gamewindow/gamewindow";
import AppWindow from "./basewindow/basewindow";
import "./windows.css";
import AppsContext from "app/app/Contexts";

export default class Windows extends React.Component {
  static contextType = AppsContext;

  constructor() {
    super();
    this.state = {
      apps: {},
    };

    this.apps = {};
  }

  setApp(app, el) {
    this.apps[app.id] = el;
  }

  componentDidMount() {}

  updateThing(x, y) {
    x.apps[y].minimize();
  }

  renderProgram(details) {
    if (details.windowClass === SwfWindow) {
      return (
        <SwfWindow
          ref={(y) => this.setApp(details, y)}
          key={details.id}
          obj={details}
        />
      );
    } else if (details.windowClass === AppWindow) {
      return (
        <AppWindow
          ref={(y) => this.setApp(details, y)}
          obj={details}
          key={details.id}
        />
      );
    }
  }

  render() {
    return (
      <AppsContext.Consumer>
        {({ windows, setWindows }) => (
          <div id="windows">{windows.map(this.renderProgram.bind(this))}</div>
        )}
      </AppsContext.Consumer>
    );
  }
}
