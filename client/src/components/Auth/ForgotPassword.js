/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import './auth.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';
//hoc componenent for resetting passowrd
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        'Content-Type': 'application/json'
      };
      await axios.post(`${baseUrl}/auth/password/forgot`, { email }, config);
      toast.success('email sent successfully');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <div className="main-form-authentication">
        <div className="auth-form-container">
          <div className="auth-form sign-in">
            <h2 className="heading-auth-form">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <label className="each-label-auth-form">
                <span className="each-span-auth-form">Email Address</span>
                <input
                  className="auth-form-input input-text"
                  data-testid="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button
                className="submit input-button auth-form-button-submit"
                data-testid="signIn"
                type="submit">
                Send Email
              </button>
            </form>
            <p className="forgot-pass">
              <Link to="/auth">Back</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
