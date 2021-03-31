import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Help.css'
const Help = () => {
    return (
        <div>
            <Nav></Nav>
            <Container>
                <h1 className='mt-3'>Help Page</h1>
                <Row className='mt-3'>
                    <Col md={8} sm={12}>
                        <h5><span className='text-primary'>1</span>.As you develop your website’s Help page, follow these five guidelines.</h5>
                        <p >More frequently, businesses are relying on live chats for active support. Customer service staff corresponds with site visitors via a text box, typically offering.</p>
                        <h5 className='mt-4'><span className='text-primary'>2</span>.Create a Well-Thought-Out, Structured Frequently Asked Questions (FAQ) Section</h5>
                        <p>More frequently, businesses are relying on live chats for active support. Customer service staff corresponds with site visitors via a text box, typically offering.</p>
                        <h5 className='mt-4'><span className='text-primary'>3</span>.Build and Continue to Add to a Help Article Repository.</h5>
                        <p>More frequently, businesses are relying on live chats for active support. Customer service staff corresponds with site visitors via a text box, typically offering.</p>
                        <h5 className='mt-4'><span className='text-primary'>4</span>.Build and Continue to Add to a Help Article Repository.</h5>
                        <p>More frequently, businesses are relying on live chats for active support. Customer service staff corresponds with site visitors via a text box, typically offering.</p>
                    </Col>
                    <Col md={4} sm={12}>
                        <h1>About Us</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                        <h1>Contact</h1>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Subject" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Message" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
  </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Help
