import React from 'react';
import AddMaterial from './../AddMaterial';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// checks for rendersing and check the required fields are visibe 
describe('AddMaterial component test cases', () => {
  test('renders without crashing', () => {
    render(<AddMaterial />);
  });

  test('should material name visible', () => {
    render(<AddMaterial />);
    const materialName = screen.getByTestId('name');
    expect(materialName).toBeVisible();
  });

  test('should material quantity visible', () => {
    render(<AddMaterial />);
    const materialCategory = screen.getByTestId('quantity');
    expect(materialCategory).toBeVisible();
  });
});
