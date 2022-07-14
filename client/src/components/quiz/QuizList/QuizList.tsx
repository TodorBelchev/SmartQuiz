import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { useAppSelector } from "../../../hooks/useRedux";
import IQuiz from "../../../interfaces/IQuiz";
import quizOptions from "../../../utils/quizOptions";

const QuizList: React.FC = () => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const user = useAppSelector(state => state.auth);
    const { sendRequest } = useHttp();

    const processResponse = (response: IQuiz[]) => {
        setQuizzes(response);
    }

    useEffect(() => {
        sendRequest(quizOptions.getAll(), processResponse)
    }, [sendRequest]);

    return (
        <Grid container spacing={3} textAlign='center'>
            <Grid item xs={12}>
                <Typography variant='h3' component='h1'>All quizzes</Typography>
            </Grid>
            {quizzes.map(q => (
                <Grid key={q.id} item xs={12} sm={6} md={4} xl={3}>
                    <Card sx={{ padding: '10px' }}>
                        <CardContent>
                            <Typography variant='h6' sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{q.title}</Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to={`/quizzes/${q.id}/edit`}>
                                <Button variant='contained' color='info' size="small">Edit</Button>
                            </Link>
                            <Link to={`/quizzes/${q.id}/delete`}>
                                <Button variant='contained' color='error' size="small">Delete</Button>
                            </Link>
                            <Link to={`/quizzes/${q.id}`}>
                                <Button variant='contained' size="small">Details</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default QuizList;