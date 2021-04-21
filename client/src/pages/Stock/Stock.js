import React from 'react';
import Nav from '../Header/Header';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Modal,
  Button,
  Form
} from 'react-bootstrap';
import moment from 'moment';
import '../reports/Reports.css';
import { AgGridReact } from 'ag-grid-react';
import { Component } from 'react';
import Axios from 'axios';
import { baseUrl } from './../../baseUrl';
function actionCellRenderer(params) {
  let eGui = document.createElement('div');

  eGui.innerHTML = `
<Button variant="primary" data-action="Accept" > Accept </Button>
`;

  return eGui;
}

function reejectButtonRendrer(params) {
  let eGui = document.createElement('div');

  eGui.innerHTML = `
<Button variant="primary" data-action="Accept" > Reject </Button>
`;

  return eGui;
}
class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      productToReject: 0,
      rejectId: null,
      totalProduced: -1,
      rawMaterialColumns: [
        {
          headerName: 'Id',
          field: 'id',
          sortable: true,
          filter: true
        },
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
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        {
          headerName: 'Action',
          minWidth: 150,
          cellRenderer: actionCellRenderer,
          editable: false,
          colId: 'action'
        }
      ],
      stocksColumns: [
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
          headerName: 'Id',
          field: 'id',
          sortable: true,
          filter: true
        },
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

        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        {
          headerName: 'Action',
          minWidth: 150,
          cellRenderer: reejectButtonRendrer,
          editable: false,
          colId: 'action'
        }
      ],
      rawMaterials: [],
      totalProductsProduced: [],
      stocks: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleRejectProducts = this.handleRejectProducts.bind(this);
  }
  handleRejectProducts = (e) => {
    e.preventDefault();
    const { totalProduced, rejectId, productToReject } = this.state;
    if (totalProduced < productToReject) {
      alert('Rejection Quantity Exceeed');
      return;
    }
    const dataToSend = {
      id: rejectId,
      count: productToReject
    };

    Axios.post(baseUrl + '/products/rejectProductsCount', dataToSend, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        this.setState({
          show: false,
          productToReject: 0,
          totalProduced: -1,
          rejectId: null
        });
        this.getConfirmedProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleClose = (e) => {
    this.setState({
      show: false
    });
  };
  updateToStock = (id) => {
    const dataToSend = {
      id: id
    };
    Axios.post(baseUrl + '/rawMaterials/putInStock', dataToSend, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
      }
    })
      .then((response) => {
        this.getRawMaterials();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onCellClicked = (e) => {
    console.log('clicked', e, e.data);
    const id = e.data.id;
    if (e.colDef.headerName == 'Action') {
      if (!id) {
        return;
      }
      this.updateToStock(id);
    } else {
    }
  };
  onCellClickedReject = (e) => {
    console.log('clicked', e.data);
    const id = e.data.id;
    console.log(id);
    if (e.colDef.headerName == 'Action') {
      if (!id) {
        return;
      }
      this.setState({
        rejectId: id,
        show: true,
        totalProduced: e.data.count
      });
    } else {
    }
  };

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
            id: product._id,
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
        console.log('data', data);
        let rawMaterials = [];
        let stocks = [];
        data.forEach((material) => {
          if (material.status == true) {
            stocks.push({
              count: material.count,
              machine: material.machine.name,
              type: material.type,
              date: moment().format('llll', material.date)
            });
          } else {
            rawMaterials.push({
              id: material._id,
              count: material.count,
              machine: material.machine.name,
              type: material.type,
              date: moment().format('llll', material.date)
            });
          }
        });
        this.setState({
          rawMaterials: rawMaterials,
          stocks: stocks
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
        <Container fluid>
          <h1 className="p-3 text-center text-danger">Product At Low Amount</h1>
          <Row>
            <Col md={{ span: 10, offset: 1 }} className="mt-3">
              <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 600 }}>
                <AgGridReact
                  rowData={this.state.rawMaterials}
                  columnDefs={this.state.rawMaterialColumns}
                  onCellClicked={this.onCellClicked}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 1 }} sm={12}>
              <h1 className="p-3 text-center">In Stock</h1>
              <ListGroup>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 400, width: 600 }}>
                  <AgGridReact
                    rowData={this.state.stocks}
                    columnDefs={this.state.stocksColumns}
                  />
                </div>
              </ListGroup>
            </Col>
            <Col md={{ span: 5 }} sm={12}>
              <h1 className="p-3 text-center">Production Done</h1>
              <ListGroup>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 400, width: 600 }}>
                  <AgGridReact
                    rowData={this.state.totalProductsProduced}
                    columnDefs={this.state.totalProductsProducingColumns}
                    onCellClicked={this.onCellClickedReject}
                  />
                </div>
              </ListGroup>
            </Col>
          </Row>
        </Container>

        {/* Model Starts */}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter The Quantity To Reject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Quantity"
                  value={this.state.productToReject}
                  onChange={(e) => {
                    this.setState({
                      productToReject: e.target.value
                    });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleRejectProducts}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Model End */}
      </div>
    );
  }
}

export default Stock;
