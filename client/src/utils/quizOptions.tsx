import IQuiz from "../interfaces/IQuiz";

const { REACT_APP_BASE_URL } = process.env;

const add = (quiz: IQuiz) => {
    return {
        url: `${REACT_APP_BASE_URL}/quiz/add`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quiz)
    }
};

const getAll = () => {
    return {
        url: `${REACT_APP_BASE_URL}/quiz/all`
    }
}


const quizOptions = {
    add,
    getAll
}

export default quizOptions;