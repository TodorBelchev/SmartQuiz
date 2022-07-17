import IQuestion from "../interfaces/IQuestion";

const { REACT_APP_BASE_URL } = process.env;

const getById = (id: string | undefined) => {
    return {
        url: `${REACT_APP_BASE_URL}/question/${id}`
    }
}

const add = (quizId: string, question: IQuestion) => {
    return {
        url: `${REACT_APP_BASE_URL}/question/add`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, quizId })
    }
}

const deleteQuestion = (questionId: string, quizId: string) => {
    return {
        url: `${REACT_APP_BASE_URL}/question/${questionId}/${quizId}`,
        method: 'DELETE'
    }
}

const questionOptions = {
    getById,
    add,
    deleteQuestion
}

export default questionOptions;