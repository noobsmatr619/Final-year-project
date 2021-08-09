import React from 'react';
import AddMachine from './../AddMachine';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('AddMachine component test cases', () => {
  test('renders without crashing', () => {
    render(<AddMachine />);
  });

  test('should machine button have text Add', () => {
    const { queryByTestId } = render(<AddMachine />);
    const addMachineButton = screen.getByTestId('add-machine');
    expect(addMachineButton).toHaveTextContent('Add');
  });

  test('should machine button have type submit', () => {
    const { queryByTestId } = render(<AddMachine />);
    const addMachineButton = screen.getByTestId('add-machine');
    expect(addMachineButton).toHaveAttribute('type', 'submit');
  });
});
