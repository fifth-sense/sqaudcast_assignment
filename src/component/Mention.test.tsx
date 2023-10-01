import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MentionComponent from '../component/Mention'; // Adjust the import path as needed

test('renders MentionComponent with input field', () => {
  render(<MentionComponent />);
  const inputField = screen.getByPlaceholderText('Mention');
  expect(inputField).toBeInTheDocument();
});

test('mentions are displayed when "@" is typed', async () => {
  render(<MentionComponent />);
  const inputField = screen.getByPlaceholderText('Mention');

  userEvent.type(inputField, '@');

  const mentionOption1 = await screen.findByText('Wade Cooper');
  const mentionOption2 = await screen.findByText('Walter Isaacs');
  expect(mentionOption1).toBeInTheDocument();
  expect(mentionOption2).toBeInTheDocument();
});

test('selecting a mention inserts it into the input field', async () => {
  render(<MentionComponent />);
  const inputField = screen.getByPlaceholderText('Mention');

  userEvent.type(inputField, '@');

  const mentionOption = await screen.findByText('Walter Isaacs');
  fireEvent.click(mentionOption);

  expect(inputField).toHaveValue('@Walter Isaacs');
});
