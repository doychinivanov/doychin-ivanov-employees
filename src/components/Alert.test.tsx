import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FixedAlert from './Alert';

describe('FixedAlert', () => {
  it('renders the message and has error severity', () => {
    const testMessage = 'Test error message';

    render(<FixedAlert message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('MuiAlert-standardError');
  });
});
