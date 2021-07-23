import React from 'react'
import Nav from '../Header/Header'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Help.css'
const Help = () => {
    return (
        <div>
            <Nav></Nav>
            <Container>
                <Row className='mt-3'>
                    <Col md={8} sm={12}>
                        <h3 className='font-italic'>6 Tips For Being A Mindful Park Citizen</h3>
                        <p className='text-grey'>Theresa GonzalezApr 22, 2021</p>
                        <img src="https://www.brit.co/media-library/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNjA4MDYwOC9vcmlnaW4ucG5nIiwiZXhwaXJlc19hdCI6MTY3NzAyNDg2MH0.FBv5WJGVpxicMFn6kVP-ToYVR3-Uon3wTxdVTTpYyUw/image.png?quality=80&width=760" alt="" />
                        <p className='mt-5'>
                            National park visits reached record highs this past year as people looked for safely distanced escapes during Covid. As we celebrate Earth Day and the addition of a new National Park, we spoke with Keith Eshelman, founder of Parks Project, about their mission to protect and preserve parklands for generations.
                        </p>
                        <p>
                            "At Parks Project, we live by the motto 'Leave it better than you found it' and think we can all make a difference by being advocates for the planet," Eshelman told us. "We truly believe that we can all lend a hand in cleaning up our parklands on Earth Day to make an impact so we can enjoy healthy parks for years to come."
                        </p>
                    </Col>
                    <Col md={4} sm={12}>
                        <div className='d-flex ml-5 mt-5 justify-content-between'>
                            <img src="https://www.brit.co/media-library/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNTY1ODY4Ny9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTY3OTE5MTQzN30.ZwxQ1ALf8K2ctekHohG7bvefjo31Ez53ISnI1svQQ2U/image.jpg?width=600&quality=85&coordinates=0%2C120%2C0%2C120&height=600" width='100' alt="" />
                            <p>10 Easy Margarita Recipes to Celebrate National Margarita Day</p>
                        </div>
                        <div className='d-flex ml-5 mt-5 justify-content-between'>
                            <img src="https://www.brit.co/media-library/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMTQyMzc5OC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTYyNTM2NTMxN30.m278YNhHGZo6KKL24TsDzHwHQJSqlLYz785Sx6AJjZ0/image.jpg?width=600&quality=85" width='100' alt="" />
                            <p>19 Instant Pot Recipes for When You’re Even Too Busy for a Slow Cooker</p>
                        </div>
                        <div className='d-flex ml-5 mt-5 justify-content-between'>
                            <img src="https://www.brit.co/media-library/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNjA4MDcwMC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTY1NDE4NDg3N30.zDI4HRyC-bLA4hAbieb2ChWYAWllmZ3rMmUVcigT9xs/image.jpg?width=600&quality=85&coordinates=0%2C623%2C0%2C34&height=600" width='100' alt="" />
                            <p>25 Picnic Essentials For Your Next Spring Outing</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12}>
                        <h1>About Us</h1>

                        <p>
                            <strong><i className='fa fa-building'></i> Company:</strong>
                            <span className='ml-2'>xyz</span>
                        </p>
                        <p>
                            <strong><i className='fa fa-industry'></i> Bussines Structure:</strong>
                            <span className='ml-2'>Sole proprietorship, LLC, partnership or corporation.</span>
                        </p>
                        <p>
                            <strong><i className='fa fa-object-ungroup'></i> Ownership/management team:</strong>
                            <span className='ml-2'>Names of the key people behind the company.</span>
                        </p>
                        <p>
                            <strong><i className='fa fa-location-arrow'></i> Location:</strong>
                            <span className='ml-2'> Where is the company headquartered?</span>
                        </p>
                        <p>
                            <strong><i className='fa fa-road'></i> Objectives:</strong>
                            <span className='ml-2'> An outline of what you want to accomplish in the immediate future based on the data in the rest of the business plan as well as future growth goals.</span>
                        </p>
                    </Col>
                    <Col md={6} sm={12}>
                        <h1>Contact</h1>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Subject" />
                            </Form.Group>
                            <textarea cols="30" rows="3" className='form-control' placeholder='message'></textarea>
                            <Button variant="primary" className='mt-3' type="submit">
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
