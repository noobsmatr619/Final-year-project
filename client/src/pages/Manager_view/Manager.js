import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getStaff, getEmployeeAndStaff } from '../../actions/staffAction';
import { getUser } from '../../actions/userActions';
import { getAllTeams } from '../../actions/teamsActions';
import { getAllProject } from '../../actions/projectActions';
import Loader from 'react-loader-spinner';
import { Badge, CardText } from 'reactstrap';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import Nav from '../Header/Header';
import { Container, Row, Col, ListGroup, Table, Button } from 'react-bootstrap';
import MyChart from '../../components/Dashboard/Chart3';
import AddTeamModal from './components/AddteamModel/AddTeamModel';
import AddProjectModal from './components/AddProject/AddProjectModal';
import AssignModal from './components/AssgnModal/AssignModal';
import './Manager.css';

const Manager = ({
  getUser,
  employees,
  getEmployeeAndStaff,
  getAllTeams,
  teams,
  getAllProject,
  projects,
  getStaff,
  employeeAndStaff,
  staff
}) => {
  useEffect(() => {
    const runActions = async () => {
      setLoading(false);
      await getUser();
      await getEmployeeAndStaff();
      await getAllTeams();
      await getAllProject();
      await getStaff();
      setLoading(true);
    };
    runActions();
  }, []);
  console.log(employees);
  // const { employees } = useSelector(({ app }) => ({
  //   employees: app.employees,
  // }));
  const [calenderDate, setcalenderDate] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalProject, setModalProject] = useState(false);
  const [modalAssign, setmodalAssign] = useState(null);
  useEffect(() => {
    setmodalAssign(
      Array(teams.length)
        .fill()
        .map((v, i) => false)
    );
  }, [teams]);
  const toggle = () => setModal(!modal);
  const toggleProject = () => setModalProject(!modalProject);
  const toggleAssign = (i) => {
    let form = [...modalAssign];
    form[i] = !form[i];
    setmodalAssign(form);
  };
  const handleCalendarChange = (calenderDate) => {
    debugger;
    setcalenderDate(new Date(calenderDate));
  };
  if (!Loading)
    return (
      <div className="loading-final-year">
        <Loader type="Rings" color="#00BFFF" height={100} width={100} />
      </div>
    );
  return (
    <div>
      <div>
        <Nav></Nav>
        <Container>
          <h1>Manager view</h1>
          <Row className="mt-5">
            <Col md={3} sm={12}>
              <Calendar
                onChange={handleCalendarChange}
                value={calenderDate}
                tileClassName={({ date, view }) => {
                  if (
                    projects.find(
                      (x) =>
                        !x.isCompleted &&
                        moment(x.dueDate).format('DD-MM-YYYY') ===
                          moment(date).format('DD-MM-YYYY')
                    )
                  ) {
                    return 'highlight';
                  }
                }}
              />
            </Col>
            <Col md={6} sm={12} className="bg-sky">
              <Row className="mt-3">
                <Col md={6} sm={12}>
                  <div className="bg-danger d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        206
                      </span>
                      <span className="text-white">Daily sales</span>
                    </div>
                    <div>
                      <i className="fa fa-calendar fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
                <Col md={6} sm={12}>
                  <div className="bg-success d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        1200
                      </span>
                      <span className="text-white">Daily Expanse</span>
                    </div>
                    <div>
                      <i className="fa fa-bookmark fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6} sm={12}>
                  <div className="bg-primary d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        2055
                      </span>
                      <span className="text-white">Done</span>
                    </div>
                    <div>
                      <i className="fa fa-check fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
                <Col md={6} sm={12}>
                  <div className="bg-warning d-flex justify-content-between my-card">
                    <div className="d-flex flex-column">
                      <span className="my-card-number font-weight-bold text-white">
                        5220
                      </span>
                      <span className="text-white">Shipment</span>
                    </div>
                    <div>
                      <i className="fa fa-bus fa-2x text-white"></i>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-center  bg-light mt-5">
                expanses
                <MyChart></MyChart>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <ListGroup as="ul">
                <ListGroup.Item
                  style={{
                    justifyContent: 'space-between'
                  }}
                  as="li"
                  active
                  className="d-flex">
                  <Button disabled={true}>Project</Button>
                  <Button color="primary" onClick={toggleProject}>
                    Add Project
                  </Button>{' '}
                </ListGroup.Item>
                {projects.length > 0 &&
                  projects.map((t, i) => (
                    <>
                      <ListGroup.Item
                        as="li"
                        style={{
                          justifyContent: 'space-between'
                        }}
                        className="d-flex">
                        <div>{t.project}</div>
                        {t.isAssigned && (
                          <Badge
                            color={
                              t.isCompleted
                                ? 'success'
                                : t.isAssigned
                                ? 'primary'
                                : 'dark'
                            }>
                            {t.isCompleted
                              ? 'Completed'
                              : t.isAssigned
                              ? 'Working'
                              : 'Not Assigned'}
                          </Badge>
                        )}
                        {!t.isAssigned && (
                          <Button
                            color="primary"
                            onClick={() => {
                              toggleAssign(i);
                            }}>
                            Assign
                          </Button>
                        )}
                      </ListGroup.Item>
                      <AssignModal
                        toggle={toggleAssign}
                        projectId={t.id}
                        teams={teams}
                        projects={projects}
                        Id={i}
                        modal={modalAssign[i]}
                      />
                    </>
                  ))}
              </ListGroup>
              <ListGroup as="ul" className="mt-3">
                <ListGroup.Item
                  style={{
                    justifyContent: 'space-between'
                  }}
                  as="li"
                  active
                  className="d-flex">
                  <Button disabled={true}>Teams</Button>
                  <Button color="primary" onClick={toggle}>
                    Add Team
                  </Button>{' '}
                </ListGroup.Item>
                {teams.length > 0 &&
                  _.uniqBy(teams, (t) => {
                    return t.team._id;
                  }).map((t) => (
                    <ListGroup.Item as="li">{t.team.name}</ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }} sm={12}>
              <h3 className="text-center mt-3">Payroll</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Full Name</th>
                    <th>Email</th>
                    <th>Role</th>

                    <th>Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.length > 0 &&
                    staff.map((e, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{e.email}</td>
                        <td>{e.displayName}</td>
                        <td>{e.type}</td>
                        <td>{e.isPaid ? 'PAID' : 'NOT PAID'}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      <AddTeamModal
        toggle={toggle}
        setModal={setModal}
        employeeAndStaff={employeeAndStaff}
        modal={modal}
        employees={employees}
      />
      <AddProjectModal
        toggle={toggleProject}
        setModal={setModalProject}
        modal={modalProject}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  employees: state.app.employees,
  teams: state.app.teams,
  projects: state.app.projects,
  staff: state.app.staff,
  employeeAndStaff: state.app.employeeAndStaff
});
export default connect(mapStateToProps, {
  getUser,
  getAllTeams,
  getAllProject,
  getEmployeeAndStaff,
  getStaff
})(Manager);
