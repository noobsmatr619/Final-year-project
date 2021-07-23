import React, { useRef, useState } from "react";
import moment from "moment";
//check
import SignatureCanvas from "react-signature-canvas";
import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./Hse.css";

import { Form, Button } from "react-bootstrap";
const HealthSafetyForm = () => {
  const [imageURL, setImageURL] = useState(null);
  const yesterday = DateTimePicker.moment().subtract(1, "day");
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
    console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };
  const changeColor = (e) => {
    e.preventDefault();
    // console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
    // console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    // var colors = ["red","blue","black"];
    // var randomColor = colors[Math.floor(Math.random()*colors.length)]; 
    // console.log(randomColor);
    // return randomColor;
  };
  
  return (
    <>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Injury</Form.Label>
          <Form.Control type='text' placeholder='Injury ' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>First Aid</Form.Label>
          <Form.Control type='text' placeholder='First aid' />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Location near</Form.Label>
          <Form.Control type='text' placeholder='Location..' />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Observation</Form.Label>
          <Form.Control type='text' placeholder='Observation' />
        </Form.Group>
        <strong>Person reporting info</strong>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Id</Form.Label>
          <Form.Control type='text' placeholder='id' />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Equipment</Form.Label>
          <Form.Control type='text' placeholder='Equipment' />
        </Form.Group>
        <strong>Event datails</strong>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Place</Form.Label>
          <Form.Control type='text' placeholder='Place' />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Time</Form.Label>
          <DateTimePicker initialValue={new Date()} isValidDate={valid} />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Description</Form.Label>
          <textarea
            cols='30'
            rows='5'
            placeholder='Description'
            className='form-control'
          ></textarea>
        </Form.Group>
        <Form.Group>
          <Form.File id='exampleFormControlFile1' label='Site image' />
        </Form.Group>
        <Form.Group>
          <SignatureCanvas
            // onBegin={ changeColor}
            penColor='black'//{changeColor.toString() }
            ref={sigCanvas}
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          />
        </Form.Group>
        <div>
          {/* <button className="changeColor"  onClick={changeColor} data-action="change-color">Change Color</button> */}

          <button className="clearButton" onClick={clear}>clear</button>
          <button className="saveButton" onClick={save}>save</button>

        </div>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      
    </>
  );
};

export default HealthSafetyForm;
