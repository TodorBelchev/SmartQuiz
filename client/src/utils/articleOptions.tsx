import IArticle from "../interfaces/IArticle";

const { REACT_APP_BASE_URL } = process.env;

const add = (article: FormData) => {
    return {
        url: `${REACT_APP_BASE_URL}/article/add`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: article
    }
}


const articleOptions = {
    add
}

export default articleOptions;