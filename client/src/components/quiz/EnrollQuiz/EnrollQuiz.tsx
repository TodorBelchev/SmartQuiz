import { Box, Stepper, Typography, Step, StepLabel, Button, StepContent } from "@mui/material";
import { useState, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import IQuiz from "../../../interfaces/IQuiz";
import IQuizState from "../../../interfaces/IQuizState";
import { quizActions } from "../../../store/quiz";
import quizOptions from "../../../utils/quizOptions";
import EnrollQuizQuestionCard from "../../question/EnrollQuizQuestionCard/EnrollQuizQuestionCard";
import CountdownTimer from "../../shared/CountdownTimer/CountdownTimer";
import ConfirmDialog from "../../UI/ConfirmDialog/ConfirmDialog";


const EnrollQuiz: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();
    const dispatch = useAppDispatch();
    const { quiz, selectedResponses } = useAppSelector(state => state.quiz);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        sendRequest(quizOptions.getById(quizId), (res: IQuiz) => {
            const quizState = res as IQuizState['quiz'];
            dispatch(quizActions.setQuiz(quizState));
        });
    }, [quizId, sendRequest, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(quizActions.clean());
        }
    }, [dispatch]);

    const submitHandler = () => {
        sendRequest(quizOptions.enroll(Number(quiz.id), selectedResponses), () => {
            navigate(-1);
        });
    }

    const handleNext = () => {
        if (activeStep === (quiz.questions && quiz.questions.length - 1)) {
            submitHandler();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const expiredTimeHandler = () => {
        setShowConfirm(true);
        submitHandler();
    }

    return (
        <Box>
            {quiz.duration && <Box>
                <CountdownTimer initialMinute={quiz.duration} initialSeconds={0} expiredTimeHandler={expiredTimeHandler} />
            </Box>}
            {showConfirm && <ConfirmDialog
                open={showConfirm}
                isLoading={isLoading}
                content="Your submit has been send due to expired quiz time!"
                title="Quiz time expired!"
                onConfirm={() => {
                    setShowConfirm(false);
                }}
            />}
            {width >= 1200 && <Stepper activeStep={activeStep}>
                {quiz.questions && quiz.questions.map((question, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>}
            {width < 1200 && <Stepper activeStep={activeStep} orientation="vertical">
                {quiz.questions && quiz.questions.map((question, index) => (
                    <Step key={question.id}>
                        <StepLabel>
                        </StepLabel>
                        <StepContent>
                            <EnrollQuizQuestionCard question={quiz.questions && quiz.questions[activeStep]} />
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, flexBasis: '100%' }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === (quiz.questions && quiz.questions.length - 1) ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>}
            {width >= 1200 && <Fragment>
                <Box>
                    <EnrollQuizQuestionCard question={quiz.questions && quiz.questions[activeStep]} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, flexBasis: '100%' }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext}>
                        {activeStep === (quiz.questions && quiz.questions.length - 1) ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Fragment>}
        </Box >
    )
}

export default EnrollQuiz;