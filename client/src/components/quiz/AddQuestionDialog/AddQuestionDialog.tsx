import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { useEffect } from "react";
import useUserInput from "../../../hooks/useUserInput";
import IQuestion from "../../../interfaces/IQuestion";
import validators from "../../../validators";

interface Props {
    open: boolean;
    onClose: () => void;
    onAddQuestion: (q: IQuestion, isEdit: boolean) => void;
    question?: IQuestion | null;
}

const AddQuestionDialog: React.FC<Props> = ({ open, onClose, onAddQuestion, question }) => {
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
        if (question) {
            const correctResponse = question.responses.find(x => x.text === question.correctResponse);
            setTextValue(question.text);
            setResponseOneValue(question.responses[0].text);
            setResponseTwoValue(question.responses[1].text);
            setResponseThreeValue(question.responses[2].text);
            setResponseFourValue(question.responses[3].text);
            setCorrectResponseValue(question.responses.indexOf(correctResponse!).toString());
        }
    }, [question, setTextValue, setResponseOneValue, setResponseTwoValue, setResponseThreeValue, setResponseFourValue, setCorrectResponseValue]);

    let formIsValid = false;

    if (textIsValid && responseOneIsValid && responseTwoIsValid && responseThreeIsValid && responseFourIsValid && correctResponseIsValid) {
        formIsValid = true;
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

        onAddQuestion({
            text: textValue,
            responses,
            correctResponse: responses[Number(correctResponseValue)].text
        }, question !== null);
        closeHandler();
    }

    const closeHandler = () => {
        resetText();
        resetCorrectResponse();
        resetResponseOne();
        resetResponseTwo();
        resetResponseThree();
        resetResponseFour();

        onClose();
    }

    return (
        <Dialog open={open} onClose={closeHandler}>
            <DialogTitle sx={{ textAlign: 'center' }}>{question ? 'Edit' : 'Add'} question</DialogTitle>
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
                <Button onClick={onSubmit} variant='contained' disabled={!formIsValid}>{question ? 'Edit' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuestionDialog;