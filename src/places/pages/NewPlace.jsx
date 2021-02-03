import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../../shared/components/UI/PageWrapper';
import Btn from '../../shared/components/formElements/Btn';
import Input from '../../shared/components/formElements/Input';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import ImageUploader from '../../shared/components/formElements/ImageUploader';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/useForm';
import useHttpClient from '../../shared/hooks/useHttpClient';
import { AuthContext } from '../../shared/context/auth';

const NewPlace = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('image', formState.inputs.image.value);
    formData.append('title', formState.inputs.title.value);
    formData.append('description', formState.inputs.description.value);
    formData.append('address', formState.inputs.address.value);

    try {
      await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/places`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      history.push('/');
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <PageWrapper>
        <NewPlaceWrapper>
          {isLoading && <LoadingSpinner asOverlay />}
          <form onSubmit={placeSubmitHandler}>
            <ImageUploader
              center
              id='image'
              onInput={inputHandler}
              errorText='請選擇圖片'
            />
            <Mt16>
              <Input
                id='title'
                element='input'
                type='text'
                label='標題'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='標題不能為空'
                onInput={inputHandler}
              />
            </Mt16>
            <Mt16>
              <Input
                id='description'
                element='textarea'
                type='text'
                label='描述'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='描述至少要五個字'
                onInput={inputHandler}
              />
            </Mt16>
            <Mt16>
              <Input
                id='address'
                element='input'
                type='text'
                label='地址'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='地址不能為空'
                onInput={inputHandler}
              />
            </Mt16>
            <Mt16>
              <BtnsWrapper>
                <Btn type='submit' secondary disabled={!formState.isValid}>
                  新增
                </Btn>
              </BtnsWrapper>
            </Mt16>
          </form>
        </NewPlaceWrapper>
      </PageWrapper>
    </>
  );
};

const NewPlaceWrapper = styled.div`
  margin-top: 16px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const Mt16 = styled.div`
  margin-top: 16px;
`;

const BtnsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default NewPlace;
