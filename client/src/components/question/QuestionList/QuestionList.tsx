import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import useHttp from "../../../hooks/useHttp";
import IQuestion from "../../../interfaces/IQuestion";
import IQuiz from "../../../interfaces/IQuiz";
import questionOptions from "../../../utils/questionOptions";
import ConfirmDialog from "../../UI/ConfirmDialog/ConfirmDialog";
import AddQuestionDialog from "../AddQuestionDialog/AddQuestionDialog";

interface Props {
    quiz: IQuiz;
    onDeleteQuestion: (quiz: IQuiz) => void;
}

const QuestionList: React.FC<Props> = ({ quiz, onDeleteQuestion }) => {
    const [editQuestionDialogOpen, setEditQuestionDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState<IQuestion | null>(null);
    const [questionToDelete, setQuestionToDelete] = useState<IQuestion | null>(null);
    const { isLoading, sendRequest } = useHttp();

    const openEditQuestion = (q: IQuestion) => {
        setQuestionToEdit(q);
        setEditQuestionDialogOpen(true);
    }

    const openConfirmDialog = (q: IQuestion) => {
        setConfirmDialogOpen(true);
        setQuestionToDelete(q);
    };

    const deleteQuestionHandler = () => {
        sendRequest(questionOptions.deleteQuestion(questionToDelete?.id!, quiz?.id!.toString()), (quiz: IQuiz) => {
            setConfirmDialogOpen(false);
            setEditQuestionDialogOpen(false);
            onDeleteQuestion(quiz);
        });
    }

    return (
        <Grid container spacing={3}>
            {quiz?.questions!.map((q, i) => (
                <Grid key={i} item xs={12} sm={4} md={3} xl={2}>
                    <Card>
                        <CardContent sx={{ padding: '5px' }}>
                            <Typography sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{q.text}</Typography>
                        </CardContent>
                        <CardActions sx={{ padding: '5px', justifyContent: 'center' }}>
                            <Button size="small" onClick={() => openEditQuestion(q)} variant='contained'>Edit</Button>
                            <Button size="small" onClick={() => openConfirmDialog(q)} color='error' variant='contained'>Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            {quiz && <AddQuestionDialog open={editQuestionDialogOpen} onClose={() => setEditQuestionDialogOpen(false)} quiz={quiz} question={questionToEdit} />}
            <ConfirmDialog
                open={confirmDialogOpen}
                title='Delete question'
                content='Please confirm you want to delete this question?'
                isLoading={isLoading}
                onConfirm={deleteQuestionHandler}
                onClose={() => setConfirmDialogOpen(false)} />
        </Grid>
    )
}

export default QuestionList;