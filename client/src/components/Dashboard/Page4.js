import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";
import "./styles/page4.css";
//static data to showcase materials to user for testing purpose
class Page2 extends Component {
  render() {
    return (
      <>
        <Header />

        <Container fluid>
          <Row>
            <Col lg={2} md={2} xs={12}>
              <Row className='row-page4'>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-left-page4'>
                    <h3>Upper Left</h3>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-left-page4'>
                    <h3>Upper Left</h3>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={8} xs={12} className='row-page'>
              <Row className='center-30-page4'>
                <Col lg={6} md={6} xs={12}>
                  <div className='center-part-upper'>
                    <h4>First Part </h4>
                  </div>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='center-part-upper'>
                    <h4>First Part </h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} xs={12} className='center-40-page4'>
                  <h4>Center Full Part </h4>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} xs={12} className='center-40-page4'>
                  <h4>Bottom Full Part </h4>
                </Col>
              </Row>
            </Col>
            <Col lg={2} md={2} xs={12}>
              <Row className='row-page4'>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-right-page4'>
                    <h3>Upper Right</h3>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-right-page4'>
                    <h3>Upper Right</h3>
                  </div>
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
