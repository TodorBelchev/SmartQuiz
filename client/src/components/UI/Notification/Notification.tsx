import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { notificationActions } from "../../../store/notification";

const Notification: React.FC = () => {
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const notificationState = useAppSelector(state => state.notification);

    useEffect(() => {
        if (notificationState.text.length > 0) {
            setShow(true);
        }
    }, [notificationState.text]);

    const closeNotificationHandler = () => {
        setShow(false);
        setTimeout(() => {
            dispatch(notificationActions.close());
        }, 300);
    };


    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={show}
            onClose={closeNotificationHandler}>
            <Alert severity="error" sx={{ width: '100%' }}>
                {notificationState.text}
            </Alert>
        </Snackbar>
    )
}

export default Notification;