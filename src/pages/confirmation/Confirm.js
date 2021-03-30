import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table, InputGroup, FormCheck, ProgressBar } from 'react-bootstrap'
const Confirm = () => {
    return (
        <div>
            <Nav></Nav>
            <Container>
                <h1 className='mt-3'>Confirmation</h1>
                <Row className='mt-3'>
                    <Col md={8} sm={12}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className='active font-weight-bold'>Confirmed products</ListGroup.Item>
                            <ListGroup.Item className=''><span className='font-weight-bold text-sky'>1.</span> Cras justo odio</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-sky'>2.</span>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-sky'>3.</span>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-sky'>4.</span>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4} sm={12}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className='active font-weight-bold'>Stock list</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-orange'>1.</span>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-orange'>2.</span>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-orange'>3.</span>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item><span className='font-weight-bold text-orange'>4.</span>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Confirm
