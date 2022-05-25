import React from "react";
import TaskBar from "../components/taskbar/taskbar";
import SwfWindow from "../components/windows/gamewindow/gamewindow";
import ProgramContext from "./Contexts";
import Windows from "app/components/windows/windows";
import "./App.css";
import robbie from "app/swfs/Robbie2D.swf";
import AppWindow from "app/components/windows/basewindow/basewindow";
import robbie_hok from "../../images/robbie_hok.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.windows = () => {};

    this.state = {
      windows: [
        {
          name: "Robbies avontuur",
          swf: robbie,
          windowClass: SwfWindow,
          icon: robbie_hok,
        },
        {
          name: "Test window",
          title: "Test window",
          windowClass: AppWindow,
          icon: robbie_hok,
        },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <ProgramContext.Provider value={this.state}>
          <Windows
            ref={(inst) => {
              this.windows = inst;
            }}
          />

          <TaskBar
            handleClick={(x) => this.windows.updateThing(this.windows, x)}
          />
        </ProgramContext.Provider>
      </div>
    );
  }
}

export default App;
export { ProgramContext as ThemeContext };
