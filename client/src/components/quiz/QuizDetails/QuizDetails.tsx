import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import IQuiz from "../../../interfaces/IQuiz";
import quizOptions from "../../../utils/quizOptions";
import AddQuestionDialog from "../../question/AddQuestionDialog/AddQuestionDialog";
import QuestionList from "../../question/QuestionList/QuestionList";

const QuizDetails: React.FC = () => {
    const { quizId } = useParams();
    const { isLoading, sendRequest } = useHttp();
    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);

    const openQuestionDialog = () => setAddQuestionDialogOpen(true);

    const closeQuestionDialog = () => {
        setAddQuestionDialogOpen(false);
    };

    const deleteQuestionHandler = (quizRes: IQuiz) => {
        setQuiz(quizRes);
    }

    const processResponse = (quizRes: IQuiz) => {
        setQuiz(quizRes);
    }

    useEffect(() => {
        sendRequest(quizOptions.getById(quizId), processResponse);
    }, [quizId, sendRequest]);

    return (
        <Grid container spacing={3} textAlign='center'>
            <Grid item xs={12}>
                <Typography variant='h3' component='h1'>{quiz?.title}</Typography>
            </Grid>
            <Grid item xs={12} marginBottom={3} >
                <QuestionList quiz={quiz!} onDeleteQuestion={deleteQuestionHandler} onAddQuestion={processResponse} onEditQuestion={processResponse}/>
            </Grid>
            <Grid>
                <Button variant="contained" onClick={openQuestionDialog}>Add question</Button>
            </Grid>
            <AddQuestionDialog open={addQuestionDialogOpen} onAddQuestion={processResponse} onClose={closeQuestionDialog} quiz={quiz!} />
        </Grid>
    )
}

export default QuizDetails;