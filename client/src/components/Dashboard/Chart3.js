import React, { Fragment, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { baseUrl } from './../../baseUrl';
// main data chart 1 and 2 merged together 
const ChartEx3 = (props) => {
  const dataSet = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    datasets: [
      {
        label: '# of Productions',
        data: [
          props.object.monday,
          props.object.tuesday,
          props.object.wednesday,
          props.object.thursday,
          props.object.friday,
          props.object.saturday,
          props.object.sunday
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };
  
  return (
    <Fragment>
      <div style={{ maxHeight: '45vh', maxWidth: '45%' }}>
        <Pie
          data={dataSet}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    </Fragment>
  );
};
export default ChartEx3;
