import React, { Component } from "react";
import Body from "./components/result";

class App extends Component {
  state = {
    body: [],
    url: "http://localhost:5000/ss-standardizedsensordata",
    paramUrl: "?",
    value: ""
  };

  handleFieldAdd = event => {
    event.preventDefault();
    var newUrl = this.state.url;
    newUrl += "/" + event.target.name;
    this.setState({
      url: newUrl
    });
  };

  handleParamAdd = event => {
    event.preventDefault();
    var newUrl = this.state.paramUrl;
    if (newUrl === "?") newUrl += event.target.name;
    else newUrl += "&" + event.target.name;
    this.setState({
      paramUrl: newUrl
    });
  };

  handleReset = event => {
    event.preventDefault();
    var resetUrl = "http://localhost:5000/ss-standardizedsensordata";
    this.setState({
      url: resetUrl,
      paramUrl: "?"
    });
  };

  fetchData = () => {
    console.log("hit");
    fetch(this.state.url)
      .then(res => res.json())
      .then(data => {
        this.setState({ body: data });
      })
      .catch(console.log);
  };

  render() {
    const labels = {
      color: "white",
      backgroundColor: "black"
    };

    const parentStyle = {
      marginTop: "20px"
    };
    return (
      <div style={parentStyle}>
        <div className="container">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={this.handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" style={labels} href="#">
                  Type
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="search"
                >
                  1. Search
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="aggs"
                >
                  2. Aggregation
                </a>
                <a className="dropdown-item" style={labels} href="#">
                  Fields
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="organizationId"
                >
                  1. Organization ID
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="sensorId"
                >
                  2. Sensor ID
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="systemGuid"
                >
                  3. System GUID
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="occupancyValue"
                >
                  4. Occupancy Value
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleFieldAdd}
                  name="captureTime"
                >
                  5. Capture Time
                </a>
              </div>
            </div>
            <input
              id="urlBox"
              disabled
              type="text"
              className="form-control"
              aria-label="Text input with segmented dropdown button"
              value={
                this.state.url +
                `${this.state.paramUrl === "?" ? "" : this.state.paramUrl}`
              }
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.fetchData}
            >
              Submit
            </button>
          </div>
          <Body result={this.state.body} />
        </div>
      </div>
    );
  }
}

export default App;
