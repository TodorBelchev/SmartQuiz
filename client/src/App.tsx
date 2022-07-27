import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateArticle from './components/article/CreateArticle/CreateArticle';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Layout from './components/layout/Layout/Layout';
import CreateQuiz from './components/quiz/CreateQuiz/CreateQuiz';
import EnrollQuiz from './components/quiz/EnrollQuiz/EnrollQuiz';
import QuizDetails from './components/quiz/QuizDetails/QuizDetails';
import QuizList from './components/quiz/QuizList/QuizList';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/quizzes/add' element={<CreateQuiz />} />
        <Route path='/quizzes/all' element={<QuizList />} />
        <Route path='/quizzes/:quizId' element={<QuizDetails />} />
        <Route path='/quizzes/:quizId/edit' element={<CreateQuiz isEdit={true} />} />
        <Route path='/quizzes/:quizId/enroll' element={<EnrollQuiz />} />
        <Route path='/articles/add' element={<CreateArticle />} />
      </Routes>
    </Layout>
  );
}

export default App;
