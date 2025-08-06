import Button from '@mui/material/Button';

interface MainButtonProps {
    text: string
    onClick?: () => void
    icon?: React.ReactElement;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick, icon }) => {

    return (
        <Button
            variant="contained"
            component="span"
            startIcon={icon}
            onClick={onClick}
            sx={{
                width: '200px',
                backgroundColor: '#ff9800',
                color: '#000',
                '&:hover': {
                    backgroundColor: '#fb8c00',
                },
            }}
        >
            {text}
        </Button>
    )
}

export default MainButton;