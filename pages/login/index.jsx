import React, { useState, useEffect, useContext } from 'react';
import router from 'next/router';

import styles from  './index.module.scss';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { isValidEmail, isValidPassword } from '../../utils/functions';
import AuthContext from '../../contexts/authContext';
import { HOME_URL } from '../../utils/urls';

const LoginPage = () => {
  const auth = useContext(AuthContext);

  const [ password, setPassword ] = useState('');
  const [ isFormValid, setIsFormValid ] = useState(false);

  const SECONDS_TO_EXECUTE_INTERVAL = 300;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsFormValid(isValidEmail(auth.email) && isValidPassword(password));
    }, SECONDS_TO_EXECUTE_INTERVAL);

    return () => {
      clearTimeout(timeOut);
    };
  }, [ auth.email, password ]);

  const onLogin = () => {
    router.push(HOME_URL);
  };

  return (
    <main className={styles["login-page"]}>
      <div className={styles.form}>
        <h1 className={styles.form__title}>Auth</h1>

        <Input value={auth.email} onChange={auth.setEmail} id="email" placeholder="Email"/>
        <Input value={password} onChange={setPassword} id="password" placeholder="Password" type="password" />

        <Button onClick={onLogin} text="Login" disabled={!isFormValid} />
      </div>
    </main>
  );
};

export default LoginPage;
