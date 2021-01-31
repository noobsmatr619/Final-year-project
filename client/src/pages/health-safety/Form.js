import React, { Component } from "react";

import { Form, Button } from "react-bootstrap";
class HealthSafetyForm extends Component {
  render() {
    return (
      <>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>First Control</Form.Label>
            <Form.Control type='text' placeholder='First ' />
            <Form.Text className='text-danger'>
              If Error Occur Will Show Here
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Second Control</Form.Label>
            <Form.Control type='text' placeholder='Second' />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Third Control</Form.Label>
            <Form.Control type='text' placeholder='Third' />
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlSelect2'>
            <Form.Label> Select</Form.Label>
            <Form.Control as='select'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.File
              id='exampleFormControlFile1'
              label='File Control Example'
            />
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as='textarea' rows={3} />
          </Form.Group>
          <Form.Group controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}
export default HealthSafetyForm;
