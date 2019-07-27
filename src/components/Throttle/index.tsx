import React, { Component } from "react";

export default function Throttle(Comp: any) {
  return class ThrottledComponent extends Component<any> {
    lastUpdate: number = Date.now();
    updateTimer: NodeJS.Timeout = null;

    shouldComponentUpdate() {
      if (Date.now() - this.lastUpdate > 16) {
        this.lastUpdate = Date.now();
        clearTimeout(this.updateTimer);
        return true;
      } else {
        this.updateTimer = setTimeout(() => this.forceUpdate(), 100);
      }
      return false;
    }

    render() {
      return <Comp {...this.props} />;
    }
  };
}
