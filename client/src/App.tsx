import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Layout from './components/layout/Layout/Layout';
import CreateQuiz from './components/quiz/CreateQuiz/CreateQuiz';
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
      </Routes>
    </Layout>
  );
}

export default App;
