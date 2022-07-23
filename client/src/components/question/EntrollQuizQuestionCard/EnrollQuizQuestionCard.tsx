
import { Card, CardContent, Typography, Box, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import IQuestion from "../../../interfaces/IQuestion";
import { quizActions } from "../../../store/quiz";

interface Props {
    question: IQuestion;
}

const EntrollQuizQuestionCard: React.FC<Props> = ({ question }) => {
    const dispatch = useAppDispatch();
    const { selectedResponses } = useAppSelector(state => state.quiz);
    const [currentResponse, setCurrentResponse] = useState<{ responseId: number, questionId: number } | undefined>(undefined);

    useEffect(() => {
        const currentQuestion = selectedResponses.find(x => x.questionId === Number(question.id));
        if (currentQuestion) {
            setCurrentResponse(currentQuestion);
        }
    }, [question.id, selectedResponses]);

    const selectHandler = (responseId: number, questionId: number) => {
        const selectedResponse = selectedResponses.find(x => x.questionId === questionId);
        if (selectedResponse) {
            const newResponses = [...selectedResponses];
            const index = newResponses.indexOf(selectedResponse);
            newResponses[index] = { responseId, questionId };
            dispatch(quizActions.setSelectedResponses(newResponses));
        } else {
            dispatch(quizActions.setSelectedResponses([...selectedResponses, { responseId, questionId }]));
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="body1">{question.text}</Typography>
                {question.responses.map(r => (
                    <Box key={r.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox onClick={() => selectHandler(Number(r.id), Number(question.id))} checked={!!(currentResponse && currentResponse.responseId === Number(r.id))} />
                        <Typography variant="body2" sx={{ padding: '8px' }}>{r.text}</Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}

export default EntrollQuizQuestionCard;