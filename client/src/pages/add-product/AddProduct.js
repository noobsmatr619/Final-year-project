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
    // console.log({
    //   name,
    //   operatorNo,
    //   image,
    //   category,
    //   price,
    //   duration,
    //   description,
    //   rawMaterial,
    //   machine
    // });
    if (
      (name == '' ||
        operatorNo === null ||
        image == '' ||
        category == '' ||
        price == '' ||
        description == '',
      machine == '')
    ) {
      Swal('please provid all required fields');
    } else {
      // let productData = new FormData();
      // productData.append('name', name);
      // productData.append('operatorNo', operatorNo);
      // productData.append('duration', duration);
      // productData.append('category', category);
      // productData.append('price', price);
      // productData.append('rawMaterialsId', rawMaterial);
      // productData.append('description', description);
      // productData.append('machineId', machine);
      // console.log(productData);
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
        .post(
          '/api/v1/products/createProduct',
          productData
        )
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
          <Form.Label>Name</Form.Label>
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
          <Form.Label>Category</Form.Label>
          <Form.Control
            data-testid="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="category..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Operator No.</Form.Label>
          <Form.Control
            type="number"
            value={operatorNo}
            onChange={(e) => setoperatorNo(e.target.value)}
            placeholder="Name..."
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
          <Form.Label>price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Name..."
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Textarea</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Select RawMaterial</Form.Label>
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
          <Form.Label>Select Machine</Form.Label>
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
