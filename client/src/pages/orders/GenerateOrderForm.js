import React, { Component } from 'react';
import Nav from '../Header/Header';
import axios from 'axios';
import { baseUrl } from './../../baseUrl';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert';

class GenerateOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      count: 0,
      assignedTo: null,
      provider: '',
      isError: false,
      error: '',
      isLoading: false,
      show: false,
      employees: [],
      product: '',
      products: []
    };

    this.placeNewOrder = this.placeNewOrder.bind(this);
  }
  getAllEmployees = () => {
    axios
      .get(baseUrl + '/auth/getEmployeeAndStaff', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        console.log('reposne', response);
        this.setState({
          employees: response.data.data,
          assignedTo: response.data.data[0]._id
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };

  getAllProducts = () => {
    axios
      .get(baseUrl + '/products/getAllProducts', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        console.log('reposne', response);
        this.setState({
          products: response.data.data,
          product: response.data.data[0]._id,
          price: response.data.data[0].price
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };

  placeNewOrder = (e) => {
    if (
      this.state.product == '' ||
      this.state.count == 0 ||
      this.state.count < 0 ||
      this.state.assignedTo == null ||
      this.state.provider == ''
    ) {
      let message = '';
      if (this.state.product === '') message += 'Product is required\n';
      if (this.state.count == 0) message += 'Quantity is required\n';
      if (this.state.count < 0) message += 'Quantity is not valid\n';
      if (this.state.assignedTo == null) message += 'Assigned To is required\n';
      if (this.state.provider == '') message += 'Provider is required\n';

      Swal(`Please provide all required fields\n
        ${message}`);
    } else {
      this.setState({
        isLoading: true
      });
      axios
        .post(baseUrl + '/orders/placeMyOrder', this.state, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
          }
        })
        .then((response) => {
          this.setState({
            isLoading: false
          });
          Swal('Order is Assigned');
        })
        .catch((error) => {
          this.setState({
            isError: true,
            error: error.response.data.error
          });
        });
    }
  };
  componentDidMount() {
    this.getAllEmployees();
    this.getAllProducts();
  }
  render() {
    return (
      <div>
        <h1 className="text-center mt-3">Assing Order </h1>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              Select product<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              value={this.state.product}
              onChange={(e) => {
                let price;
                this.state.products.forEach((product) => {
                  if (product._id == e.target.value) {
                    price = product.price;
                  }
                });

                this.setState({
                  product: e.target.value,
                  price
                });
              }}
              as="select">
              {this.state.products.map((product) => {
                return (
                  <option key={product._id} value={product._id}>
                    {product.name}{' '}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Product Quantity<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantity"
              value={this.state.count}
              onChange={(e) => {
                this.setState({
                  count: e.target.value
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              Select Person To Assign a Order
              <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              value={this.state.assignedTo}
              onChange={(e) => {
                this.setState({
                  assignedTo: e.target.value
                });
              }}
              as="select">
              {this.state.employees.map((employee) => {
                return (
                  <option key={employee._id} value={employee._id}>
                    {`${employee.displayName}(${employee.type})`}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Buyer Name
              <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              data-testid="buyerName"
              placeholder="Buyer Name"
              value={this.state.provider}
              onChange={(e) => {
                this.setState({
                  provider: e.target.value
                });
              }}
            />
          </Form.Group>

          <Form.Group>
            <Button disable={this.state.isLoading} onClick={this.placeNewOrder}>
              {this.state.isLoading ? 'Wait...' : 'Assign Order'}
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default GenerateOrderForm;
