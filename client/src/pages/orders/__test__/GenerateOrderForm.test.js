import React from 'react';
import GenerateOrderForm from './../GenerateOrderForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
//checks all the order are redered adn visible 
describe('GenerateOrderForm component test cases', () => {
  test('renders without crashing', () => {
    render(<GenerateOrderForm />);
  });

  test('should buyer name visible', () => {
    render(<GenerateOrderForm />);
    const buyerName = screen.getByTestId('buyerName');
    expect(buyerName).toBeVisible();
  });
});
