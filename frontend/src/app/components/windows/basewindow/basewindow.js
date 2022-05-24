import "./basewindow.css";
import React from "react";
import anime from "animejs/lib/anime.es.js";

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

  onResize(x, y) {
  }

  dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.setState({
      pos3: e.clientX,
      pos4: e.clientY,
    });

    document.onmouseup = (ev) => this.closeDragElement(ev, e.target);
    // call a function whenever the cursor moves:
    document.onmousemove = (ev) => this.elementDrag(ev, e.target);

  }

  elementDrag(e, target) {
    e = e || window.event;
    e.preventDefault();

    let pos2 = e.clientY < 0 ? this.state.pos2 : this.state.pos4 - e.clientY
    let pos1 = e.clientX < 0 ? this.state.pos1 : this.state.pos3 - e.clientX

    this.setState({
      pos1: pos1,
      pos2: pos2,
      pos3: e.clientX,
      pos4: e.clientY,
    });

    let targetTop = target.parentNode.offsetTop - this.state.pos2;
    let targetLeft = target.parentNode.offsetLeft - this.state.pos1;

    target.parentNode.style.top = Math.max(0, targetTop) + "px";
    target.parentNode.style.left = Math.max(0, targetLeft) + "px";
  }

  closeDragElement(ev, target) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  mouseDown() {
    document.querySelectorAll(".window").forEach((x) => {
      x.style.zIndex = 49;
    });
    this.appwindow.style.zIndex = 50;
  }

  render() {
    return (
      <div
        className="window"
        ref={this.setWindow}
        onMouseDown={() => this.mouseDown()}
      >
        <div className="title-bar" onMouseDown={(ev) => this.dragMouseDown(ev)}>
          <div className="title-bar-text">{this.props.title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={() => this.minimize()} />
            <button aria-label="Maximize" onClick={() => this.maximize()} />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">{this.childComp()}</div>
      </div>
    );
  }

  minimize() {
    let top = this.appwindow.getBoundingClientRect().top;
    anime({
      targets: this.appwindow,
      easing: "easeInOutQuad",
      duration: 250,
      translateY: this.minimized ? 0 : window.innerHeight - top,
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
