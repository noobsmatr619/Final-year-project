//form control componennt to render fo rusers to add products to the system 

import React, { useState, useEffect, Fragment } from 'react';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl } from './../../baseUrl';

import Swal from 'sweetalert';
import './AddProduct.css';

const Add = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [duration, handleDateChange] = useState();
  const [operatorNo, setoperatorNo] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [rawMaterials, setrawMaterials] = useState([]);
  const [rawMaterial, setrawMaterial] = useState([]);

  const [description, setDescription] = useState('');
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + '/machines/getAllMachines', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        setMachines(response.data.data);
        console.log(machines);
      })
      .catch((error) => {
        Swal('error in fetching machines');
      });
    axios
      .get(baseUrl + '/rawMaterials/getAllRawMaterials', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        setrawMaterials(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleAdd = (e) => {
    e.preventDefault();
    if (
      name == '' ||
      operatorNo === null ||
      category == '' ||
      price == '' ||
      description == '' ||
      rawMaterial == '' ||
      machine == '' ||
      price <= 0 ||
      operatorNo < 0
    ) {
      let message = '';
      if (name === '') message += 'Name is required\n';
      if (operatorNo === null) message += 'Operator number is required\n';
      if (category === '') message += 'Category is required\n';
      if (price === '') message += 'Price is required\n';
      if (description === '') message += 'Description is required\n';
      if (rawMaterial == '') message += 'Raw Material is required\n';
      if (machine === '') message += 'Machine is required\n';
      if (price <= 0) {
        message += 'Price is not valid\n';
      }
      if (operatorNo < 0) {
        message += 'Operator no is not valid\n';
      }
      Swal(`
      Please provide all required fields\n
      ${message}
      `);
    } else {
      const productData = {
        name: name,
        operatorNo: operatorNo,
        duration: duration,
        category: category,
        price: price,
        rawMaterialsId: rawMaterial,
        description: description,
        machineId: machine
      };
      axios
        .post('/api/v1/products/createProduct', productData)
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
      <h1 className="mt-3 text-center">Add Products</h1>
      <Form onSubmit={handleAdd}>
        <Form.Group>
          <Form.Label>
            Name <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            data-testid="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name..."
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group> */}
        <Form.Group>
          <Form.Label>
            Category<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            data-testid="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="category..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Operator No <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="number"
            value={operatorNo}
            onChange={(e) => setoperatorNo(e.target.value)}
            placeholder="Operator No"
            min="1"
          />
        </Form.Group>
        <Form.Group>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
              ampm={false}
              openTo="hours"
              views={['hours', 'minutes', 'seconds']}
              format="HH:mm:ss"
              label="Duration"
              value={duration}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Price <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price..."
            min="1"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            Description <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>
            Select Raw Material <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            custom
            value={rawMaterial}
            onChange={(e) => {
              setrawMaterial(e.target.value);
            }}>
            <option value="">Please Select</option>
            {rawMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>
            Select Machine <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            custom
            value={machine}
            onChange={(e) => {
              setMachine(e.target.value);
            }}>
            <option value="">Please Select</option>
            {machines.map((machine1) => (
              <option key={machine1.id} value={machine1.id}>
                {machine1.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="btn-block mt-3 mb-3" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default Add;
