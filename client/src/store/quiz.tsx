import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IQuizState from "../interfaces/IQuizState";

export const initialQuizState: IQuizState = {
    quiz: {
        id: undefined,
        category: undefined,
        creator: undefined,
        duration: undefined,
        title: undefined,
        questions: []
    },
    selectedResponses: []
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialQuizState,
    reducers: {
        setQuiz(state, action: PayloadAction<IQuizState['quiz']>) {
            state.quiz.id = action.payload.id;
            state.quiz.category = action.payload.category;
            state.quiz.creator = action.payload.creator;
            state.quiz.duration = action.payload.duration;
            state.quiz.title = action.payload.title;
            state.quiz.questions = action.payload.questions;
        },
        setSelectedResponses(state, action: PayloadAction<IQuizState['selectedResponses']>) {
            state.selectedResponses = action.payload;
        },
        clean(state) {
            state.quiz = initialQuizState.quiz;
            state.selectedResponses = initialQuizState.selectedResponses;
        }
    }
});

export const quizActions = quizSlice.actions;

export default quizSlice.reducer;