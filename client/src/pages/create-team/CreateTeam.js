import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from "./../../baseUrl";
import Nav from '../Header/Header'
import { Container, Row, Col, ListGroup, Table, InputGroup, FormCheck, ProgressBar } from 'react-bootstrap'
import { response } from 'express';
import Swal from 'sweetalert'

const CreateTeam = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        axios.get(baseUrl + "/auth/getAllEmployees", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((response) => {
            setEmployees(response.data);
            console.log(employees)

        }).catch((error) => {
            Swal('error in fetching employees')
        })
    }, [])
    return (
        <div>
            <Nav></Nav>
            <Container>
                <h1>Staff view</h1>
                <Row className='mt-5'>
                    <Col md={12} sm={12}>
                        <ListGroup as="ul" className='mt-3'>
                            <li className="list-group-item bg-sky text-white"><strong>Teams</strong></li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>name</span>
                                <span>email</span>
                            </li>
                        </ListGroup>
                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default CreateTeam
