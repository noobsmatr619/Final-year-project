import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ChartEx1 extends Component {
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
          {
            label: "# of Machines",
            data: [50, 70, 101, 19, 90, 80, 100],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    };
  }
  render() {
    return (
      <>
        <div style={{ maxHeight: "98%", maxWidth: "100%" }}>
          <Bar
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
export default ChartEx1;
