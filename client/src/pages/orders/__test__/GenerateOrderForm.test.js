import React from 'react';
import GenerateOrderForm from './../GenerateOrderForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
