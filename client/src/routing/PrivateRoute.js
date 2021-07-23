import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, role, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth ? (
        <Redirect to='/' auth />
      ) : auth && role !== "admin" ? (
        role === "staff" && <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = state => ({
  auth: state.app.isAuth,
  role: state.app.role,
});
export default connect(mapStateToProps)(PrivateRoute);
