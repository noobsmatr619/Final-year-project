import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          name: "xyz",
          email: "email@gmail.com",
          role: "Staff",
          status: "Active",
        },
        {
          name: "xyz",
          email: "email1@gmail.com",
          role: "Staff",
          status: "Active",
        },
        {
          name: "xyz",
          email: "email2@gmail.com",
          role: "Staff",
          status: "Deactive",
        },
        {
          name: "xyz",
          email: "email3@gmail.com",
          role: "Staff",
          status: "Deactive",
        },
        {
          name: "xyz",
          email: "emai5l@gmail.com",
          role: "Staff",
          status: "Active",
        },
      ],
      columns: [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Role", field: "role", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true },
      ],
    };
  }
  render() {
    return (
      <>
        <Header />

        <Container fluid>
          <Row>
            <Col lg={6} md={6} xs={12}>
              <h3>First Part</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: 400, width: 600 }}
              >
                <AgGridReact
                  rowData={this.state.users}
                  columnDefs={this.state.columns}
                />
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <h3>Second Part</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: 400, width: 600 }}
              >
                <AgGridReact
                  rowData={this.state.users}
                  columnDefs={this.state.columns}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={1} md={1} xs={12}></Col>
            <Col lg={9} md={9} xs={12}>
              <h3>Buttom Part</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: 400, width: "100%" }}
              >
                <AgGridReact
                  rowData={this.state.users}
                  columnDefs={this.state.columns}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Page1;
