import React from "react";
import ProgramContext from "app/app/Contexts";
import SwfWindow from "./gamewindow/gamewindow";
import AppWindow from "./basewindow/basewindow";
import "./windows.css";

export default class Windows extends React.Component {
  static contextType = ProgramContext;

  constructor() {
    super();
    this.state = {
      apps: {},
    };

    this.apps = {};
  }

  setApp(el, name) {
    this.apps[name] = el;
  }

  componentDidMount() {}

  updateThing(x, y) {
    x.apps[y].minimize();
  }

  render() {
    return (
      <ProgramContext.Consumer>
        {(value) => (
          <div id="windows">
            {value.windows.map((x) => {
              if (x.windowClass === SwfWindow) {
                return (
                  <SwfWindow
                    ref={(y) => this.setApp(y, x.name)}
                    key={x.name}
                    title={x.name}
                    swf={x.swf}
                  />
                );
              } else {
                return (
                  <AppWindow
                    ref={(y) => this.setApp(y, x.name)}
                    key={x.name}
                    title={x.name}
                  />
                );
              }
            })}
          </div>
        )}
      </ProgramContext.Consumer>
    );
  }
}
