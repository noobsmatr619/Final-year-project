// form component to render addmachine form 
import React, { useState } from 'react';
import Nav from '../Header/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert';
//swal("Hello world!");
const Create = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [build, setBuild] = useState('');
  const [status, setStatus] = useState(1);
  const [target, setTarget] = useState(1);
  const handleCreate = (e) => {
    e.preventDefault();
    if (name == '' || model == '' || build == '') {
      let message = '';
      if (name === '') message += 'Name is required\n';
      if (model === '') message += 'Model number is required\n';
      if (build === '') message += 'Build number is required\n';

      Swal(`Please provide all required fields\n
        ${message}`);
    } else {
      const machineData = {
        name,
        model,
        build,
        status,
        target
      };
      Axios.post('/api/v1/machines/addNewMachine', machineData)
        .then((response) => {
          Swal(response.data.message);
        })
        .catch((error) => {
          Swal(error.response.data.error);
        });
    }
  };
  return (
    <div>
      <h1 className="mt-3 text-center">Add Machines</h1>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>
            Name<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Model<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Build<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={build}
            onChange={(e) => setBuild(e.target.value)}
            placeholder="Build..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Target</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target..."
          />
        </Form.Group>

        <Button
          data-testid="add-machine"
          className="btn-block mt-3 mb-3"
          variant="primary"
          type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default Create;
