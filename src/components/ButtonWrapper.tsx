import { Stack } from '@mui/material';

interface ButtonWrapperProps {
  children: React.ReactNode;
}

export const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ children }) => {

    return (
        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            {children}
        </Stack>
    )
}