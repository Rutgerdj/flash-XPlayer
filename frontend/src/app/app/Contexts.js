import React from "react";
import robbie_hok from "../../images/robbie_hok.png";
import AppWindow from "app/components/windows/basewindow/basewindow";
import robbie from "app/swfs/Robbie2D.swf";
import SwfWindow from "../components/windows/gamewindow/gamewindow";

const AppsContext = React.createContext({});

export class AppsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windows: [
        {
          title: "Test window",
          windowClass: AppWindow,
          icon: robbie_hok,
        },
        {
          title: "Robbies avontuur",
          windowClass: SwfWindow,
          swf: robbie,
          icon: robbie_hok,
        },
      ],
      setWindows: this.setState.bind(this),
    };
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
