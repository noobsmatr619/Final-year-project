import React, { useRef, useState } from 'react';
import moment from 'moment';
//check
import { useSelector } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './Hse.css';

import { Form, Button, Spinner } from 'react-bootstrap';
const HealthSafetyForm = ({
  setaccidentForm,
  accidentForm,
  submitHandler,
  isLoading
}) => {
  const { user } = useSelector((state) => ({
    user: state.app.user
  }));
  const yesterday = DateTimePicker.moment().subtract(1, 'day');
  const valid = function (current) {
    return current.isAfter(yesterday);
  };
  const sigCanvas = useRef({});
  const clear = (e) => {
    e.preventDefault();
    sigCanvas.current.clear();
  };
  const save = (e) => {
    e.preventDefault();
    // console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
    setaccidentForm({
      ...accidentForm,
      signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    });
  };
  const changeHandler = (e) => {
    setaccidentForm({
      ...accidentForm,
      [e.target.name]: e.target.value
    });
  };
  const {
    Injury,
    FirstAid,
    location,
    Equipment,
    Description,
    image,
    signature,
    bodyPart
  } = accidentForm;
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Injury</Form.Label>
          <Form.Control
            name="Injury"
            type="text"
            value={Injury}
            placeholder="Injury "
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>First Aid</Form.Label>
          <Form.Control
            name="FirstAid"
            type="text"
            value={FirstAid}
            placeholder="First aid"
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Location near</Form.Label>
          <Form.Control
            name="location"
            type="text"
            value={location}
            placeholder="Location.."
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <strong>Person reporting info</strong>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Id</Form.Label>
          <Form.Control
            value={user._id}
            disabled={true}
            type="text"
            placeholder="id"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Equipment</Form.Label>
          <Form.Control
            name="Equipment"
            type="text"
            value={Equipment}
            placeholder="Equipment"
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>
        <strong>Event datails</strong>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Time</Form.Label>
          <DateTimePicker
            initialValue={accidentForm.Date}
            isValidDate={valid}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <textarea
            cols="30"
            rows="5"
            name="Description"
            value={Description}
            placeholder="Description"
            className="form-control"
            onChange={(e) => changeHandler(e)}></textarea>
        </Form.Group>
        <Form.Group>
          <Form.File
            name="image"
            onChange={(e) => {
              setaccidentForm({
                ...accidentForm,
                image: e.target.files[0]
              });
            }}
            id="exampleFormControlFile1"
            label="Site image"
          />
        </Form.Group>
        <Form.Group>
          <SignatureCanvas
            // onBegin={ changeColor}
            penColor="black" //{changeColor.toString() }
            ref={sigCanvas}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        </Form.Group>
        <div>
          <button className="clearButton" onClick={clear}>
            clear
          </button>
          <button className="saveButton" onClick={save}>
            save
          </button>
        </div>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}{' '}
          Submit
        </Button>
      </Form>
    </>
  );
};

export default HealthSafetyForm;
