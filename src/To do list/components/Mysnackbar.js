import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


export default function Mysnackbar({ open, handleSnackClose, Message }) {

    const handleClose = () => {
        handleSnackClose();
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            onClick={handleClose}
            >
                <TaskAltIcon fontSize="small" style={{color: "#22c55e",  marginRight: "130px" }} />
        </IconButton>
  );

    return (
        <Snackbar
        dir='rtl'
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message={Message}
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
            content: {
                sx: {
                    backgroundColor: '#d1fae5', 
                    color: '#065f46',         
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    borderRadius: 2,
                    boxShadow: 4,
                    textAlign: 'right',
                }
            }
        }}
        />
    );
}
