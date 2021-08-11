import React from 'react'
import { GoogleMap, Marker } from "react-google-maps"
import Calendar from 'react-calendar';
import './Map.css'
import { Container, Row, Col, ListGroup, Table, InputGroup, FormCheck, ProgressBar } from 'react-bootstrap'
import Nav from '../Header/Header'
const Map = () => {
    return (
        <div>
            <Nav></Nav>
            <Container>
                <h1>Map</h1>
                <Row className='mt-5'>
                    <Col md={12} sm={12}>

                        <img style={{ width: '100%', height: '30%' }} src="https://i.pinimg.com/originals/16/0c/b9/160cb9d8b7bd8eb2da7004de84748233.png" alt="" />
                        <button className="btn btn-warning mt-3">Edit Or Move</button>
                        <div className="mt-3">
                            <ListGroup as="ul">
                                <ListGroup.Item as="li" active>
                                    List of targets
                            </ListGroup.Item>
                                <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item as="li" disabled>
                                    Morbi leo risus
                            </ListGroup.Item>
                                <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                            </ListGroup>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Map
