import React, { Component } from "react";
import "./auth.css";
class Authentication extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle = (e) => {
    e.preventDefault();
    document.querySelector(".auth-form-container").classList.toggle("s-signup");
  };
  render() {
    return (
      <>
        <div class='main-form-authentication'>
          <div class='auth-form-container'>
            <div class='auth-form sign-in'>
              <h2 class='heading-auth-form'>Sign In</h2>
              <label class='each-label-auth-form'>
                <span class='each-span-auth-form'>Email Address</span>
                <input
                  class='auth-form-input input-text'
                  type='email'
                  name='email'
                />
              </label>
              <label class='each-label-auth-form'>
                <span class='each-span-auth-form'>Password</span>
                <input
                  class='auth-form-input input-text'
                  type='password'
                  name='password'
                />
              </label>
              <button
                class='submit input-button auth-form-button-submit'
                type='button'
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
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Name</span>
                  <input class='auth-form-input input-text' type='text' />
                </label>
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Email</span>
                  <input class='auth-form-input input-text' type='email' />
                </label>
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Password</span>
                  <input class='auth-form-input input-text' type='password' />
                </label>
                <label class='each-label-auth-form'>
                  <span class='each-span-auth-form'>Confirm Password</span>
                  <input class='auth-form-input input-text' type='password' />
                </label>
                <button
                  type='button '
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
export default Authentication;
