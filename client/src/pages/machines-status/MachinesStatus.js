import React, { Fragment, useState, useEffect } from 'react';
import io from 'socket.io-client';
import './MachinesStatus.css';
import Nav from '../Header/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// const socket = io('http://localhost:5000');
const socket = io('https://dmcerp.herokuapp.com');
const MachinesStatus = () => {
  const [machines, setMessage] = useState([]);
  const colors = {
    1: 'orange',
    2: 'red',
    3: 'yellow',
    4: 'green',
    5: 'purpole',
    6: 'red',
    7: 'red',
    8: 'grey'
  };

  useEffect(() => {
    socket.on('machines', (payload) => {
      setMessage(payload);
    });

    // // CLEAN UP THE EFFECT
    // return () => socket.disconnect();
  });

  return (
    <Fragment>
      <Nav></Nav>
      <Container />
      <div style={{ margin: 20 }}>
        <h1>Machines Map</h1>
        <div class="row">
          {machines.map((machine) => (
            <div
              key={machine._id}
              className="machine-card"
              style={{
                backgroundColor: `${colors[machine.status]}`
              }}>
              <h5 className="card-title">{`${machine.name}`}</h5>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MachinesStatus;
