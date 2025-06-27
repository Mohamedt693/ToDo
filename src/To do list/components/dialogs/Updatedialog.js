import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Updatedialog({update, updateValue, setUpdateValue, handleUpdateClose, handleUpdateConfirm}) {

    return (
        <Dialog
            style={{direction: "rtl"}}
            open={update}
            onClose={handleUpdateClose}
        >
                <DialogTitle>تعديل المهمة</DialogTitle>
                <DialogContent style={{width: "550px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
                    <TextField value={updateValue.title} onChange={(e)=> setUpdateValue({...updateValue, title: e.target.value})} variant="standard" slotProps={{inputLabel: {shrink: true,}}} label='العنوان' />
                    <TextField value={updateValue.details} onChange={(e)=> setUpdateValue({...updateValue, details: e.target.value})} variant="standard" slotProps={{inputLabel: {shrink: true,}}} label='النفاصيل'/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>اغلاق</Button>
                    <Button onClick={handleUpdateConfirm}>تعديل</Button>
                </DialogActions>
        </Dialog>
  )
}

export default Updatedialog;
