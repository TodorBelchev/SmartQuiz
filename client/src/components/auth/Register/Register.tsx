import { Grid, Typography, TextField, Alert, Button } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { useAppDispatch } from "../../../hooks/useRedux";
import useUserInput from "../../../hooks/useUserInput";
import { authActions } from "../../../store/auth";
import userOptions from "../../../utils/userOptions";
import validators from "../../../validators";
import classes from "./Register.module.css";

const Register: React.FC = () => {
    const { isLoading, sendRequest } = useHttp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername
    } = useUserInput(validators.minLength.bind(null, 3));
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useUserInput(validators.isEmail);
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useUserInput(validators.minLength.bind(null, 3));
    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPassword
    } = useUserInput(validators.stringMatch.bind(null, passwordValue));

    let formIsValid = false;

    if (usernameIsValid && passwordIsValid && emailIsValid && confirmPasswordIsValid) {
        formIsValid = true;
    }

    function processResponse(response: any) {
        sendRequest(userOptions.login(usernameValue, passwordValue), () => {
            resetUsername();
            resetEmail();
            resetPassword();
            resetConfirmPassword();
            dispatch(authActions.login(response));
            navigate("/");
        });
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (!formIsValid) { return; }

        sendRequest(userOptions.register(usernameValue, emailValue, passwordValue, confirmPasswordValue), processResponse);
    }


    return (
        <form className={classes['register-form']} onSubmit={submitHandler}>
            <Grid container spacing={3} textAlign={'center'}>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1'>Sign up</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id='username'
                        label='username'
                        variant='outlined'
                        type='text'
                        error={usernameHasError}
                        disabled={isLoading}
                        value={usernameValue}
                        onChange={usernameChangeHandler}
                        onBlur={usernameBlurHandler} />

                </Grid>
                {usernameHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Username must be at least 3 characters long!
                    </Alert>
                </Grid>}
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id='email'
                        label='email'
                        variant='outlined'
                        type='email'
                        error={emailHasError}
                        disabled={isLoading}
                        value={emailValue}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler} />

                </Grid>
                {emailHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Enter a valid email please!
                    </Alert>
                </Grid>}
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id='password'
                        label='password'
                        variant='outlined'
                        type='password'
                        error={passwordHasError}
                        disabled={isLoading}
                        value={passwordValue}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler} />
                </Grid>
                {passwordHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Password must be at least 3 characters long!
                    </Alert>
                </Grid>}
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id='confirmPassword'
                        label='confirmPassword'
                        variant='outlined'
                        type='password'
                        error={confirmPasswordHasError}
                        disabled={isLoading}
                        value={confirmPasswordValue}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler} />
                </Grid>
                {confirmPasswordHasError && <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                        Passwords must match!
                    </Alert>
                </Grid>}
                <Grid item xs={12} textAlign={'center'}>
                    <Button disabled={!formIsValid || isLoading} variant='contained' type='submit' sx={{ width: '100%' }}>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Register;