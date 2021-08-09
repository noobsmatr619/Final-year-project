import React from 'react';
import AddProduct from './../AddProduct';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('AddProduct component test cases', () => {
  test('renders without crashing', () => {
    render(<AddProduct />);
  });

  test('should product name have visible', () => {
    render(<AddProduct />);
    const productName = screen.getByTestId('name');
    expect(productName).toBeVisible();
  });

  test('should product category visible', () => {
    render(<AddProduct />);
    const productCategory = screen.getByTestId('category');
    expect(productCategory).toBeVisible();
  });
});
