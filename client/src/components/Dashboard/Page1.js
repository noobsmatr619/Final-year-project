import React from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert";
import { baseUrl } from "./../../baseUrl";
import { AgGridReact } from "ag-grid-react";
import { Component } from "react";

function actionCellRendererAprrove(params) {
  let eGui = document.createElement("div");

  eGui.innerHTML = `
<Button variant="primary" data-action="Accept" > Approve </Button>
`;

  return eGui;
}

function approveAsManager(params) {
  let eGui = document.createElement("div");

  eGui.innerHTML = `
<Button variant="primary" data-action="Accept" > Make Manager </Button>
`;

  return eGui;
}

function approveAsAdmin(params) {
  let eGui = document.createElement("div");

  eGui.innerHTML = `
<Button variant="primary" data-action="Accept" > Make Admin </Button>
`;

  return eGui;
}

function approveAsEmployee(params) {
  let eGui = document.createElement("div");

  eGui.innerHTML = `
<Button variant="primary" data-action="Accept" > Make Employee </Button>
`;

  return eGui;
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          headerName: "Name",
          field: "displayName",
          sortable: true,
          filter: true,
        },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        // { headerName: "Profile", field: "profile", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true },
        { headerName: "Type", field: "type", sortable: true, filter: true },
        {
          headerName: "Action",
          minWidth: 150,
          cellRenderer: actionCellRendererAprrove,
          editable: false,
          colId: "action",
        },
      ],

      ApproveUserscolumns: [
        {
          headerName: "Name",
          field: "displayName",
          sortable: true,
          filter: true,
        },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        // { headerName: "Profile", field: "profile", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true },
        { headerName: "Type", field: "type", sortable: true, filter: true },
      ],

      changeRolesColumns: [
        {
          headerName: "Name",
          field: "displayName",
          sortable: true,
          filter: true,
        },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        // { headerName: "Profile", field: "profile", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true },
        { headerName: "Type", field: "type", sortable: true, filter: true },

        {
          headerName: "Make Employee",
          minWidth: 150,
          cellRenderer: approveAsEmployee,
          editable: false,
          colId: "action",
        },

        {
          headerName: "Make Manager",
          minWidth: 150,
          cellRenderer: approveAsManager,
          editable: false,
          colId: "action",
        },

        {
          headerName: "Make Admin",
          minWidth: 150,
          cellRenderer: approveAsAdmin,
          editable: false,
          colId: "action",
        },
      ],

      unApproveUsers: [],
      approveUsers: [],
    };
  }
  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    Axios.get(`${baseUrl}/auth/getAllUsers`)
      .then((response) => {
        const data = response.data.data;
        console.log("data", data);
        let unApproveUsers = [];
        let approveUsers = [];
        data.forEach((user) => {
          if (user.status == false) {
            unApproveUsers.push(user);
          } else {
            approveUsers.push(user);
          }
        });
        this.setState({
          unApproveUsers,
          approveUsers,
        });
      })
      .catch((error) => {
        Swal(error.response.error);
      });
  };
  ApproveUser = (data) => {
    console.log(data);
    const dataToSend = {
      id: data._id,
    };
    Axios.post(`${baseUrl}/auth/approveuser`, dataToSend)
      .then((response) => {
        console.log("response", response);
         this.getAllUsers();
      })
      .catch((error) => {
        Swal(error.response.error);
      });
  };
  onCellClickedApprove = (e) => {
    if (e.colDef.headerName == "Action") {
      this.ApproveUser(e.data);
    } else {
      return;
    }
  };
  updateUserRole = (data) => {
    Axios.post(`${baseUrl}/auth/updateRole`, data)
      .then((response) => {
        console.log("response", response);
         this.getAllUsers();

      })
      .catch((error) => {
        Swal(error.response.error);
      });
  };
  onCellClickedChangeRole = (e) => {
    console.log(e.colDef.headerName, e.data);
    let data = null;
    if (e.colDef.headerName == "Make Manager") {
      data = {
        id: e.data.id,
        type: "manager",
      };
      this.updateUserRole(data);
    } else if (e.colDef.headerName == "Make Employee") {
      data = {
        id: e.data.id,
        type: "employee",
      };
      this.updateUserRole(data);
    } else if (e.colDef.headerName == "Make Admin") {
      data = {
        id: e.data.id,
        type: "admin",
      };
      this.updateUserRole(data);
    }
  };
  render() {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col lg={6} md={6} xs={12}>
              <h3>List of users</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: 400, width: 600 }}
              >
                <AgGridReact
                  rowData={this.state.unApproveUsers}
                  columnDefs={this.state.columns}
                  onCellClicked={this.onCellClickedApprove}
                />
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <h3>Role of users</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: 400, width: 600 }}
              >
                <AgGridReact
                  rowData={this.state.approveUsers}
                  columnDefs={this.state.changeRolesColumns}
                  onCellClicked={this.onCellClickedChangeRole}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={1} md={1} xs={12}></Col>
            <Col lg={9} md={9} xs={12}>
              <h3>Approved Users</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: 400, width: "100%" }}
              >
                <AgGridReact
                  rowData={this.state.approveUsers}
                  columnDefs={this.state.ApproveUserscolumns}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Admin;
