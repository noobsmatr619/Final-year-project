import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class ChartEx3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: {
        labels: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
        datasets: [
          {
            label: "# of Productions",
            data: [100, 37, 100, 200, 310, 400, 200],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
    };
  }
  render() {
    return (
      <>
        <div style={{ maxHeight: "45vh", maxWidth: "45%" }}>
          <Pie
            data={this.state.dataSet}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
      </>
    );
  }
}
export default ChartEx3;
