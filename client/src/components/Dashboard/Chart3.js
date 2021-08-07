import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class ChartEx3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: '# of Productions',
            data: [
              this.props.empPieChart.monday,
              this.props.empPieChart.tuesday,
              this.props.empPieChart.wednesday,
              this.props.empPieChart.thursday,
              this.props.empPieChart.friday,
              this.props.empPieChart.saturday,
              this.props.empPieChart.sunday
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      }
    };
  }
  render() {
    return (
      <>
        <div style={{ maxHeight: '45vh', maxWidth: '45%' }}>
          <Pie
            data={this.state.dataSet}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </>
    );
  }
}
export default ChartEx3;
