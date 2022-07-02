import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Layout from './components/layout/Layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
