import { useContext, useState } from 'react';
import styled from 'styled-components';
import PageWrapper from '../../shared/components/UI/PageWrapper';
import Btn from '../../shared/components/formElements/Btn';
import Input from '../../shared/components/formElements/Input';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import ImageUploader from '../../shared/components/formElements/ImageUploader';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/useForm';
import useHttpClient from '../../shared/hooks/useHttpClient';
import { AuthContext } from '../../shared/context/auth';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const formInitState = isLoginMode
    ? {
        email: {
          value: '',
          isValid: false,
        },
        password: {
          value: '',
          isValid: false,
        },
      }
    : {
        name: {
          value: '',
          isValid: false,
        },
        email: {
          value: '',
          isValid: false,
        },
        password: {
          value: '',
          isValid: false,
        },
      };

  const [formState, inputHandler, setFromData] = useForm(formInitState, false);

  const switchModeHandler = (e) => {
    e.preventDefault();

    if (!isLoginMode) {
      setFromData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFromData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prevState) => !prevState);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.uid, responseData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();

        formData.append('image', formState.inputs.image.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/users/signup`,
          'POST',
          formData
        );

        auth.login(responseData.uid, responseData.token);
      } catch (error) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <PageWrapper>
        <AuthWrapper>
          {isLoading && <LoadingSpinner asOverlay />}
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <>
                <Mb16>
                  <ImageUploader
                    center
                    id='image'
                    onInput={inputHandler}
                    errorText='請選擇圖片'
                  />
                </Mb16>
                <Mb16>
                  <Input
                    id='name'
                    element='input'
                    type='text'
                    label='姓名'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='姓名不能為空'
                    onInput={inputHandler}
                  />
                </Mb16>
              </>
            )}
            <Input
              id='email'
              element='input'
              type='text'
              label='電子信箱'
              validators={[VALIDATOR_EMAIL()]}
              errorText='電子信箱格式有錯'
              onInput={inputHandler}
            />
            <Mt16>
              <Input
                id='password'
                element='input'
                type='password'
                label='密碼'
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText='密碼至少要六個字'
                onInput={inputHandler}
              />
            </Mt16>
            <Mt16>
              <BtnsWrapper>
                <Btn type='submit' disabled={!formState.isValid}>
                  {isLoginMode ? '登入' : '註冊'}
                </Btn>
                <StyledBtn onClick={switchModeHandler}>
                  {isLoginMode ? '切換註冊' : '切換登入'}
                </StyledBtn>
              </BtnsWrapper>
            </Mt16>
          </form>
        </AuthWrapper>
      </PageWrapper>
    </>
  );
};

const AuthWrapper = styled.div`
  margin-top: 16px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const Mt16 = styled.div`
  margin-top: 16px;
`;

const Mb16 = styled.div`
  margin-bottom: 16px;
`;

const BtnsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledBtn = styled(Btn)`
  margin-left: 16px;
`;

export default Auth;
