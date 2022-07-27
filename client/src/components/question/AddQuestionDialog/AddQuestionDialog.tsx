import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { useEffect } from "react";
import useHttp from "../../../hooks/useHttp";
import useUserInput from "../../../hooks/useUserInput";
import IQuestion from "../../../interfaces/IQuestion";
import IQuiz from "../../../interfaces/IQuiz";
import questionOptions from "../../../utils/questionOptions";
import validators from "../../../validators";

interface Props {
    open: boolean;
    quiz: IQuiz;
    onClose: () => void;
    onAddQuestion: (quizRes: IQuiz) => void;
    onEditQuestion?: (quizRes: IQuiz) => void;
    questionToEdit?: IQuestion | null;
}

const AddQuestionDialog: React.FC<Props> = ({ open, quiz, onClose, onEditQuestion, onAddQuestion, questionToEdit }) => {
    const { isLoading, sendRequest } = useHttp();
    const {
        value: textValue,
        isValid: textIsValid,
        hasError: textHasError,
        valueChangeHandler: textChangeHandler,
        inputBlurHandler: textBlurHandler,
        reset: resetText,
        setValue: setTextValue
    } = useUserInput(validators.minLength.bind(null, 5));
    const {
        value: responseOneValue,
        isValid: responseOneIsValid,
        hasError: responseOneHasError,
        valueChangeHandler: responseOneChangeHandler,
        inputBlurHandler: responseOneBlurHandler,
        reset: resetResponseOne,
        setValue: setResponseOneValue
    } = useUserInput(validators.minLength.bind(null, 1));
    const {
        value: responseTwoValue,
        isValid: responseTwoIsValid,
        hasError: responseTwoHasError,
        valueChangeHandler: responseTwoChangeHandler,
        inputBlurHandler: responseTwoBlurHandler,
        reset: resetResponseTwo,
        setValue: setResponseTwoValue
    } = useUserInput(validators.minLength.bind(null, 1));
    const {
        value: responseThreeValue,
        isValid: responseThreeIsValid,
        hasError: responseThreeHasError,
        valueChangeHandler: responseThreeChangeHandler,
        inputBlurHandler: responseThreeBlurHandler,
        reset: resetResponseThree,
        setValue: setResponseThreeValue
    } = useUserInput(validators.minLength.bind(null, 1));
    const {
        value: responseFourValue,
        isValid: responseFourIsValid,
        hasError: responseFourHasError,
        valueChangeHandler: responseFourChangeHandler,
        inputBlurHandler: responseFourBlurHandler,
        reset: resetResponseFour,
        setValue: setResponseFourValue
    } = useUserInput(validators.minLength.bind(null, 1));
    const {
        value: correctResponseValue,
        isValid: correctResponseIsValid,
        hasError: correctResponseHasError,
        valueChangeHandler: correctResponseChangeHandler,
        inputBlurHandler: correctResponseBlurHandler,
        reset: resetCorrectResponse,
        setValue: setCorrectResponseValue
    } = useUserInput(validators.minLength.bind(null, 1));

    useEffect(() => {
        if (questionToEdit) {
            const correctResponse = questionToEdit.responses.find(x => x.id === questionToEdit.correctResponse);
            const index = questionToEdit.responses.indexOf(correctResponse!);

            setTextValue(questionToEdit.text);
            setResponseOneValue(questionToEdit.responses[0].text);
            setResponseTwoValue(questionToEdit.responses[1].text);
            setResponseThreeValue(questionToEdit.responses[2].text);
            setResponseFourValue(questionToEdit.responses[3].text);
            setCorrectResponseValue(index.toString() || '');
        }
    }, [questionToEdit, setTextValue, setResponseOneValue, setResponseTwoValue, setResponseThreeValue, setResponseFourValue, setCorrectResponseValue]);

    let formIsValid = false;

    if (textIsValid && responseOneIsValid && responseTwoIsValid && responseThreeIsValid && responseFourIsValid && correctResponseIsValid) {
        formIsValid = true;
    }

    const processResponse = (quizRes: IQuiz) => {
        if (onEditQuestion) {
            onEditQuestion(quizRes);
        } else {
            onAddQuestion(quizRes);
        }
        closeHandler();
    }

    const onSubmit = () => {
        if (!formIsValid) {
            return;
        }

        const responses = [
            { text: responseOneValue },
            { text: responseTwoValue },
            { text: responseThreeValue },
            { text: responseFourValue }
        ];

        const question: IQuestion = {
            correctResponse: responses[Number(correctResponseValue)].text,
            text: textValue,
            responses
        }

        let options = questionOptions.add(quiz?.id!.toString(), question);
        if (questionToEdit) {
            options = questionOptions.edit(questionToEdit.id!, quiz?.id!.toString(), question);
        }

        sendRequest(options, processResponse);
    }

    const closeHandler = () => {
        if (!questionToEdit) {
            resetText();
            resetCorrectResponse();
            resetResponseOne();
            resetResponseTwo();
            resetResponseThree();
            resetResponseFour();
        }

        onClose();
    }

    return (
        <Dialog open={open} onClose={closeHandler}>
            <DialogTitle sx={{ textAlign: 'center' }}>{questionToEdit ? 'Edit' : 'Add'} question</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ width: '100%', marginBottom: 3, marginTop: 1 }}
                    id='text'
                    label='Question text'
                    variant='outlined'
                    type='text'
                    error={textHasError}
                    value={textValue}
                    onChange={textChangeHandler}
                    onBlur={textBlurHandler} />
                {textHasError &&
                    <Alert variant="filled" severity="error" sx={{ marginBottom: 3 }}>
                        Question must be at least 5 characters long!
                    </Alert>}
                <TextField
                    sx={{ width: '100%', marginBottom: 3 }}
                    id='response-one'
                    label='Response one'
                    variant='outlined'
                    type='text'
                    error={responseOneHasError}
                    value={responseOneValue}
                    onChange={responseOneChangeHandler}
                    onBlur={responseOneBlurHandler} />
                {responseOneHasError &&
                    <Alert variant="filled" severity="error" sx={{ marginBottom: 3 }}>
                        Response must be at least 1 characters long!
                    </Alert>}
                <TextField
                    sx={{ width: '100%', marginBottom: 3 }}
                    id='response-two'
                    label='Response two'
                    variant='outlined'
                    type='text'
                    error={responseTwoHasError}
                    value={responseTwoValue}
                    onChange={responseTwoChangeHandler}
                    onBlur={responseTwoBlurHandler} />
                {responseTwoHasError &&
                    <Alert variant="filled" severity="error" sx={{ marginBottom: 3 }}>
                        Response must be at least 1 characters long!
                    </Alert>}
                <TextField
                    sx={{ width: '100%', marginBottom: 3 }}
                    id='response-three'
                    label='Response three'
                    variant='outlined'
                    type='text'
                    error={responseThreeHasError}
                    value={responseThreeValue}
                    onChange={responseThreeChangeHandler}
                    onBlur={responseThreeBlurHandler} />
                {responseThreeHasError &&
                    <Alert variant="filled" severity="error" sx={{ marginBottom: 3 }}>
                        Response must be at least 1 characters long!
                    </Alert>}
                <TextField
                    sx={{ width: '100%', marginBottom: 3 }}
                    id='response-four'
                    label='Response four'
                    variant='outlined'
                    type='text'
                    error={responseFourHasError}
                    value={responseFourValue}
                    onChange={responseFourChangeHandler}
                    onBlur={responseFourBlurHandler} />
                {responseFourHasError &&
                    <Alert variant="filled" severity="error" sx={{ marginBottom: 3 }}>
                        Response must be at least 1 characters long!
                    </Alert>}
                <FormControl fullWidth>
                    <InputLabel id="correct-response">Correct response</InputLabel>
                    <Select
                        labelId="correct-response"
                        id="correct-response"
                        label="Correct response"
                        error={correctResponseHasError}
                        value={correctResponseValue}
                        onChange={correctResponseChangeHandler}
                        onBlur={correctResponseBlurHandler}
                    >
                        <MenuItem value='0'>Response one</MenuItem>
                        <MenuItem value='1'>Response two</MenuItem>
                        <MenuItem value='2'>Response three</MenuItem>
                        <MenuItem value='3'>Response four</MenuItem>
                    </Select>
                </FormControl>
                {correctResponseHasError &&
                    <Alert sx={{ marginTop: 3, marginBottom: 3 }} variant="filled" severity="error">
                        Correct response is required!
                    </Alert>}
            </DialogContent>
            <DialogActions sx={{ padding: '20px' }}>
                <Button onClick={closeHandler} variant='contained' color='error'>Cancel</Button>
                <Button onClick={onSubmit} variant='contained' disabled={!formIsValid}>{questionToEdit ? 'Edit' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuestionDialog;