import { useState } from 'react';
import React from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Formik} from 'formik';
import icons from '../../icons/icons.svg'
import { signIn } from 'redux/auth/authOperations';
import {
  Forma,
  FormContainer,
  Input,
  Button,
  Title,
  ErrBox,
  AppBox,
  ShowPassword,
  StyledLink,
  ClearInput,
} from './LoginForm.styled';



const LoginSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required(`Email is required`)
      .email(`Enter a valid Email`)
      .trim(),
    password: yup
      .string()
      .required(`Password is required`)
      .min(6, `Too short min 6 characters`)
      .max(16, `Too long max 16 characters`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
        'Password should be min 6 characters, 1 uppercase, 1 lowercase, 1 number'
      )
      .trim(),
  });

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const formSubmit = ({ email, password }, { resetForm }) => {
    dispatch(signIn({ email, password }));
    resetForm();
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };
  const clearInput = () => {
    const inputs = document.querySelector('input[type=email]');
    inputs.value = '';
  };
  return (

      <FormContainer>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: '',
            password: '',}}
          onSubmit={formSubmit}
        >
          {({ errors, touched }) => (
            <Forma>
              <Title>Login</Title>
              <div>
                <Input
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  error={errors.email && touched.email && 'false'}
                  valid={!errors.email && touched.email ? 'true' :  undefined}
                />
                {touched.email &&
                  (errors.email ? (
                    <ErrBox>{errors.email}</ErrBox>
                  ) : (
                    <AppBox>Email is correct</AppBox>
                  ))}
                <ClearInput>
                  {' '}
                  {touched.email &&
                    (!errors.email ? <svg style={{ fill: '#00C3AD' }}><use href={icons +'#icon-check'}></use></svg>
                     :  <svg style={{ fill: '#F43F5E' }} onClick={clearInput}><use href={icons +'#icon-cross-small'}></use></svg>
                    )}
                </ClearInput>
              </div>
              <div>
                <Input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  error={errors.password && touched.password && 'false'}
                  valid={!errors.password && touched.password ? 'true' :  undefined}
                />

                <ShowPassword onClick={showPassword}  error={errors.password && touched.password && 'false'}  valid={!errors.password && touched.password && '!null'}>
                  {!showPass ? <svg><use href={icons +'#icon-eye-closed'}></use></svg> :  <svg><use href={icons +'#icon-eye-open'}></use></svg>}
                </ShowPassword>
                {touched.password &&
                  (errors.password ? (
                    <ErrBox>{errors.password}</ErrBox>
                  ) : (
                    <AppBox>Password is secure</AppBox>
                  ))}
              </div>

              <Button type="submit" >Login</Button>

              <div>
                <span>Don't have an account?</span>{' '}
                <StyledLink to="/register">Register</StyledLink>
              </div>
            </Forma>
          )}
        </Formik>
      </FormContainer>
  );
};

