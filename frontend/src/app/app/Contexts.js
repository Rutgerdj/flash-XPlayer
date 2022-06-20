import React from "react";
import AppWindow from "app/components/windows/basewindow/basewindow";
import SwfWindow from "../components/windows/gamewindow/gamewindow";
import available from "../available.json";
import { v4 as uuidv4 } from "uuid";

const AppsContext = React.createContext({});

export class AppsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windows: [],
      setWindows: this.setState.bind(this),
      addWindow: this.addWindow.bind(this),
      availableApps: available.availableApps,
    };
  }

  addWindow(window) {
    let windowClass = AppWindow;
    switch (window.class) {
      case "base":
        windowClass = AppWindow;
        break;
      case "swf":
        windowClass = SwfWindow;
        break;
      default:
        windowClass = AppWindow;
        break;
    }

    let id = uuidv4();
    this.setState((x) => {
      x.windows.push({
        id,
        ...window,
        windowClass: windowClass,
      });
      return x;
    });
  }

  render() {
    return (
      <AppsContext.Provider value={this.state}>
        {this.props.children}
      </AppsContext.Provider>
    );
  }
}

export default AppsContext;
