import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

it('button as corrent initial color', () => {
  render(<App />);
  //find a element with a role of button and text of chnage to blue
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  //expect the background to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  //click button
  fireEvent.click(colorButton);

  //expect background color of button to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidightBlue' });

  //expect text of button to be  chnage to red
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
});

it('initial conditions', () => {
  render(<App />);

  //check that button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  expect(colorButton).toBeEnabled();

  //check that checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

it('checkbox disables button on first click and enables on the second', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

it('disabled button color is gray when enabled button color is violet red', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  //enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

it('click button to change color then disable button and it should be gray when enabled - blue', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camel case capital letters', () => {
  it('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  it('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  it('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
