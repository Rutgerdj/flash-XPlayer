import React from "react";
import TaskBar from "../components/taskbar/taskbar";
import SwfWindow from "../components/windows/gamewindow/gamewindow";
import ProgramContext from "./Contexts";
import Windows from "app/components/windows/windows";
import "./App.css";
import robbie from "app/swfs/Robbie2D.swf";
import AppWindow from "app/components/windows/basewindow/basewindow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.windows = () => {};

    this.state = {
      games: [
        {
          name: "Robbies avontuur",
          swf: robbie,
          windowClass: SwfWindow,
        },
        {
          name: "Test window",
          title: "Test window",
          windowClass: AppWindow,
        },
        {
          name: "Test window #2",
          title: "Test window",
          windowClass: AppWindow,
        },
        {
          name: "Test window #3",
          title: "Test window",
          windowClass: AppWindow,
        },
        {
          name: "Test window #4",
          title: "Test window",
          windowClass: AppWindow,
        },
        {
          name: "Test window #5",
          title: "Test window",
          windowClass: AppWindow,
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
