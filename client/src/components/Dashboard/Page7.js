import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";
//set up for only usability test 
class Page2 extends Component {
  render() {
    return (
      <>
        <Header />

        <Container>
          <Row>
            <Col lg={3} md={3} xs={12}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <h3>Full Left</h3>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <h4>First Part </h4>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <h4>Second Part </h4>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <h4>Third Part </h4>
                </Col>
              </Row>
            </Col>
            <Col lg={3} md={3} xs={12}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <h3>Upper Right</h3>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <h3>Lower Right</h3>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Page2;
