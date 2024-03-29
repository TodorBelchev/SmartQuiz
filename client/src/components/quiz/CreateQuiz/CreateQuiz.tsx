import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCallbackPrompt from "../../../hooks/useCallbackPrompt";
import useHttp from "../../../hooks/useHttp";
import { useAppSelector } from "../../../hooks/useRedux";
import useUserInput from "../../../hooks/useUserInput";
import IQuiz from "../../../interfaces/IQuiz";
import quizOptions from "../../../utils/quizOptions";
import validators from "../../../validators";
import ConfirmDialog from "../../UI/ConfirmDialog/ConfirmDialog";

interface Props {
    isEdit?: boolean;
}

const CreateQuiz: React.FC<Props> = ({ isEdit }) => {
    const { isLoading, sendRequest } = useHttp();
    const { quizId } = useParams();
    const user = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog);
    const [quiz, setQuiz] = useState<IQuiz | null>(null);

    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitle,
        setValue: setTitle
    } = useUserInput(validators.minLength.bind(null, 5));
    const {
        value: categoryValue,
        isValid: categoryIsValid,
        hasError: categoryHasError,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler,
        reset: resetCategory,
        setValue: setCategory
    } = useUserInput(validators.minLength.bind(null, 1));
    const {
        value: durationValue,
        isValid: durationIsValid,
        hasError: durationHasError,
        valueChangeHandler: durationChangeHandler,
        inputBlurHandler: durationBlurHandler,
        reset: resetDuration,
        setValue: setDuration
    } = useUserInput(validators.minLength.bind(null, 1));

    useEffect(() => {
        if (isEdit) {
            sendRequest(quizOptions.getById(quizId), (res: IQuiz) => {
                setQuiz(res);
                setTitle(res.title);
                setCategory(res.category.name);
                setDuration(res.duration.toString());
            })
        } else {
            resetTitle();
            resetDuration();
            resetCategory();
        }
    }, [isEdit, quizId, sendRequest, setTitle, setCategory, setDuration, resetTitle, resetDuration, resetCategory]);

    const redirectHandler = (navigationAction: boolean | (() => void)) => {
        if (typeof navigationAction === 'function') {
            navigationAction();
        }
        return navigationAction;
    }

    let formIsValid = false;

    if (titleIsValid && durationIsValid && categoryIsValid) {
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

        if (!formIsValid) { return; }

        const quiz = {
            title: titleValue,
            duration: Number(durationValue),
            category: categoryValue,
            creator: Number(user._id)
        };

        setShowDialog(false);

        let options = quizOptions.add(quiz);
        if (isEdit) {
            options = quizOptions.edit(quizId!, quiz);
        }
        sendRequest(options, processResponse);
    }

    const cancelHandler = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={submitHandler}>
            <ConfirmDialog
                open={!!showPrompt}
                content="There is not saved progress. Are you sure you want to leave?"
                title="Warning"
                isLoading={isLoading}
                onClose={() => redirectHandler(cancelNavigation)}
                onConfirm={() => redirectHandler(confirmNavigation)} />
            <Grid container spacing={3} textAlign='center'>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1'>{isEdit ? "Edit" : "Add"} quiz</Typography>
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
                        onChange={(e) => {
                            titleChangeHandler(e);
                            setShowDialog(true);
                        }}
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
                            onChange={(e) => {
                                categoryChangeHandler(e);
                                setShowDialog(true);
                            }}
                            onBlur={categoryBlurHandler} >
                            <MenuItem value='JAVASCRIPT'>JavaScript</MenuItem>
                            <MenuItem value='JAVA'>Java</MenuItem>
                            <MenuItem value='C#'>C#</MenuItem>
                            <MenuItem value='PYTHON'>Python</MenuItem>
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
                            onChange={(e) => {
                                durationChangeHandler(e);
                                setShowDialog(true);
                            }}
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
                    <Button type='submit' variant='contained' disabled={!formIsValid || isLoading} sx={{ marginRight: 3 }}>Submit</Button>
                    <Button variant='contained' color='error' disabled={isLoading} onClick={cancelHandler}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default CreateQuiz;