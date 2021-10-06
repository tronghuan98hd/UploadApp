import React, { Component } from "react";

class Show extends Component {
  render() {
    return (
      <img
        src={this.props.selectImg.link}
        id={this.props.selectImg.id}
        alt=""
        className="large-preview"
      />
    );
  }
}
export default Show;
