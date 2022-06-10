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

  setApp(el, name) {
    this.apps[name] = el;
  }

  componentDidMount() {}

  updateThing(x, y) {
    x.apps[y].minimize();
  }

  render() {
    return (
      <AppsContext.Consumer>
        {({ windows, setWindows }) => (
          <div id="windows">
            {windows.map((x) => {
              if (x.windowClass === SwfWindow) {
                return (
                  <SwfWindow
                    ref={(y) => this.setApp(y, x.title)}
                    key={x.title}
                    title={x.title}
                    swf={x.swf}
                  />
                );
              } else {
                return (
                  <AppWindow
                    ref={(y) => this.setApp(y, x.title)}
                    key={x.title}
                    title={x.title}
                  />
                );
              }
            })}
          </div>
        )}
      </AppsContext.Consumer>
    );
  }
}
