import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";
// static page for showing to supervisor and usability test 
class Page2 extends Component {
  render() {
    return (
      <>
        <Header />

        <Container fluid>
          <Row>
            <Col lg={3} md={3} xs={12}>
              <h3>First Part</h3>
            </Col>
            <Col lg={9} md={9} xs={12}>
              <h3>Second Part</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={3} xs={12}></Col>
            <Col lg={3} md={3} xs={12}>
              <h3>Button Part</h3>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Page2;
