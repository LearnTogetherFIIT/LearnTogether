import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './AuthForm.css';
import Button from "./Button.jsx";
import {registerUser, loginUser} from "../services/api.js";

export default function AuthForm({ isLogin, onSubmit }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const user = {login, password}
        console.log(password);
        const response = await loginUser(user);
        console.log(response)
        onSubmit(response);
      } catch (e) {
        console.log(e);
        alert(`Ошибка авторизации: ${e.response?.data}`)
      }
    } else {
      try {
        const UserName = login;
        const PasswordHash = password;
        const Rating = 0.0;
        const FullName = name + ' ' + surname;
        const Description = "учусь в пятом классе";
        const newUser = {UserName, FullName, PasswordHash, Rating, Description};
        console.log(UserName, PasswordHash, Rating, FullName)
        const response = await registerUser(newUser);
        console.log(response)
        onSubmit(response);
      } catch (e) {
        console.log(e);
        if (e.data.response === "User already exists")
          alert(`Такой пользователь уже существует! Попробуйте другой логин (ник в Telegram)`)
        else
          alert('Ошибка регистрации! Попробуйте ещё раз')
      }
    }
  };

  return (
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
            <>
              <div>
                <input
                    type="text"
                    id="surname"
                    placeholder="Фамилия"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
              </div>
              <div>
                <input
                    type="text"
                    id="name"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
              </div>
            </>
        )}
        <div>
          <input
              type="text"
              id="login"
              placeholder="Логин (ник в Telegram)"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
          />
        </div>
        <div className="password-input-container">
          <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Пароль"
              value={password}
              minLength={8}
              maxLength={15}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🐵️' : '🙈'}
          </button>
        </div>
        <Button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
        <p className="toggle-form-text">
          {isLogin ? (
              <>
                Ещё нет аккаунта?{' '}
                <Link to="/registration" className="toggle-form-link">Создайте</Link> его.
              </>
          ) : (
              <>
                Уже есть аккаунт?{' '}
                <Link to="/login" className="toggle-form-link">Войдите</Link>.
              </>
          )}
        </p>
      </form>
  );
}