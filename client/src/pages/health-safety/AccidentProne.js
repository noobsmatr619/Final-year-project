import React, { useState, useEffect, Fragment } from 'react';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl } from './../../baseUrl';
import Swal from 'sweetalert';
import Nav from '../Header/Header';
import { Redirect, useHistory, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccidentProne = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  const { title } = location.state;

  const [Injury, setInjury] = useState('');
  const [FirstAid, setFirstAid] = useState('');
  const [Location, setLocation] = useState('');
  const [Equipment, setEquipment] = useState('');
  const [Date, setDate] = useState('');
  const [Description, setDescription] = useState('');
  useEffect(() => {
    axios
      .get(baseUrl + `/health/accident/${match.params.id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
        }
      })
      .then((response) => {
        setInjury(response.data.Injury);
        setFirstAid(response.data.FirstAid);
        setLocation(response.data.location);
        setEquipment(response.data.Equipment);
        setDate(response.data.Date);
        setDescription(response.data.Description);
      })
      .catch((error) => {
        Swal('error in fetching Accident data');
      });
  }, []);

  const handleHealthUpdate = async (e) => {
    e.preventDefault();
    if (
      Injury == '' ||
      FirstAid == '' ||
      Location == '' ||
      Equipment == '' ||
      Date == '' ||
      Description == ''
    ) {
      Swal('please provide all required fields');
    } else {
      const productData = {
        Injury,
        FirstAid,
        Location,
        Equipment,
        Date,
        Description
      };
      try {
        const config = {
          'Content-Type': 'application/json'
        };
        await axios.put(
          `${baseUrl}/health/accidentupdate/${match.params.id}`,
          productData,
          config
        );
        toast.success('Record updated successfully');
        history.push('/health-safety');
      } catch (error) {
        Swal(error.response.data.error);
      }
    }
  };
  return (
    <Fragment>
      <Nav></Nav>
      <Container>
        <h1 className="mt-3 text-center">Update {title}</h1>
        <Form onSubmit={handleHealthUpdate}>
          <Form.Group>
            <Form.Label>Injury</Form.Label>
            <Form.Control
              data-testid="name"
              type="text"
              value={Injury}
              onChange={(e) => setInjury(e.target.value)}
              placeholder="Injury"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>FirstAid</Form.Label>
            <Form.Control
              data-testid="FirstAid"
              type="text"
              value={FirstAid}
              onChange={(e) => setFirstAid(e.target.value)}
              placeholder="FirstAid..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location.</Form.Label>
            <Form.Control
              type="text"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Equipment.</Form.Label>
            <Form.Control
              type="text"
              value={Equipment}
              onChange={(e) => setEquipment(e.target.value)}
              placeholder="Equipment..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date.</Form.Label>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes', 'seconds']}
                format="HH:mm:ss"
                label="Duration"
                value={Date}
                onChange={setDate}
              />
            </MuiPickersUtilsProvider>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <Link
            className="btn-block mt-3 mb-3"
            variant="primary"
            to="/health-safety">
            Back
          </Link>
          <Button
            className="btn-block mt-3 mb-3"
            variant="primary"
            type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default AccidentProne;
