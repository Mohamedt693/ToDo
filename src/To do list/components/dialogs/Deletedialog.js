import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Deletedialog({Delete, handleDeleteClose, handleDeleteConfirm}) {
    return (
        <Dialog
                style={{direction: "rtl"}}
                open={Delete}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> هل انت متأكد من حذف هذه المهمة ؟ </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" textAlign={"end"}> لا يمكنك التراجع عن الحذف بعد اتمامه </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose}>اغلاق</Button>
                <Button onClick={handleDeleteConfirm} autoFocus>نعم متأكد</Button>
                </DialogActions>
        </Dialog>
    )
}

export default Deletedialog
