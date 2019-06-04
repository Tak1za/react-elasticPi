import React from "react";
import { Chart } from "react-google-charts";

class Body extends React.Component {
  render() {
    var rows = [];
    var middleRows = [];
    var currentField = "";
    var middleField = "";
    var innerField = "";
    for (var key in this.props.result) {
      currentField = key;
      for (var item in this.props.result[key]) {
        rows.push(this.props.result[key][item]);
        for (var middleKey in this.props.result[key][item]) {
          if (this.props.result[key][item][middleKey] instanceof Array) {
            middleField = middleKey;
            for (var middleItem in this.props.result[key][item][middleKey]) {
              for (var innerKey in this.props.result[key][item][middleKey][
                middleItem
              ]) {
                if (
                  this.props.result[key][item][middleKey][middleItem][
                    innerKey
                  ] instanceof Array
                ) {
                  innerField = innerKey;
                }
              }
            }
          }
        }
      }
    }

    console.log(rows);
    console.log(middleRows);
    var keyList = currentField.split("_");
    var current = keyList[0];
    var keyList1 = middleField.split("_");
    var middle = keyList1[0];
    var keyList2 = innerField.split("_");
    var inner = keyList2[0];
    console.log("Current " + current);
    console.log("MIddle " + middle);
    console.log("Inner " + inner);

    const data = rows.map(res => [res[current], res.doc_count]);
    data.unshift(["IDs", "Count"]);
    console.log(data);

    return (
      <div>
        <center>
          <b>{currentField}</b>
        </center>
        <br />
        <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
            <ul className="list-group">
              {rows
                ? rows.map(res => (
                    <div key={res[current]}>
                      <a
                        className="dropdown-item"
                        data-toggle="collapse"
                        href={`#${res[current]}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={res[current]}
                      >
                        <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                          ID: {res[current]}
                          <span className="badge badge-primary badge-pill">
                            {res.doc_count}
                          </span>
                        </li>
                      </a>
                      <ul className="collapse list-group" id={res[current]}>
                        {res[middleField]
                          ? res[middleField].map(resMiddle => (
                              <div key={resMiddle[middle]}>
                                <a
                                  className="dropdown-item"
                                  role="button"
                                  data-toggle="collapse"
                                  href={`#${resMiddle[middle]}`}
                                  aria-controls={resMiddle[middle]}
                                  aria-expanded="false"
                                >
                                  <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center">
                                    ID: {resMiddle[middle]}
                                    <span className="badge badge-primary badge-pill">
                                      {resMiddle.doc_count}
                                    </span>
                                  </li>
                                </a>
                                <ul
                                  className="list-group collapse"
                                  id={resMiddle[middle]}
                                >
                                  {resMiddle[innerField]
                                    ? resMiddle[innerField].map(resInner => (
                                        <div key={resInner[inner]}>
                                          <a className="dropdown-item" href="#">
                                            <li className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center">
                                              ID: {resInner[inner]}
                                              {console.log(resInner[inner])}
                                              <span className="badge badge-primary badge-pill">
                                                {resInner.doc_count}
                                              </span>
                                            </li>
                                          </a>
                                        </div>
                                      ))
                                    : ""}
                                </ul>
                              </div>
                            ))
                          : console.log("HITTTT")}
                      </ul>
                    </div>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
