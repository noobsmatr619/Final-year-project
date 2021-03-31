import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import './Chat.css'
import reciever from './reciever.png'
import sender from './sender.png'
const Chat = () => {
    return (
        <div>
            <Nav></Nav>
            <Container fluid>
                <h1 className='p-4 text-center'>Chats</h1>
                <Row className='mt-3'>
                    <Col md={{ span: 10, offset: 1 }} sm={12}>
                        <Row>
                            <Col md={{ span: 4 }}>
                                <ListGroup>
                                    <ListGroup.Item className='bg-orange text-white'><img src={sender} height="30" width="30" alt="" />User 1</ListGroup.Item>
                                    <ListGroup.Item><img src={sender} height="30" width="30" alt="" />User 2</ListGroup.Item>
                                    <ListGroup.Item><img src={sender} height="30" width="30" alt="" />User 3</ListGroup.Item>
                                    <ListGroup.Item><img src={sender} height="30" width="30" alt="" />User 4</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={{ span: 8 }}>
                                <p className='chat-top'><img src={sender} height="30" width="30" alt="" /></p>
                                <p> <img src={sender} height="30" width="30" alt="" /> sender</p>
                                <p className='text-right'><img src={reciever} height="30" width="30" alt="" />  Reciever</p>
                                <p> <img src={sender} height="30" width="30" alt="" /> sender</p>
                                <p className='text-right'><img src={reciever} height="30" width="30" alt="" />  Reciever</p>
                                <div className='send'>
                                    <input type="text" placeholder="Type Your Message Here" className="form-control" />
                                    <i className="fa fa-comment fa-2x text-primary"></i>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Chat
