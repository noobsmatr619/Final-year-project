import React, { Component } from 'react';
import Nav from '../Header/Header';
import ReactTable from 'react-table-6';
import axios from 'axios';
import {
  updateOrderAcceptOrReject,
  processedOrder,
  pieChartOrders,
  wipOrder,
  plannedOrder
} from '../../actions/staffAction';
import { baseUrl } from './../../baseUrl';
import { connect } from 'react-redux';
import { OnlyLoadUser } from '../../actions/authActions';
import { AgGridReact } from 'ag-grid-react';

import {
  Container,
  Row,
  Col,
  ListGroup,
  ProgressBar,
  Form,
  Button,
  Modal
} from 'react-bootstrap';
import './Emp.css';
import MyChart from '../../components/Dashboard/Chart3';
class Emp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Order Id',
          accessor: 'order',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Quantity',
          accessor: 'count',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Assigned By',
          accessor: 'assignedBy',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Status',
          accessor: 'status',
          width: 150,
          Cell: (row) =>
            row?.value === 0
              ? 'Started'
              : row?.value === 1
              ? 'Work in Progress'
              : row?.value === 2
              ? 'Done'
              : row?.value === 3
              ? 'Accepted'
              : row?.value === 4 && 'Rejected'
        },
        {
          Header: 'Product',
          accessor: 'product',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Price',
          accessor: 'price',
          width: 150,
          Cell: (row) => row?.value
        },
        {
          Header: 'Action',
          accessor: 'action',
          width: 250,
          Cell: (row) => {
            console.log(row);
            if (row?.original.status <= 2) {
              return (
                <>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={async (e) => {
                      const preData = {
                        id: row?.original.order,
                        status: 3
                      };
                      await this.props.updateOrderAcceptOrReject(preData);
                      await this.getMyOrders();
                    }}>
                    Accept
                  </Button>{' '}
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={async (e) => {
                      const preData = {
                        id: row?.original.order,
                        status: 0
                      };
                      await this.props.updateOrderAcceptOrReject(preData);
                      await this.getMyOrders();
                    }}>
                    Reject
                  </Button>
                </>
              );
            } else if (row?.original.status > 2) {
              return 'Processed';
            }
          }
        }
      ],
      tasks: [],
      task: '',
      displayNameChange: null,
      emailChange: null,
      email: 'Loading',
      displayName: 'Loading',
      type: 'Loading',
      accountStatus: 'Loading',
      isError: false,
      error: '',
      isLoading: false,
      show: false,
      orders: []
    };
    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.markTaskComplete = this.markTaskComplete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestChangeAccountDetails =
      this.handleRequestChangeAccountDetails.bind(this);
  }
  componentWillMount() {
    this.props.processedOrder();
  }
  handleRequestChangeAccountDetails = (e) => {
    const { emailChange, displayNameChange } = this.state;
    const dataToSend = {
      email: emailChange === null ? this.props.user.email : emailChange,
      displayName:
        displayNameChange === null
          ? this.props.user.displayName
          : displayNameChange
    };
    axios
      .post(baseUrl + '/auth/requestAccountChangeDetails', dataToSend, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then(async (response) => {
        await this.props.OnlyLoadUser();
        this.setState({
          show: false
        });
        console.log({ response });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  getMe = () => {
    axios
      .get(baseUrl + '/auth/getMe', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        const data = response.data.data;
        let accountStatus;
        if (data.status == true) {
          accountStatus = 'Active';
        } else {
          accountStatus = 'Pending';
        }
        this.setState({
          displayName: data.displayName,
          email: data.email,
          displayNameChange: data.displayName,
          emailChange: data.email,
          type: data.type,
          accountStatus: accountStatus
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };
  getMyOrders = () => {
    this.setState({
      isLoading: true
    });
    axios
      .get(baseUrl + '/orders/getEmployeeOrders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        const data = response.data.data;
        let orders = [];

        data.forEach((order) => {
          orders.push({
            order: order._id,
            count: order.count,
            status: order.status,
            assignedBy: order.assignedBy.displayName,
            product: order.product.name,
            price: order.price
          });
        });
        this.setState({
          orders,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };

  markTaskComplete = (id) => (e) => {
    e.preventDefault();
    const dataToSend = {
      id
    };
    axios
      .post(baseUrl + '/tasks/markCompleted', dataToSend, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        this.getAllTasks();
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };
  getAllTasks = () => {
    axios
      .get(baseUrl + '/tasks/getAllTasks', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        this.setState({
          tasks: response.data.data
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };
  handleAddNewTask = (e) => {
    const { task } = this.state;
    if (task == '') {
      return;
    }
    let dataTosend = {
      task: task
    };
    this.setState({
      isLoading: true,
      task: ''
    });
    axios
      .post(baseUrl + '/tasks/createTask', dataTosend, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        this.setState({
          isLoading: false
        });
        this.getAllTasks();
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };
  componentDidMount() {
    this.getAllTasks();
    this.getMe();
    this.getMyOrders();
    this.props.pieChartOrders();
    this.props.plannedOrder();
    this.props.wipOrder();
  }
  render() {
    return (
      <div>
        <Nav></Nav>
        <Container>
          <h1>Employee view </h1>
          <Row>
            <Col md={12} sm={12}>
              <Row className="mt-3">
                <Col md={6} sm={12}>
                  <div className="bg-danger d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        My Details
                      </span>
                      <span className="text-white">
                        Name : {this.props.user.displayName}
                      </span>
                      <span className="text-white">
                        Email : {this.props.user.email}
                      </span>
                      <span className="text-white">
                        Account Type : {this.props.user.type}
                      </span>
                      {/* <span className="text-white">
                        Account Status : {this.props.user.accountStatus}
                      </span> */}
                    </div>
                    <div>
                      <i
                        onClick={(e) => {
                          this.setState({
                            show: true
                          });
                        }}
                        className="fa fa-pencil-alt fa-2x text-white"
                        style={{ cursor: 'pointer' }}></i>
                    </div>
                  </div>
                </Col>
                <Col md={6} sm={12}>
                  <div className="bg-success d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        {this.props.order}
                      </span>
                      <span className="text-white">Orders Processed</span>
                    </div>
                    <div>
                      <i className="fa fa-user fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6} sm={12}>
                  <div className="bg-primary d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        {this.props.wipOrderCount}
                      </span>
                      <span className="text-white">Planned Order</span>
                    </div>
                    <div>
                      <i className="fa fa-pencil-alt fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
                <Col md={6} sm={12}>
                  <div className="bg-warning d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        {this.props.plannedOrderCount}
                      </span>
                      <span className="text-white">WIP Order</span>
                    </div>
                    <div>
                      <i className="fa fa-image fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={3} sm={12}>
              <ListGroup>
                <ListGroup.Item className=" active bg-sky">
                  <h3 className="text-white">My Tasks</h3>
                  <p className="text-white">All Your to do list.</p>

                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Enter Task"
                        value={this.state.task}
                        onChange={(e) => {
                          this.setState({
                            task: e.target.value
                          });
                        }}
                      />
                      <br />
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={this.state.isLoading}
                        onClick={this.handleAddNewTask}>
                        {this.state.isLoading ? 'Wait...' : 'Add New Task'}
                      </Button>
                    </Form.Group>
                  </Form>
                </ListGroup.Item>
                {this.state.tasks.map((task) => {
                  return task.isCompleted ? (
                    <ListGroup.Item
                      className="d-flex justify-content-between"
                      key={task._id}>
                      <div className="d-flex">
                        <span className="d-flex flex-column ml-2">
                          <span className="">
                            <del>{task.task}</del>
                          </span>
                        </span>
                      </div>
                      <i className="fa fa-check mt-2 text-primary"></i>
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item
                      className="d-flex justify-content-between"
                      key={task._id}>
                      <div className="d-flex">
                        <span className="d-flex flex-column ml-2">
                          <span>{task.task}</span>
                        </span>
                      </div>
                      <i
                        className="fa fa-check mt-2 text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={this.markTaskComplete(task._id)}></i>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>

            <Col md={3} sm={12}>
              <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 900 }}>
                <ReactTable
                  data={this.state.orders}
                  columns={this.state.columns}
                  noDataText={'no Recod Found!'}
                  minRows={10}
                  defaultPageSize={10}
                  minWidth={1000}
                  loading={this.state.isLoading}
                  loadingText={'Loading...'}
                  showFilters={true}
                  className="react-table -striped -highlight"
                />
                {/* <AgGridReact
                  rowData={this.state.orders}
                  columnDefs={this.state.columns}
                /> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} className="chart">
              <MyChart empPieChart={this.props.empPieChart}></MyChart>
            </Col>
          </Row>
        </Container>

        {/* Model Starts */}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request Change Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue={this.props.user.displayName}
                  value={this.state.displayNameChange}
                  onChange={(e) => {
                    this.setState({
                      displayNameChange: e.target.value
                    });
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  defaultValue={this.props.user.email}
                  value={this.state.emailChange}
                  onChange={(e) => {
                    this.setState({
                      emailChange: e.target.value
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
            <Button
              variant="primary"
              onClick={this.handleRequestChangeAccountDetails}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Model End */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.app.user,
  order: state.app.processedOrder,
  wipOrderCount: state.app.wipOrder,
  plannedOrderCount: state.app.plannedOrder,
  empPieChart: state.app.empPieChart
});
export default connect(mapStateToProps, {
  OnlyLoadUser,
  updateOrderAcceptOrReject,
  processedOrder,
  pieChartOrders,
  wipOrder,
  plannedOrder
})(Emp);
