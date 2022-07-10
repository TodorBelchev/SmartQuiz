import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface Props {
    open: boolean;
    title: string;
    content: string;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<Props> = ({ open, title, content, isLoading, onClose, onConfirm }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
            <DialogContent>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='contained' color='error'>Cancel</Button>
                <Button onClick={onConfirm} variant='contained' disabled={isLoading}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;