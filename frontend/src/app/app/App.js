import React from "react";
import TaskBar from "../components/taskbar/taskbar";
import ProgramContext from "./Contexts";
import Windows from "app/components/windows/windows";
import "./App.css";
import { AppsProvider } from "./Contexts";
import { isMobile } from "react-device-detect";
import AppWindow from "app/components/windows/basewindow/basewindow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.windows = () => {};

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        {!isMobile ? (
          <AppsProvider>
            <Windows
              ref={(inst) => {
                this.windows = inst;
              }}
            />

            <TaskBar
              handleClick={(x) => this.windows.updateThing(this.windows, x)}
            />
          </AppsProvider>
        ) : (
          <div>
            <AppWindow
              obj={{
                title: "Device not supported",
                icon: "/images/icons/warn.png",
              }}
              noActions
            >
              <h1>Windows XP is not supported on mobile devices :\</h1>
            </AppWindow>
          </div>
        )}
      </div>
    );
  }
}

export default App;
export { ProgramContext as ThemeContext };
