import React, { Component } from "react";
import Header from "./../../pages/Header/Header";
import { Container, Col, Row } from "react-bootstrap";
import AgGridLayout from "./layouts/AgGridLayout";
import ChartLayout from "./layouts/ChartLayout";
import "./styles/page5.css";
// static view for usability test 
class Page2 extends Component {
  render() {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            {/* <Col lg={2} md={2} xs={12}>
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
            </Col> */}
            <Col lg={10} md={10} xs={12} className='row-page5'>
              <Row className='center-70-part-page5'>
                <Col lg={4} md={4} xs={12}>
                  <div className='center-inner-part-page5'>
                    <AgGridLayout />
                  </div>
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='center-inner-part-page5'>
                    <AgGridLayout />
                  </div>
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='center-inner-part-page5'>
                    <AgGridLayout />
                  </div>
                </Col>
              </Row>

              <Row className='center-30-part-page5'>
                <Col lg={12} md={12} xs={12}>
                  <ChartLayout />
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
