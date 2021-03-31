import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table, InputGroup, FormCheck, ProgressBar } from 'react-bootstrap'
import './Emp.css'
import MyChart from '../../components/Dashboard/Chart3'
const Emp = () => {
    return (
        <div>
            <Nav></Nav>
            <Container>
                <h1>Employee view</h1>
                <Row className='mt-5'>
                    <Col md={3} sm={12}>
                        <ListGroup >
                            <ListGroup.Item className=' active bg-sky'>
                                <h3 className='text-white'>My Tasks</h3>
                                <p className='text-white'>All Your to do list.</p>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    {/* <input type="checkbox" className='font-weight-bold mt-3 '></input> */}
                                    <span className='d-flex flex-column ml-2'>
                                        <span>Cras justo odio</span>
                                        <span className='text-sm text-grey'>Cras justo odio</span>
                                    </span>
                                </div>
                                <i className='fa fa-check mt-2 text-primary'></i>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <span className='d-flex flex-column ml-2'>
                                        <span>Cras justo odio</span>
                                        <span className='text-sm text-grey'>Cras justo odio</span>
                                    </span>
                                </div>
                                <i className='fa fa-check mt-2 text-primary'></i>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <span className='d-flex flex-column ml-2'>
                                        <span className=''><del>Cras justo odio</del></span>
                                        <span className='text-sm text-grey'><del>Cras justo odio</del></span>
                                    </span>
                                </div>
                                <i className='fa fa-check mt-2 text-primary'></i>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <span className='d-flex flex-column ml-2'>
                                        <span className=''><del>Cras justo odio</del></span>
                                        <span className='text-sm text-grey'><del>Cras justo odio</del></span>
                                    </span>
                                </div>
                                <i className='fa fa-check mt-2 text-primary'></i>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <span className='d-flex flex-column ml-2'>
                                        <span className=''><del>Cras justo odio</del></span>
                                        <span className='text-sm text-grey'><del>Cras justo odio</del></span>
                                    </span>
                                </div>
                                <i className='fa fa-check mt-2 text-primary'></i>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={6} sm={12} className='bg-sky'>
                        <Row className='mt-3'>
                            <Col md={6} sm={12} >
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
                            <Col md={6} sm={12}>
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
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6} sm={12} >
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
                            <Col md={6} sm={12}>
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
                    <Col md={3} sm={12}>
                        <div>
                            weekly sales
                            <ProgressBar striped variant="success" now={40} />
                            monthly sales
                            <ProgressBar striped variant="info" now={20} />
                            area sales
                            <ProgressBar striped variant="warning" now={60} />
                            whole sale
                            <ProgressBar striped variant="danger" now={80} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Emp
