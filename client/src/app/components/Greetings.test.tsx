import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Greetings from './Greetings';

test('renders greeting with name', () => {
  render(<Greetings name='Sambid' />);
  const greetingElement = screen.getByText(/Hello, Sambid!/i);
  expect(greetingElement).toBeInTheDocument();
});

test('Update greeting text on button click', async () => {
  render(<Greetings name='Sambid' />);
  const button = screen.getByRole('button', { name: /Change Greetings/i });
  await userEvent.click(button);

  const newGreeting = screen.getByText('Welcome, Sambid!');
  expect(newGreeting).toBeInTheDocument();
  expect(newGreeting).toHaveTextContent(/Welcome, Sambid/i);
  expect(newGreeting).toBeVisible();
  expect(screen.getByTestId('greeting')).toHaveTextContent('Welcome, Sambid!');
});
