import React, { Component } from 'react';
import Nav from '../Header/Header';
import moment from 'moment';
import Axios from 'axios';
import { baseUrl } from './../../baseUrl';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Table,
  InputGroup,
  FormCheck,
  ProgressBar
} from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawMaterialColumns: [
        {
          headerName: 'Raw Material Count',
          field: 'count',
          sortable: true,
          filter: true
        },
        {
          headerName: 'Machine',
          field: 'machine',
          sortable: true,
          filter: true
        },

        {
          headerName: 'Raw Material Type',
          field: 'type',
          sortable: true,
          filter: true
        },
        { headerName: 'Date', field: 'date', sortable: true, filter: true }
      ],
      totalProductsProducingColumns: [
        {
          headerName: 'Product Count',
          field: 'count',
          sortable: true,
          filter: true
        },
        {
          headerName: 'Machine',
          field: 'machine',
          sortable: true,
          filter: true
        },
        {
          headerName: 'Product',
          field: 'product',
          sortable: true,
          filter: true
        },

        { headerName: 'Date', field: 'date', sortable: true, filter: true }
      ],
      rawMaterials: [],
      totalProductsProduced: []
    };
  }

  getConfirmedProducts = () => {
    Axios.get(baseUrl + '/products/getProductsProduced', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        const data = response.data.data;
        let totalProductsProduced = [];
        data.forEach((product) => {
          totalProductsProduced.push({
            count: product.count,
            machine: product.machine.name,
            product: product.product.name,
            date: moment().format('llll', product.date)
          });
        });
        this.setState({
          totalProductsProduced: totalProductsProduced
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getRawMaterials = () => {
    Axios.get(baseUrl + '/rawMaterials/getAllRawMaterials', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        const data = response.data.data;
        let rawMaterials = [];
        data.forEach((material) => {
          rawMaterials.push({
            count: material.count,
            machine: material.machine.name,
            type: material.type,
            date: moment().format('llll', material.date)
          });
        });
        this.setState({
          rawMaterials: rawMaterials
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getConfirmedProducts();
    this.getRawMaterials();
  }
  render() {
    return (
      <div>
        <Nav></Nav>
        <Container>
          <h1 className="mt-3">Confirmation</h1>
          <Row className="mt-3">
            <Col md={12} sm={12}>
              <ListGroup variant="flush">
                <ListGroup.Item className="active font-weight-bold">
                  Confirmed products
                </ListGroup.Item>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 400, width: 1110 }}>
                  <AgGridReact
                    rowData={this.state.totalProductsProduced}
                    columnDefs={this.state.totalProductsProducingColumns}
                  />
                </div>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={8} sm={12}>
              <ListGroup className="mt-5" variant="flush">
                <ListGroup.Item
                  className="active font-weight-bold "
                  style={{ width: 1110 }}>
                  Stock list
                </ListGroup.Item>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 400, width: 1110 }}>
                  <AgGridReact
                    rowData={this.state.rawMaterials}
                    columnDefs={this.state.rawMaterialColumns}
                  />
                </div>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Confirm;
