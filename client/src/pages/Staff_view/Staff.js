import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getEmployeeOrdersForStaffPage,
  updateToVip,
  updateOrderDone
} from '../../actions/staffAction';
import Loader from 'react-loader-spinner';
import './Staff.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Nav from '../Header/Header';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
// import MyChart from "../../components/Dashboard/Chart3";
import Big from './Big';
// import Swal from "sweetalert";
const Staff = () => {
  const dispatch = useDispatch();
  const { employeeOrder } = useSelector((state) => ({
    employeeOrder: state.app.orderForStaff
  }));
  // const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // const [value, onChange] = useState(new Date());
  // const myEventsList = new Date();
  useEffect(() => {
    const runAction = async () => {
      setisLoading(false);
      await dispatch(await getEmployeeOrdersForStaffPage());
      setisLoading(true);
    };
    runAction();
  }, []);
  useEffect(() => {
    // axios
    //   .get(baseUrl + "/teams/getMyTeams", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     Swal("error in fetching teams");
    //   });
  });
  const updateToWIP = async (event, data) => {
    // const orderStatus = event.target.value;
    const id = data;
    const status = 1;
    const preData = {
      id,
      status
    };
    setisLoading(false);
    await dispatch(await updateToVip(preData));
    await dispatch(await getEmployeeOrdersForStaffPage());
    setisLoading(true);

    // axios
    //   .post(baseUrl + "/orders/updateOrderStatus", preData, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then(response => {
    //     Swal("Status updated");
    //     axios
    //       .get(baseUrl + "/orders/getEmployeeOrders", {
    //         headers: {
    //           Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //       })
    //       .then(response => {
    //         setOrders(response.data.data);
    //         console.log(orders);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   })
    //   .catch(error => {
    //     console.log(error.response.data.error);
    //   });
  };
  const updateToDone = async (event, data) => {
    // const orderStatus = event.target.value;
    const id = data;
    const status = 2;
    const preData = {
      id,
      status
    };
    setisLoading(false);
    await dispatch(await updateOrderDone(preData));
    await dispatch(await getEmployeeOrdersForStaffPage());
    setisLoading(true);

    // axios
    //   .post(baseUrl + "/orders/updateOrderStatus", preData, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then(response => {
    //     Swal("Status updated");
    //     axios
    //       .get(baseUrl + "/orders/getEmployeeOrders", {
    //         headers: {
    //           Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //       })
    //       .then(response => {
    //         setOrders(response.data.data);
    //         console.log(orders);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   })
    //   .catch(error => {
    //     console.log(error.response.data.error);
    //   });
  };
  if (!isLoading) {
    return (
      <div className="loading-final-year">
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000000} //30 secs
        />
      </div>
    );
  }
  return (
    <div>
      <Nav></Nav>
      <Container>
        <h1>Staff view</h1>
        <Row className="mt-5">
          <Col md={12} sm={12}>
            <Big></Big>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={12}>
            <ListGroup as="ul" className="mt-3">
              <li className="list-group-item bg-sky text-white">
                <strong>Planned</strong>
              </li>
              {employeeOrder
                .filter((order) => order.status === 0)
                .map((filteredOrders) => (
                  <li className="list-group-item ">
                    <div className="d-flex justify-content-between">
                      <p>Assigned by</p>
                      <p id={filteredOrders._id}>
                        {filteredOrders.assignedBy.displayName}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Assigned </p>
                      <p id={filteredOrders._id}>{filteredOrders.assignedTo}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Product </p>
                      <p id={filteredOrders._id}>
                        {filteredOrders.product.name}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Quantity </p>
                      <p id={filteredOrders._id}>{filteredOrders.count}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Provider </p>
                      <p id={filteredOrders._id}>{filteredOrders.provider}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-block btn-primary text-white btn-sm"
                        onClick={(event) =>
                          updateToWIP(event, filteredOrders.id)
                        }
                        value={filteredOrders.status}>
                        Mark as WIP
                      </button>
                    </div>
                    <hr />
                  </li>
                ))}
            </ListGroup>
          </Col>
          <Col md={4} sm={12}>
            <ListGroup as="ul" className="mt-3">
              <li className="list-group-item bg-sky text-white">
                <strong>Wip</strong>
              </li>
              {employeeOrder
                .filter((order) => order.status == 1)
                .map((filteredOrders) => (
                  <li className="list-group-item ">
                    <div className="d-flex justify-content-between">
                      <p>Assigned by</p>
                      <p id={filteredOrders._id}>
                        {filteredOrders.assignedBy.displayName}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Assigned </p>
                      <p id={filteredOrders._id}>{filteredOrders.assignedTo}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Product </p>
                      <p id={filteredOrders._id}>
                        {filteredOrders.product.name}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Quantity </p>
                      <p id={filteredOrders._id}>{filteredOrders.count}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Provider </p>
                      <p id={filteredOrders._id}>{filteredOrders.provider}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-block btn-primary text-white btn-sm"
                        onClick={(event) =>
                          updateToDone(event, filteredOrders.id)
                        }
                        value={filteredOrders.status}>
                        Mark as Done
                      </button>
                    </div>
                    <hr />
                  </li>
                ))}
            </ListGroup>
          </Col>
          <Col md={4} sm={12}>
            <ListGroup as="ul" className="mt-3">
              <li className="list-group-item bg-sky text-white">
                <strong>Done</strong>
              </li>
              {employeeOrder
                .filter((order) => order.status == 2)
                .map((filteredOrders) => (
                  <li className="list-group-item ">
                    <div className="d-flex justify-content-between">
                      <p>Assigned by</p>
                      <p id={filteredOrders._id}>
                        {filteredOrders.assignedBy.displayName}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Assigned </p>
                      <p id={filteredOrders._id}>{filteredOrders.assignedTo}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Product </p>
                      <p id={filteredOrders._id}>
                        {filteredOrders.product.name}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Quantity </p>
                      <p id={filteredOrders._id}>{filteredOrders.count}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Provider </p>
                      <p id={filteredOrders._id}>{filteredOrders.provider}</p>
                    </div>
                    <hr />
                  </li>
                ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }} sm={12}>
            <h3 className="text-center mt-3">Team</h3>
            <ListGroup as="ul" className="mt-3">
              <li className="list-group-item bg-sky text-white">
                <strong>Teams</strong>
              </li>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Staff;
