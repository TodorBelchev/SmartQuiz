import { Button, Grid, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import useHttp from "../../../hooks/useHttp";
import useUserInput from "../../../hooks/useUserInput";
import userOptions from "../../../utils/userOptions";
import validators from "../../../validators";

import classes from "./Login.module.css";

const Login: React.FC = () => {
    const { isLoading, sendRequest } = useHttp();
    const {
        value: usernameValue,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername
    } = useUserInput(validators.minLength.bind(null, 6));
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useUserInput(validators.minLength.bind(null, 3));


    function processResponse(response: any) {
        console.log("here");

        console.log(response);

        // throw new Error("Function not implemented.");
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        // if (!formIsValid) { return; }

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
                        id="username"
                        label="username"
                        variant="outlined"
                        value={usernameValue}
                        onChange={usernameChangeHandler}
                        onBlur={usernameBlurHandler} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="password"
                        label="password"
                        variant="outlined"
                        type="password"
                        value={passwordValue}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler} />
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant="contained" type="submit" sx={{ width: '100%' }}>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Login;
