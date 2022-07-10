import { Alert, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { useAppSelector } from "../../../hooks/useRedux";
import useUserInput from "../../../hooks/useUserInput";
import IQuestion from '../../../interfaces/IQuestion';
import IQuiz from "../../../interfaces/IQuiz";
import quizOptions from "../../../utils/quizOptions";
import validators from "../../../validators";
import ConfirmDialog from "../../UI/ConfirmDialog/ConfirmDialog";
import AddQuestionDialog from "../AddQuestionDialog/AddQuestionDialog";

const CreateQuiz: React.FC = () => {
    const { isLoading, sendRequest } = useHttp();
    const user = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [questionToEdit, setQuestionToEdit] = useState<IQuestion | null>(null);
    const [questionIndexToDelete, setQuestionIndexToDelete] = useState<number | null>(null);

    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitle
    } = useUserInput(validators.minLength.bind(null, 5));
    const {
        value: categoryValue,
        isValid: categoryIsValid,
        hasError: categoryHasError,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler,
        reset: resetCategory
    } = useUserInput(validators.minLength.bind(null, 1));
    const {
        value: durationValue,
        isValid: durationIsValid,
        hasError: durationHasError,
        valueChangeHandler: durationChangeHandler,
        inputBlurHandler: durationBlurHandler,
        reset: resetDuration
    } = useUserInput(validators.minLength.bind(null, 1));

    const openQuestionDialog = () => setAddQuestionDialogOpen(true);

    const closeQuestionDialog = () => {
        setAddQuestionDialogOpen(false);
        setQuestionToEdit(null);
    };

    const openConfirmDialog = (i: number) => {
        setConfirmDialogOpen(true);
        setQuestionIndexToDelete(i);
    };

    const closeConfirmDialog = () => setConfirmDialogOpen(false);

    const addQuestionHandler = (q: IQuestion, isEdit: boolean) => {
        if (isEdit) {
            const index = questions.indexOf(questionToEdit!);
            setQuestions(oldValue => {
                oldValue[index] = q;
                return oldValue;
            })
        } else {
            setQuestions(oldValue => [...oldValue, q])
        }
    };

    const openEditQuestion = (q: IQuestion) => {
        setQuestionToEdit(q);
        openQuestionDialog();
    }

    const deleteQuestionHandler = () => {
        setQuestions(oldValue => {
            oldValue.splice(questionIndexToDelete!, 1);
            return [...oldValue];
        });
        closeConfirmDialog();
        setQuestionIndexToDelete(null);
    }

    let formIsValid = false;

    if (questions.length > 0 && titleIsValid && durationIsValid && categoryIsValid) {
        formIsValid = true;
    }

    const processResponse = (response: IQuiz) => {
        resetTitle();
        resetCategory();
        resetDuration();
        navigate("/quizzes/" + response.id);
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const quiz = {
            title: titleValue,
            duration: Number(durationValue),
            category: categoryValue,
            creator: Number(user._id),
            questions
        };
        sendRequest(quizOptions.add(quiz), processResponse);
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid container spacing={3} textAlign='center'>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1'>Add quiz</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id='title'
                        label='Quiz title'
                        variant='outlined'
                        type='text'
                        error={titleHasError}
                        disabled={isLoading}
                        value={titleValue}
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler} />
                </Grid>
                {titleHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Quiz title must be at least 5 characters long!
                    </Alert>
                </Grid>}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            label="Category"
                            error={categoryHasError}
                            disabled={isLoading}
                            value={categoryValue}
                            onChange={categoryChangeHandler}
                            onBlur={categoryBlurHandler} >
                            <MenuItem value='JavaScript'>JavaScript</MenuItem>
                            <MenuItem value='Java'>Java</MenuItem>
                            <MenuItem value='C#'>C#</MenuItem>
                            <MenuItem value='Python'>Python</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {categoryHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Category is required!
                    </Alert>
                </Grid>}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="duration">Duration in minutes</InputLabel>
                        <Select
                            labelId="duration"
                            id="duration"
                            label="Duration in minutes"
                            error={durationHasError}
                            disabled={isLoading}
                            value={durationValue}
                            onChange={durationChangeHandler}
                            onBlur={durationBlurHandler} >
                            <MenuItem value='10'>10</MenuItem>
                            <MenuItem value='15'>15</MenuItem>
                            <MenuItem value='20'>20</MenuItem>
                            <MenuItem value='25'>25</MenuItem>
                            <MenuItem value='30'>30</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {durationHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Duration is required!
                    </Alert>
                </Grid>}
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        {questions.map((q, i) => (
                            <Grid key={i} item xs={12} sm={4} md={3} xl={2}>
                                <Card>
                                    <CardContent sx={{ padding: '5px' }}>
                                        <Typography sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{q.text}</Typography>
                                    </CardContent>
                                    <CardActions sx={{ padding: '5px', justifyContent: 'center' }}>
                                        <Button size="small" onClick={() => openEditQuestion(q)} variant='contained'>Edit</Button>
                                        <Button size="small" onClick={() => openConfirmDialog(i)} color='error' variant='contained'>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={openQuestionDialog} color='secondary' variant='contained' sx={{ marginRight: 3 }}>Add question</Button>
                    <Button type='submit' variant='contained' disabled={!formIsValid || isLoading}>Submit</Button>
                </Grid>
            </Grid>
            <AddQuestionDialog open={addQuestionDialogOpen} onClose={closeQuestionDialog} onAddQuestion={addQuestionHandler} question={questionToEdit} />
            <ConfirmDialog
                open={confirmDialogOpen}
                title='Delete question'
                content='Please confirm you want to delete this question?'
                isLoading={isLoading}
                onConfirm={deleteQuestionHandler}
                onClose={closeConfirmDialog} />
        </form>
    )
}

export default CreateQuiz;