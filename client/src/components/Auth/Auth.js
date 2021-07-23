/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./auth.css";
import axios from "axios";
import { registerUser, loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { baseUrl } from "./../../baseUrl";
import { Redirect } from "react-router";
class Authentication extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      type: "staff",
      displayName: "",
      loginEmail: "",
      loginPassword: "",
      error: "",
      isError: false,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLoginEmail = this.handleLoginEmail.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleSignup = async e => {
    e.preventDefault();
    var regex =
      /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
    var passwordRegex = new RegExp(
      "^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[@$!%*#?&]).{7,}$"
    );
    const { displayName, email, password, confirmPassword } = this.state;
    if (displayName == "") {
      this.setState({
        isError: true,
        error: "Name Can Not Be Empty",
      });
    } else if (email == "") {
      this.setState({
        isError: true,
        error: "Email Can Not Be Empty",
      });
    } else if (!regex.test(email)) {
      this.setState({
        isError: true,
        error: "Please Input A Valid Email",
      });
    } else if (password == "") {
      this.setState({
        isError: true,
        error: "Password Can Not Be Empty",
      });
    } else if (password !== confirmPassword) {
      this.setState({
        isError: true,
        error: "Password MisMatch",
      });
    } else {
      //Posting Data
      await this.props.registerUser(this.state, this.props.history);
    }
  };
  handleLogin = async e => {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    var regex =
      /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
    if (loginEmail == "") {
      this.setState({
        isError: true,
        error: "Email Can Not Be Empty",
      });
    } else if (!regex.test(loginEmail)) {
      this.setState({
        isError: true,
        error: "Please Input A Valid Email",
      });
    } else if (loginPassword == "") {
      this.setState({
        isError: true,
        error: "Password Can Not Be Empty",
      });
    } else {
      //posting data for login
      const dataToSend = {
        email: loginEmail,
        password: loginPassword,
      };
      await this.props.loginUser(dataToSend, this.props.history);
    }
  };

  handleName = e => {
    this.setState({
      displayName: e.target.value,
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };
  handleLoginPassword = e => {
    this.setState({
      loginPassword: e.target.value,
    });
  };
  handleConfirmPassword = e => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };
  handleEmail = e => {
    this.setState({
      email: e.target.value,
    });
  };
  handleLoginEmail = e => {
    this.setState({
      loginEmail: e.target.value,
    });
  };
  handleCheck = e => {
    this.setState({
      type: e.target.name,
    });
  };
  handleToggle = e => {
    e.preventDefault();
    this.setState({
      isError: false,
    });
    document.querySelector(".auth-form-container").classList.toggle("s-signup");
  };
  render() {
    // if (localStorage.getItem("token")) {
    //   this.props.history.push("/");
    // }
    debugger;
    // if (this.props.isAuth) {
    //   return <Redirect to='/user-management' />;
    // }
    return (
      <>
        <div class='main-form-authentication'>
          <div class='auth-form-container'>
            <div class='auth-form sign-in'>
              <h2 class='heading-auth-form'>Sign In</h2>
              {this.state.isError ? (
                <p style={{ color: "red", textAlign: "center" }}>
                  {this.state.error}
                </p>
              ) : null}
              <label class='each-label-auth-form'>
                <span class='each-span-auth-form'>Email Address</span>
                <input
                  class='auth-form-input input-text'
                  type='email'
                  name='email'
                  value={this.state.loginEmail}
                  onChange={this.handleLoginEmail}
                />
              </label>
              <label class='each-label-auth-form'>
                <span class='each-span-auth-form'>Password</span>
                <input
                  class='auth-form-input input-text'
                  type='password'
                  name='password'
                  value={this.state.loginPassword}
                  onChange={this.handleLoginPassword}
                />
              </label>
              <button
                class='submit input-button auth-form-button-submit'
                type='button'
                onClick={this.handleLogin}
              >
                Sign In
              </button>
              <p class='forgot-pass'>Forgot Password ?</p>
            </div>

            <div class='sub-auth-form-container'>
              <div class='auth-form-image'>
                <div class='img-text m-up'>
                  <h2 class='heading-auth-form'>New here?</h2>
                  <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div class='img-text m-in'>
                  <h2 class='heading-auth-form'>One of us?</h2>
                  <p>
                    If you already has an account, just sign in. We've missed
                    you!
                  </p>
                </div>
                <div class='img-btn' onClick={this.handleToggle}>
                  <span class='m-up'>Sign Up</span>
                  <span class='m-in'>Sign In</span>
                </div>
              </div>
              <div class='auth-form sign-up'>
                <h2 class='heading-auth-form'>Sign Up</h2>
                {this.state.isError ? (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {this.state.error}
                  </p>
                ) : null}
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Name</span>
                  <input
                    class='auth-form-input input-text'
                    type='text'
                    value={this.state.displayName}
                    onChange={this.handleName}
                  />
                </label>
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Email</span>
                  <input
                    class='auth-form-input input-text'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                </label>
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Password</span>
                  <input
                    class='auth-form-input input-text'
                    type='password'
                    value={this.state.password}
                    onChange={this.handlePassword}
                  />
                </label>
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Confirm Password</span>
                  <input
                    class='auth-form-input input-text'
                    type='password'
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPassword}
                  />
                </label>

                <button
                  type='button'
                  onClick={this.handleSignup}
                  class='submit input-button auth-form-button-submit'
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.app.isAuth,
});
export default connect(mapStateToProps, { registerUser, loginUser })(
  Authentication
);
