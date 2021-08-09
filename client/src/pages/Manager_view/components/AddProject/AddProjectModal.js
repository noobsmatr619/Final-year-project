import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { createProject } from "../../../../actions/projectActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

const AddProjectModal = props => {
  const { buttonLabel, className, toggle, modal, createProject } = props;
  const [Project, setProject] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const onSubmit = async e => {
    e.preventDefault();
    const res = await createProject(
      Project.name,
      Project.description,
      moment(Project.dueDate)
    );
    if (res) {
      toggle();
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Project</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label htmlFor='exampleEmail'>Project Name</Label>
              <Input
                type='text'
                name='team'
                id='exampleEmail'
                value={Project.name}
                onChange={e => {
                  setProject({
                    ...Project,
                    name: e.target.value,
                  });
                }}
                placeholder='Write Project Name'
              />
            </FormGroup>
            <FormGroup>
              <Label for='exampleText'>Project Description</Label>
              <Input
                type='textarea'
                name='text'
                id='exampleText'
                placeholder='Write Project Description'
                value={Project.description}
                onChange={e => {
                  setProject({
                    ...Project,
                    description: e.target.value,
                  });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for='exampleDate'>Due Date</Label>
              <Input
                type='date'
                name='date'
                id='exampleDate'
                value={Project.dueDate}
                onChange={e => {
                  // debugger;
                  console.log(e.target.value);
                  setProject({
                    ...Project,
                    dueDate: e.target.value,
                  });
                }}
                placeholder='date placeholder'
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={toggle}>
              Cancel
            </Button>{" "}
            <Button color='secondary' type='submit'>
              Create Project
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(null, { createProject })(AddProjectModal);
