import React, { Component } from 'react';
import Nav from '../Header/Header';
import axios from 'axios';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import { baseUrl } from './../../baseUrl';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Table,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import './Target.css';
import MyChart from '../../components/Dashboard/Chart2';
// sets target of each machiens for target pave 
class Target extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          headerName: 'Machine Id',
          field: 'machine',
          sortable: true,
          filter: true
        },
        {
          headerName: 'Name',
          field: 'name',
          sortable: true,
          filter: true
        },

        {
          headerName: 'Stop Time',
          field: 'stopTime',
          sortable: true,
          filter: true
        }
      ],
      activeMachines: [],
      disabledMachines: []
    };
    this.handleUpdateMachineTarget = this.handleUpdateMachineTarget.bind(this);
    this.handleChangeMachineTarget = this.handleChangeMachineTarget.bind(this);
  }

  handleChangeMachineTarget = (id) => (e) => {
    let activeMachines = this.state.activeMachines;
    activeMachines.forEach((machine) => {
      if (machine._id == id) {
        machine.target = e.target.value;
      }
    });
    this.setState({
      activeMachines
    });
  };
  handleUpdateMachineTarget = (machine) => (e) => {
    console.log(machine);
    const dataToSend = {
      id: machine._id,
      target: machine.target
    };
    axios
      .post(baseUrl + '/machines/updateMachineTarget', dataToSend, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        this.setState({
          isLoading: false
        });
        this.getActiveMachines();
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };

  getActiveMachines = () => {
    axios
      .get(baseUrl + '/machines/getAllMachines', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        this.setState({
          activeMachines: response.data.data
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };

  getMaintananceMoodMachines = () => {
    axios
      .get(baseUrl + '/machines/getMaintainanceMoodMachines', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        console.log('response', response);
        let data = response.data.data;
        let machines = [];

        data.forEach((machine) => {
          machines.push({
            machine: machine._id,
            name: machine.name,
            stopTime: moment().format('llll', machine.stopTime)
          });
        });
        this.setState({
          disabledMachines: machines
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          error: error.response.data.error
        });
      });
  };

  componentDidMount() {
    this.getActiveMachines();
    this.getMaintananceMoodMachines();
  }
  getRandomBackground = () => {
    let backgrounds = ['bg-danger', 'bg-warning', 'bg-success', 'bg-secondary'];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  };
  render() {
    return (
      <div>
        <Nav></Nav>
        <Container fluid>
          <Row>
            <Col md={12} sm={12} className="bg-sky mt-5 ">
              <h1>Targets</h1>
              <Row className="mt-5">
                {this.state.activeMachines.map((machine) => {
                  return (
                    <Col md={3} sm={12}>
                      <div
                        key={machine._id}
                        className={`${this.getRandomBackground()} d-flex justify-content-between my-card`}>
                        <div className="d-flex flex-column">
                          <span className="my-card-number font-weight-bold text-white">
                            {machine.target}
                          </span>
                          <span className="text-white">{machine.name}</span>
                        </div>
                        <div>
                          <i className="fa fa-headphones fa-2x text-white"></i>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col
                  md={12}
                  sm={12}
                  className="chart"
                  style={{ marginTop: '20px' }}>
                  {/* <MyChart></MyChart> */}
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Machine Name</th>
                        <th>Target </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.activeMachines.map((machine) => {
                        return (
                          <tr key={machine._id}>
                            <td>{machine.name}</td>
                            <td>{machine.target}</td>
                            <td>
                              <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Target"
                                  aria-label=""
                                  type="number"
                                  value={machine.target}
                                  onChange={this.handleChangeMachineTarget(
                                    machine._id
                                  )}
                                  aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                  <Button
                                    onClick={this.handleUpdateMachineTarget(
                                      machine
                                    )}
                                    variant="secondary">
                                    Update Target
                                  </Button>
                                </InputGroup.Append>
                              </InputGroup>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 3 }} sm={12}>
              <div
                className="ag-theme-alpine"
                style={{ height: 200, width: 700 }}>
                <h1 className="mt-5">Maintanance Machines List</h1>
                <AgGridReact
                  rowData={this.state.disabledMachines}
                  columnDefs={this.state.columns}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Target;
