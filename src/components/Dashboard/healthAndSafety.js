import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import HealthSafetyForm from "./../../pages/health-safety/Form";
import TopContainer from "./../../pages/health-safety/Top-Container";
import ButtomContainer from "./../../pages/health-safety/Buttom-Container";
import { Container, Col, Row } from "react-bootstrap";
class HealthSafety extends Component {
  render() {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col lg={5} md={5} xs={12} className='p-3 bg-shadow'>
              <h3 className='p-3'>Form</h3>
              <HealthSafetyForm />
            </Col>
            <Col lg={7} md={7} xs={12}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <h3 className='p-3'>Accident Prone Areas</h3>
                  <TopContainer />
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <h3 className='p-3'>Recent Accidents</h3>
                  <ButtomContainer />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default HealthSafety;
