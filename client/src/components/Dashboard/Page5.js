import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";
import "./styles/page5.css";
//testing bringing in composnennt 
class Page2 extends Component {
  render() {
    return (
      <>
        <Header />

        <Container fluid>
          <Row>
            <Col lg={2} md={2} xs={12}>
              <Row className='row-page5'>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-left-page5'>
                    <h3>Upper Left</h3>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-left-page5'>
                    <h3>Lower Left</h3>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={8} xs={12} className='row-page5'>
              <Row className='center-70-part-page5'>
                <Col lg={4} md={4} xs={12}>
                  <div className='center-inner-part-page5'>
                    <h4>First Part </h4>
                  </div>
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='center-inner-part-page5'>
                    <h4>Second Part </h4>
                  </div>
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='center-inner-part-page5'>
                    <h4>Third Part </h4>
                  </div>
                </Col>
              </Row>

              <Row className='center-30-part-page5'>
                <Col lg={12} md={12} xs={12}>
                  <h4>Bottom Full Part </h4>
                </Col>
              </Row>
            </Col>
            <Col lg={2} md={2} xs={12}>
              <Row className='row-page5'>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-right-page5'>
                    <h3>Upper Right</h3>
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='upper-right-page5'>
                    <h3>Lower Right</h3>
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
