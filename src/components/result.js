import React from "react";
import { Chart } from "react-google-charts";

class Body extends React.Component {
  render() {
    var rows = [];
    var currentKey = "";
    console.log(this.props.result);
    for (var key in this.props.result) {
      currentKey = key;
      for (var item in this.props.result[key]) {
        rows.push(this.props.result[key][item]);
      }
    }

    var keyList = currentKey.split("_");
    var current = keyList[0];
    console.log(current);

    const data = rows.map(res => [res.sensorId, res.doc_count]);
    data.unshift(["IDs", "Number of sensors"]);
    console.log(data);

    return (
      <div>
        <center>
          <b>{currentKey}</b>
        </center>
        <br />
        <div class="row">
          <div className="col-md-4">
            <ul className="list-group">
              {rows.map(res => (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Id: {res[current]}
                  <span className="badge badge-primary badge-pill">
                    {res.doc_count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8">
            <Chart
              height="400px"
              chartType="BarChart"
              data={data}
              options={{
                hAxis: {
                  title: "Count"
                },
                vAxis: {
                  title: "IDs"
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
