import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { AgGridReact } from "ag-grid-react";
import { Container, Col, Row } from "react-bootstrap";
class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: "xyz",
          price: 100,
          amount: 1003,
          category: "Sports",
          purchaseDate: "20-10-2020",
          quantityLeft: 1000,
        },
        {
          name: "abc",
          price: 120,
          amount: 10032,
          category: "Gym",
          purchaseDate: "21-10-2020",
          quantityLeft: 122,
        },
        {
          name: "P1",
          price: 10,
          amount: 101111,
          category: "Sports",
          purchaseDate: "12-11-2020",
          quantityLeft: 1111,
        },
        {
          name: "xyz",
          price: 100,
          amount: 1003,
          category: "Sports",
          purchaseDate: "20-10-2020",
          quantityLeft: 1000,
        },
        {
          name: "abc",
          price: 120,
          amount: 10032,
          category: "Gym",
          purchaseDate: "21-10-2020",
          quantityLeft: 122,
        },
        {
          name: "P1",
          price: 10,
          amount: 101111,
          category: "Sports",
          purchaseDate: "12-11-2020",
          quantityLeft: 1111,
        },
        {
          name: "xyz",
          price: 100,
          amount: 1003,
          category: "Sports",
          purchaseDate: "20-10-2020",
          quantityLeft: 1000,
        },
        {
          name: "abc",
          price: 120,
          amount: 10032,
          category: "Gym",
          purchaseDate: "21-10-2020",
          quantityLeft: 122,
        },
        {
          name: "P1",
          price: 10,
          amount: 101111,
          category: "Sports",
          purchaseDate: "12-11-2020",
          quantityLeft: 1111,
        },
        {
          name: "xyz",
          price: 100,
          amount: 1003,
          category: "Sports",
          purchaseDate: "20-10-2020",
          quantityLeft: 1000,
        },
        {
          name: "abc",
          price: 120,
          amount: 10032,
          category: "Gym",
          purchaseDate: "21-10-2020",
          quantityLeft: 122,
        },
        {
          name: "P1",
          price: 10,
          amount: 101111,
          category: "Sports",
          purchaseDate: "12-11-2020",
          quantityLeft: 1111,
        },
      ],
      columns: [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Price", field: "price", sortable: true, filter: true },
        { headerName: "Amount", field: "amount", sortable: true, filter: true },
        {
          headerName: "Purchasing Date",
          field: "purchaseDate",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Quantity Left",
          field: "quantityLeft",
          sortable: true,
          filter: true,
        },
      ],
    };
  }
  render() {
    return (
      <>
        <Header />

        <Container fluid>
          <Row>
            <Col lg={4} md={4} xs={12}>
              <h3>First Part</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: "70vh", width: "100%" }}
              >
                <AgGridReact
                  rowData={this.state.products}
                  columnDefs={this.state.columns}
                />
              </div>
            </Col>
            <Col lg={4} md={4} xs={12}>
              <h3>Second Part</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: "70vh", width: "100%" }}
              >
                <AgGridReact
                  rowData={this.state.products}
                  columnDefs={this.state.columns}
                />
              </div>
            </Col>
            <Col lg={4} md={4} xs={12}>
              <h3>Third Part</h3>
              <div
                className='ag-theme-alpine'
                style={{ height: "70vh", width: "100%" }}
              >
                <AgGridReact
                  rowData={this.state.products}
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
export default Page2;
