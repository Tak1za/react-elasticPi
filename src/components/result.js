import React from "react";
import { Chart } from "react-google-charts";

class Body extends React.Component {
  render() {
    var rows = [];
    var currentField = "";
    var middleField = "";
    var innerField = "";
    console.log(this.props.result);
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
    console.log(currentField);
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
                      <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center py-1">
                        <a
                          className="btn btn-primary"
                          data-toggle="collapse"
                          href={`#i${res[current]}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls={res[current]}
                        >
                          {current}: {res[current]}
                          <span className="badge badge-primary badge-pill">
                            {res.doc_count}
                          </span>
                        </a>
                      </li>
                      <ul
                        className="list-group collapse"
                        id={`i${res[current]}`}
                      >
                        {res[middleField]
                          ? res[middleField].map(resMiddle => (
                              <div key={resMiddle[middle]}>
                                <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center py-1">
                                  {middle}: {resMiddle[middle]}
                                  <span className="badge badge-primary badge-pill">
                                    {resMiddle.doc_count}
                                  </span>
                                </li>
                                <ul
                                  className="list-group"
                                  id={resMiddle[middle]}
                                >
                                  {resMiddle[innerField]
                                    ? resMiddle[innerField].map(resInner => (
                                        <div key={resInner[inner]}>
                                          <li className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center py-1">
                                            {inner}: {resInner[inner]}
                                            {console.log(resInner[inner])}
                                            <span className="badge badge-primary badge-pill">
                                              {resInner.doc_count}
                                            </span>
                                          </li>
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
