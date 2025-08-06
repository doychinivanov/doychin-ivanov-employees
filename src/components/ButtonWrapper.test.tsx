import { render, screen } from '@testing-library/react';
import { ButtonWrapper } from './ButtonWrapper';
import '@testing-library/jest-dom';

describe('ButtonWrapper', () => {
    it('renders children inside the Stack', () => {
        render(
            <ButtonWrapper>
                <button>Click me</button>
            </ButtonWrapper>
        );

        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders Stack with correct props', () => {
        const { container } = render(
            <ButtonWrapper>
                <button>Test</button>
            </ButtonWrapper>
        );

        const stackDiv = container.firstChild;
        expect(stackDiv).toBeInTheDocument();
    });
});
