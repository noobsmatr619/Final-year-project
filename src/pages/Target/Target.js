import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table, InputGroup, FormCheck, ProgressBar } from 'react-bootstrap'
import './Target.css'
import MyChart from '../../components/Dashboard/Chart2'
const Target = () => {
    return (
        <div>
            <Nav></Nav>
            <Container fluid>
                <Row>
                    <Col md={8} sm={12} className='bg-sky mt-5 '>
                        <h1>Targets</h1>
                        <Row className='mt-5'>
                            <Col md={3} sm={12}>
                                <div className='bg-danger d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>206</span>
                                        <span className='text-white'>Courses</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-headphones fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3} sm={12}>
                                <div className='bg-success d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>1200</span>
                                        <span className='text-white'>users</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-user fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3} sm={12}>
                                <div className='bg-primary d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>2055</span>
                                        <span className='text-white'>articles</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-pencil-alt fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3} sm={12}>
                                <div className='bg-warning d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>5220</span>
                                        <span className='text-white'>Gallery images</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-image fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12} className='chart'>
                                <MyChart></MyChart>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} sm={12}>
                        <h1 className='mt-5'>AG grid list</h1>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Target
