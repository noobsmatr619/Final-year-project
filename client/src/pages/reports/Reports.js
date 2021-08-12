import React, { Fragment, useEffect, useState } from 'react';
import Nav from '../Header/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { baseUrl } from './../../baseUrl';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
const colors = {
    1: 'orange',
    2: 'red',
    3: 'yellow',
    4: 'green',
    5: 'purpole',
    6: 'red',
    7: 'red',
    8: 'grey',
    0: 'grey'
  };
//reportd of each machiens 
const Reports = () => {
  const [machines, setMachines] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isLoadingMachines, setLoadingMachines] = useState(true);
  const data = {
    labels: [],
    datasets: [
        {
        label: 'Machines Target Graph',
        data: [],
        backgroundColor: [],
        },
    ],
  };
    const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
  //list of all machine s
const getAllMachines = async () => {
    try {
      const response = await Axios.get(
        baseUrl + '/machines/getAllMachinesWithAnyStatus',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
          }
        }
      );

      console.log('Machines');
      console.log(response.data);

      setLoadingMachines(false);
        setMachines(response.data);
        console.log("machines targets")
        console.log(response.data)
        response.data.forEach(machine => {
            data.labels.push(machine.name);
            data.datasets[0].data.push(machine.target);
            data.datasets[0].backgroundColor.push(`${colors[machine.status]}`);
        });
        console.log("machines charts data")
        console.log(data)
        setChartData(data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    if (isLoadingMachines) {
        getAllMachines();
    }
  }, []);

  return (
    <Fragment>
      <Nav></Nav>
      <Container></Container>
      <div style={{ margin: 50 }}>
        <h3>Machines Target Graph</h3>
       <Bar data={chartData} options={options} />
      </div>
    </Fragment>
  );
};

export default Reports;
