import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createTeam } from '../../../../actions/teamsActions';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from 'reactstrap';

const AddTeamModal = (props) => {
  const {
    buttonLabel,
    className,
    toggle,
    modal,
    employees,
    employeeAndStaff,
    createTeam
  } = props;
  const [Team, setTeam] = useState({
    name: '',
    members: []
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await createTeam(Team.name, Team.members);
    if (res) {
      toggle();
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Team</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="exampleEmail">Team Name</Label>
              <Input
                type="text"
                name="team"
                id="exampleEmail"
                onChange={(e) => {
                  setTeam({
                    ...Team,
                    name: e.target.value
                  });
                }}
                placeholder="Write Team Name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="exampleEmail">Select Team Members</Label>
              <Autocomplete
                multiple
                id="exampleEmail"
                options={employeeAndStaff}
                getOptionLabel={(option) => option.displayName}
                onChange={(e, value) => {
                  setTeam({
                    ...Team,
                    members: value
                  });
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Favorites"
                  />
                )}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Cancel
            </Button>{' '}
            <Button color="secondary" type="submit">
              Create Team
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(null, { createTeam })(AddTeamModal);
