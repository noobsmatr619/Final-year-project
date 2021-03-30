import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap'
import '../reports/Reports.css'
const Stock = () => {
    return (
        <div>
            <Nav></Nav>
            <Container fluid>
                <h1 className='p-3 text-center text-danger'>Product At Low Amount</h1>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className='mt-3'>
                        <Table striped bordered hover size="md">
                            <thead>
                                <tr className='bg-sky text-white'>
                                    <th>Sr #</th>
                                    <th>Item</th>
                                    <th>Unit</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Fabric</td>
                                    <td>Meter</td>
                                    <td>950</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Velcro</td>
                                    <td>Meter</td>
                                    <td>1300</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Thread</td>
                                    <td>Roll</td>
                                    <td>400</td>
                                </tr>
                                <tr key="">
                                    <td colSpan='3' className='text-orange font-weight-bold'>Total Quantity</td>
                                    <td>2650</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 1 }} sm={12}>
                        <h1 className='p-3 text-center'>In Stock</h1>
                        <ListGroup>
                            <ListGroup.Item className='machine'>
                                <div> Item</div>
                                <div>Quantity</div>
                                <div>Unit</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no '>1</span> Febric</div>
                                <div>455</div>
                                <div>Meter</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no'>2</span> Velcro</div>
                                <div>546</div>
                                <div>Roll</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no'>3</span> Eva</div>
                                <div>454</div>
                                <div>Cane</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div><span className='bg-orange machine-no'>4</span> Tape</div>
                                <div>34</div>
                                <div>Pcs</div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={{ span: 5 }} sm={12}>
                        <h1 className='p-3 text-center'>Production Done</h1>
                        <ListGroup>
                            <ListGroup.Item className='machine'>
                                <div> Order #</div>
                                <div>Status</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div>30145</div>
                                <div className='text-orange'>ok</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div>30544</div>
                                <div>Partial</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div>22985</div>
                                <div className='text-orange'>ok</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='machine-item'>
                                <div>98754</div>
                                <div className='text-orange'>ok</div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Stock
