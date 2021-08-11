import React, { Fragment, useEffect, useState } from 'react';
import Nav from '../Header/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { baseUrl } from './../../baseUrl';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const MachinesList = () => {
  const [machines, setMachines] = useState([]);
  const [isLoadingMachines, setLoadingMachines] = useState(true);

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
        <h3>Machines Target</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col">Target</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((machine) => (
              <tr key={machine._id}>
                <th>{machine.name}</th>
                <td>{machine.model}</td>
                <td>{machine.target}</td>
                <td>{machine.status}</td>
                <td>
                  <Link to={`/machines/update/${machine._id}`}>
                    <EditIcon></EditIcon>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default MachinesList;
