import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login/Login';
import Layout from './components/layout/Layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/users/login' element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
