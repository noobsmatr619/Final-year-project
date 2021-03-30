import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap'
import './Reports.css'
import Chart from '../../components/Dashboard/Chart3'
const Reports = () => {
    return (
        <div>
            <Nav></Nav>
            <Container fluid>
                <h1 className='p-4 text-center'>Machine Targets</h1>
                <Row className='mt-3'>
                    <Col md={{ span: 6, offset: 1 }} sm={12}>
                        <ListGroup>
                            <ListGroup.Item className='machine'>
                                <div> Machine</div>
                                <div>Target</div>
                                <div>Statics</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no '>1</span> Boring</div>
                                <div>1100 Barrel</div>
                                <div><i className='fa fa-signal fa-2x text-orange'></i></div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no'>1</span> Drilling</div>
                                <div>1100 Barrel</div>
                                <div><i className='fa fa-signal fa-2x text-orange'></i></div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no'>1</span> Milling</div>
                                <div>1100 Barrel</div>
                                <div><i className='fa fa-signal fa-2x text-orange'></i></div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no'>1</span> Mining</div>
                                <div>1100 Barrel</div>
                                <div><i className='fa fa-signal fa-2x text-orange'></i></div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={{ span: 3, offset: 1 }} className='chart' sm={12}>
                        <Chart></Chart>
                    </Col>
                </Row>
                <h1 className='p-4 text-center'>Production</h1>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} className='mt-5'>
                        <Table striped bordered hover size="md">
                            <thead>
                                <tr className='bg-sky text-white'>
                                    <th>Sr #</th>
                                    <th>Machine</th>
                                    <th>Target</th>
                                    <th>Achieved</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Boring</td>
                                    <td>1100</td>
                                    <td>950</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Drilling</td>
                                    <td>1200</td>
                                    <td>1300</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Mining</td>
                                    <td>550</td>
                                    <td>400</td>
                                </tr>
                                <tr key="">
                                    <td colSpan='3' className='text-orange font-weight-bold'>Total Production</td>
                                    <td>2650</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Reports
