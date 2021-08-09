import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './../../baseUrl';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert';
const AddMaterial = () => {
  const [machines, setMachines] = useState([]);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [machine, setMachine] = useState('');
  const [price, setPrice] = useState('');
  useEffect(() => {
    axios
      .get(baseUrl + '/machines/getAllMachines', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        setMachines(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const save = (e) => {
    e.preventDefault();
    const data = {
      type,
      count,
      machine,
      name,
      price
    };
    console.log(data);
    axios
      .post(baseUrl + '/rawMaterials/addNewRawMaterial', data)
      .then((response) => {
        Swal('Raw Material Added');
      })
      .catch((error) => {
        Swal(error.response.data.error);
      });
  };
  return (
    <div>
      <h1 className="text-center mt-3">Add Material </h1>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            data-testid="name"
            type="text"
            placeholder="Type"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Type</Form.Label>
          <Form.Control
            data-testid="type"
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            data-testid="quantity"
            type="text"
            placeholder="Quantity"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            data-testid="price"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Select Machine</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(e) => setMachine(e.target.value)}>
            {machines.map((machine) => (
              <option key={machine.id} value={machine.id}>
                {machine.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Button onClick={save}>Add</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddMaterial;
