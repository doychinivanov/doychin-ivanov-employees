import Alert from '@mui/material/Alert';

const FixedAlert = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 600,
        zIndex: 1300,
      }}
    >
      <Alert severity="error">{message}</Alert>
    </div>
  );
}

export default FixedAlert;