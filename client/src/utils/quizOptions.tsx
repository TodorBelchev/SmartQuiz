import IAddQuiz from "../interfaces/IAddQuiz";

const { REACT_APP_BASE_URL } = process.env;

const add = (quiz: IAddQuiz) => {
    return {
        url: `${REACT_APP_BASE_URL}/quiz/add`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quiz)
    }
}

const edit = (quizId: string, quiz: IAddQuiz) => {
    return {
        url: `${REACT_APP_BASE_URL}/quiz/${quizId}/edit`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quiz)
    } 
}

const getAll = () => {
    return {
        url: `${REACT_APP_BASE_URL}/quiz/all`
    }
}

const getById = (id: string | undefined) => {
    return {
        url: `${REACT_APP_BASE_URL}/quiz/${id}`
    }
}


const quizOptions = {
    add,
    edit,
    getAll,
    getById
}

export default quizOptions;