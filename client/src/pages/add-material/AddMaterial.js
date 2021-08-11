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
    if (
      name == '' ||
      type == '' ||
      count == '' ||
      price == '' ||
      price < 1 ||
      count < 1 ||
      machine == ''
    ) {
      let message = '';
      if (name === '') message += 'Name is required\n';
      if (type === '') message += 'Type is required\n';
      if (count === '') message += 'Quantity is required\n';
      if (price === '') message += 'Price is required\n';
      if (price < 1) message += 'Price is not valid\n';
      if (count < 1) message += 'Quantity is not valid\n';
      if (machine === '') message += 'Please select machine\n';

      Swal(`Please provide all required fields\n
        ${message}`);
    } else {
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
    }
  };
  return (
    <div>
      <h1 className="text-center mt-3">Add Material </h1>
      <Form>
        <Form.Group>
          <Form.Label>
            Name<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            data-testid="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Product Type<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            data-testid="type"
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Product Quantity<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            data-testid="quantity"
            type="number"
            min={1}
            placeholder="Quantity"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Price<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            data-testid="price"
            type="number"
            min={1}
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
            <option value="">Select Machine</option>
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
