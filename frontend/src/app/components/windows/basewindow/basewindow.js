import "./basewindow.css";
import React from "react";
import anime from "animejs/lib/anime.es.js";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import ProgramContext from "app/app/Contexts";

const transformVariables = ["top", "left", "width", "height"];

class AppWindow extends React.Component {
  constructor(props) {
    super(props);
    this.fullscreen = false;
    this.minimized = false;

    this.state = {
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
    };

    this.observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let width = entry.contentRect.width;
        let height = entry.contentRect.height;
        this.onResize(width, height);
      }
    });

    this.setWindow = (el) => {
      this.appwindow = el;
      $(el).draggable({
        containment: "#windows",
        handle: ".title-bar",
      });
    };

    this.previousTransform = {
      width: 800,
      height: 600,
      top: window.innerHeight / 3 + "px",
      left: window.innerWidth / 3 + "px",
    };
  }

  componentDidMount() {
    this.observer.observe(this.appwindow);
  }

  onResize(x, y) {}

  mouseDown() {
    document.querySelectorAll(".window").forEach((x) => {
      x.style.zIndex = -10;
    });
    this.appwindow.style.zIndex = -9;
  }

  render() {
    return (
      <ProgramContext.Consumer>
        {({ windows, setWindows }) => (
          <div
            className="window"
            ref={this.setWindow}
            onMouseDown={() => this.mouseDown()}
          >
            <div className="title-bar">
              <div className="title-bar-text">{this.props.title}</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={() => this.minimize()} />
                <button aria-label="Maximize" onClick={() => this.maximize()} />
                <button
                  aria-label="Close"
                  onClick={() => this.close(setWindows)}
                />
              </div>
            </div>
            <div className="window-body">{this.childComp()}</div>
          </div>
        )}
      </ProgramContext.Consumer>
    );
  }

  close(setWindows) {
    setWindows((x) => {
      x.windows = x.windows.filter((y) => y.title !== this.props.title);
      return x;
    });
  }

  minimize() {
    let rect = this.appwindow.getBoundingClientRect();

    anime({
      targets: this.appwindow,
      easing: "easeInOutQuad",
      duration: 250,
      translateY: this.minimized ? 0 : window.innerHeight - rect.top,
      translateX: this.minimized ? 0 : -rect.left,
      complete: () => {
        this.minimized = !this.minimized;
      },
    });
  }

  maximize() {
    if (this.fullscreen) {
      for (let key of transformVariables) {
        this.appwindow.style[key] = this.previousTransform[key];
      }
    } else {
      for (let key of transformVariables) {
        this.previousTransform[key] = this.appwindow.style[key];
      }

      this.appwindow.style.top = 0;
      this.appwindow.style.left = 0;
      this.appwindow.style.width = `${window.innerWidth}px`;
      this.appwindow.style.height = `${window.innerHeight - 50}px`;
    }

    this.onResize(window.innerWidth, window.innerHeight);

    this.fullscreen = !this.fullscreen;
  }

  childComp() {
    return this.props.children;
  }
}

export default AppWindow;
