import { render, screen, fireEvent } from '@testing-library/react';
import MainButton from './MainButton';
import { createElement } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import '@testing-library/jest-dom';

describe('MainButton', () => {
  it('renders with text', () => {
    render(<MainButton text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MainButton text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icon', () => {
    render(<MainButton text="Home" icon={createElement(HomeIcon)} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    const icon = screen.getByTestId('HomeIcon');
    expect(icon).toBeInTheDocument();
  });
});
