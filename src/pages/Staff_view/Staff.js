import React, { useState } from 'react'
import Calendar from 'react-calendar';
import './Staff.css'
import 'react-calendar/dist/Calendar.css';
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table, InputGroup, FormCheck, ProgressBar } from 'react-bootstrap'
import MyChart from '../../components/Dashboard/Chart3'
const Staff = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <Nav></Nav>
            <Container>
                <h1>Staff view</h1>
                <Row className='mt-5'>
                    <Col md={3} sm={12}>
                        <Calendar
                            onChange={onChange}
                            value={value}
                        />
                    </Col>
                    <Col md={6} sm={12} className='bg-sky'>
                        <Row className='mt-3'>
                            <Col md={6} sm={12} >
                                <div className='bg-danger d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>206</span>
                                        <span className='text-white'>Plan Order</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-calendar fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} sm={12}>
                                <div className='bg-success d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>1200</span>
                                        <span className='text-white'>Wip Orders</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-bookmark fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6} sm={12} >
                                <div className='bg-primary d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>2055</span>
                                        <span className='text-white'>Done</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-check fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} sm={12}>
                                <div className='bg-warning d-flex justify-content-between my-card'>
                                    <div className='d-flex flex-column'>
                                        <span className='my-card-number font-weight-bold text-white'>5220</span>
                                        <span className='text-white'>Shipment</span>
                                    </div>
                                    <div>
                                        <i className='fa fa-bus fa-2x text-white'></i>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3} sm={12}>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active>
                                Project
                            </ListGroup.Item>
                            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item as="li" disabled>
                                Morbi leo risus
                            </ListGroup.Item>
                            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                        <ListGroup as="ul" className='mt-3'>
                            <ListGroup.Item as="li" active>
                                Team
                            </ListGroup.Item>
                            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item as="li" disabled>
                                Morbi leo risus
                            </ListGroup.Item>
                            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} sm={12}>
                        <h3 className='text-center mt-3'>Payroll</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Staff
