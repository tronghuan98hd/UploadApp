import React, { Component } from "react";

class Option extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderHealth = this.renderHealth.bind(this);
    this.renderYear = this.renderYear.bind(this);
  }

  renderForm = () => {
    var forms = this.props.forms.map((data) => (
      <option value={data.id} key={data.id}>
        {data.name}
      </option>
    ));
    return forms;
  };

  renderHealth = () => {
    var healths = this.props.healths.map((data) => (
      <option value={data.id} key={data.id}>
        {data.code}
      </option>
    ));
    return healths;
  };

  renderYear = () => {
    var years = new Array(20).fill(0);
    var newyear = new Date().getFullYear();
    return years.map((data, index) => (
      <option value={newyear - index} key={newyear - index}>
        {newyear - index}
      </option>
    ));
  };

  renderMonth = () => {
    var months = new Array(12).fill(0);
    return months.map((data, index) => (
      <option value={index + 1} key={index + 1}>
        {index + 1}
      </option>
    ));
  };

  renderQuarter = () => {
    var quarters = new Array(4).fill(0);
    return quarters.map((data, index) => (
      <option value={index + 1} key={index + 1}>
        {index + 1}
      </option>
    ));
  };

  render() {
    const handleFilter = (value) => {
      this.props.changeData({
        postData: {
          ...this.props.postData,
          ...value,
        },
      });
    };

    return (
      <div className="option">
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <p>
              Mẫu biểu:
              <select
                name="forms"
                className="custom-select"
                id="forms"
                onChange={(event) => handleFilter({ form: event.target.value })}
              >
                {this.renderForm()}
              </select>
            </p>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <p>
              Mã cơ sở y tế:
              <select
                name="healths"
                className="custom-select"
                id="healths"
                onChange={(event) =>
                  handleFilter({ health: event.target.value })
                }
              >
                {this.renderHealth()}
              </select>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <p>
              Năm:
              <select
                name="years"
                className="custom-select"
                id="years"
                onChange={(event) => handleFilter({ year: event.target.value })}
              >
                {this.renderYear()}
              </select>
            </p>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <p>
              Quý:
              <select
                name="quarters"
                className="custom-select"
                id="quarters"
                onChange={(event) =>
                  handleFilter({ quarter: event.target.value })
                }
              >
                {this.renderQuarter()}
              </select>
            </p>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <p>
              Tháng:
              <select
                name="months"
                className="custom-select"
                id="months"
                onChange={(event) =>
                  handleFilter({ month: event.target.value })
                }
              >
                {this.renderMonth()}
              </select>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Option;
