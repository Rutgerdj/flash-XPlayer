import React from "react";
import TaskBar from "../components/taskbar/taskbar";
import ProgramContext from "./Contexts";
import Windows from "app/components/windows/windows";
import "./App.css";
import { AppsProvider } from "./Contexts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.windows = () => {};

    this.state = {};
  }

  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
export { ProgramContext as ThemeContext };
