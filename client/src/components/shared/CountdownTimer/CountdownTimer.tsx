import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    initialMinute: number;
    initialSeconds: number;
    expiredTimeHandler: () => void;
}

const CountdownTimer: React.FC<Props> = ({ initialMinute, initialSeconds, expiredTimeHandler }) => {
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
            if (minutes === 0 && seconds === 0) {
                expiredTimeHandler();
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            {minutes === 0 && seconds === 0
                ? null
                : <Card sx={{ padding: 3, margin: '20px 0', textAlign: 'center' }}>
                    <Typography variant="h4">Remaining time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Typography>
                </Card>
            }
        </div>
    )
}

export default CountdownTimer;