import {useNavigate} from 'react-router-dom';
import './AuthPage.css';
import AuthForm from './AuthForm.jsx';
import PropTypes from "prop-types";
import Header from "./Header.jsx";

export default function AuthPage({isLogin}) {
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    console.log(isLogin ? 'Login data submitted:' : 'Registration data submitted:', data);
    navigate("/main")
  };

  const backgroundImage = 'url("src/assets/Форма регистрации.png")'

  return (
    <>
      <Header/>
      <div className='auth-page' style={{backgroundImage}}>
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
}