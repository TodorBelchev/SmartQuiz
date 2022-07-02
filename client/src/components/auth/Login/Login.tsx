import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import useHttp from "../../../hooks/useHttp";
import { useAppDispatch } from "../../../hooks/useRedux";
import { authActions } from "../../../store/auth";
import useUserInput from "../../../hooks/useUserInput";
import userOptions from "../../../utils/userOptions";
import validators from "../../../validators";

import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
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
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useUserInput(validators.minLength.bind(null, 3));

    let formIsValid = false;

    if (usernameIsValid && passwordIsValid) {
        formIsValid = true;
    }

    function processResponse(response: any) {
        resetUsername();
        resetPassword();
        dispatch(authActions.login(response));
        navigate("/");
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (!formIsValid) { return; }

        sendRequest(userOptions.login(usernameValue, passwordValue), processResponse);
    }


    return (
        <form className={classes['login-form']} onSubmit={submitHandler}>
            <Grid container spacing={3} textAlign={'center'}>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1'>Sign in</Typography>
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
                <Grid item xs={12} textAlign={'center'}>
                    <Button disabled={!formIsValid || isLoading} variant='contained' type='submit' sx={{ width: '100%' }}>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Login;
