import React, { Component } from "react";

class Show extends Component {
  render() {
    return (
      // <img
      //   src={this.props.selectImg.link}
      //   id={this.props.selectImg.id}
      //   alt=""
      //   className="large-preview"
      // />
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTFzyBwZPlRHFiLLrvxBssLVT18FIbr0itRd86a6Lj1__7MQyRfZxXpT8yAWzJe5MJJXVj1ieoO4gcT/pubhtml?widget=true&amp;headers=false"
        style={{ height: "100%", width: "100%" }}
        headers="true"
      ></iframe>
    );
  }
}
export default Show;
