import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import { assignProject } from "../../../../actions/projectActions";

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

const AddTeamModal = props => {
  const {
    buttonLabel,
    className,
    toggle,
    modal,
    teams,
    assignProject,
    Id,
    projects,
    projectId,
  } = props;
  const [Team, setTeam] = useState({
    team: null,
  });
  const onSubmit = async e => {
    e.preventDefault();
    const res = await assignProject(projectId, Team.team);
    if (res) {
      toggle(Id);
    }
  };
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => {
          toggle(Id);
        }}
        className={className}
      >
        <ModalHeader toggle={toggle}>Add Team</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label htmlFor='exampleEmail'>Select Team </Label>
              <Autocomplete
                id='exampleEmail'
                options={_.uniqBy(teams, t => {
                  return t.team._id;
                }).filter(t => {
                  if (
                    !projects
                      .filter(p => p.team)
                      .some(p => p.team.toString() === t.team._id.toString())
                  )
                    return t;
                })}
                getOptionLabel={option => (option ? option.team.name : [])}
                onChange={(e, value) => {
                  setTeam({
                    team: value.team._id,
                  });
                }}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Favorites'
                  />
                )}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={() => {
                toggle(Id);
              }}
            >
              Cancel
            </Button>{" "}
            <Button color='secondary' type='submit'>
              Assign Project
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(null, { assignProject })(AddTeamModal);
