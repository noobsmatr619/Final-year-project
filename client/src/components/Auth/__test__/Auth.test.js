import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../store';
import history from '../../../history';
import Auth from './../Auth.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {  Router } from 'react-router-dom';

describe('Auth component test cases', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Auth />
        </Router>
      </Provider>
    );
  });

  test('should email field visible', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Auth />
        </Router>
      </Provider>
    );

    expect(queryByTestId('email')).toBeVisible();
  });

  it('should login button have text Login', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Auth />
        </Router>
      </Provider>
    );
    const checkLoginButton = screen.getByTestId('signIn');
    expect(checkLoginButton).toHaveTextContent('Sign In');
  });
});
