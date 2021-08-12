import React, { Fragment, useEffect, useState } from 'react';
import Nav from '../Header/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { baseUrl } from './../../baseUrl';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
//update each machine list target through socket io
const MachineUpdate = ({ history, match }) => {
  const [machine, setMachine] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [target, setTarget] = useState('');
  const [isLoadingMachine, setLoadingMachine] = useState(true);
//get asingle machine 
  const getSingleMachine = async () => {
    try {
      const response = await Axios.get(
        `${baseUrl}/machines/getSingleMachineDetails/${match.params.machineId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
          }
        }
      );

      console.log('Machine');
      console.log(response.data);

      setLoadingMachine(false);
      setMachine(response.data);
      setId(response.data._id);
      setName(response.data.name);
      setModel(response.data.model);
      setTarget(response.data.target);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    if (isLoadingMachine) {
      getSingleMachine();
    }
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await Axios.put(
        `${baseUrl}/machines/updateMachineInformation`,
        { name, model, target, id },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('CRM_TOKEN')
          }
        }
      );

      history.push('/machines/list');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <Nav></Nav>
      <Container></Container>
      <div style={{ margin: 50 }}>
        <h2>Update Machine</h2>
        <form onSubmit={submitHandler}>
          <div class="row">
            <div class="col-md-6">
              <div className="form-group">
                <input type="hidden" value={machine._id} name="id" />
                <label for="exampleInputEmail1">Machine Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Machine name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputEmail1">Machine Model</label>
                <input
                  type="text"
                  name="model"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Machine model"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label for="exampleInputEmail1">Machine Target</label>
                <input
                  type="text"
                  name="target"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Machine Target"
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Update Machine
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default MachineUpdate;
