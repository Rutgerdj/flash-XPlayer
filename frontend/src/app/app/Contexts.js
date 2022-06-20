import React from "react";
import robbie_hok from "../../images/robbie_hok.png";
import AppWindow from "app/components/windows/basewindow/basewindow";
import robbie from "app/swfs/Robbie2D.swf";
import SwfWindow from "../components/windows/gamewindow/gamewindow";
import available from "../available.json";
import { v4 as uuidv4 } from "uuid";

const AppsContext = React.createContext({});

export class AppsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windows: [
        {
          id: 0,
          title: "Test window",
          windowClass: AppWindow,
          icon: robbie_hok,
        },
        {
          id: 1,
          title: "Robbies avontuur",
          windowClass: SwfWindow,
          swf: robbie,
          icon: robbie_hok,
        },
      ],
      setWindows: this.setState.bind(this),
      addWindow: this.addWindow.bind(this),
      availableApps: available.availableApps,
    };
  }

  addWindow(window) {
    let id = uuidv4();
    this.setState((x) => {
      x.windows.push({
        id,
        ...window,
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
