import {useNavigate} from 'react-router-dom';
import './AuthPage.css';
import AuthForm from './AuthForm.jsx';
import PropTypes from "prop-types";
import Header from "./Header.jsx";

export default function AuthPage({isLogin}) {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    if (isLogin && data.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('isLoggedIn', true);
      navigate("/main")
    }
    else {
      sessionStorage.removeItem('isLoggedIn');
      navigate("/login")
    }
  };

  return (
    <>
      <Header/>
      <div className='auth-page'>
        <div className='auth-container'>
          <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
          <AuthForm isLogin={isLogin} onSubmit={handleSubmit}/>
        </div>
      </div>
    </>
  );
}

AuthPage.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};