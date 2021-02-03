import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../../shared/components/UI/PageWrapper';
import Btn from '../../shared/components/formElements/Btn';
import Input from '../../shared/components/formElements/Input';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/useForm';
import useHttpClient from '../../shared/hooks/useHttpClient';
import { AuthContext } from '../../shared/context/auth';

const UpdatePlace = (props) => {
  const auth = useContext(AuthContext);
  const [loadedPlace, setLoadedPlace] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const pid = useParams().pid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/places/${pid}`
        );
        setLoadedPlace(responseData.place);
        setFormData({
          title: {
            value: responseData.place.title,
            isValid: true,
          },
          description: {
            value: responseData.place.description,
            isValid: true,
          },
        });
      } catch (error) {}
    };

    fetchPlace();
  }, [sendRequest, pid, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/places/${pid}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        }
      );

      history.push(`/${auth.uid}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <LoadingSpinnerWrapper>
        <LoadingSpinner />
      </LoadingSpinnerWrapper>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <PageWrapper>
        <NoPlaceFoundWrapper>
          <NoPlaceFoundText>Oops, 找不到地點</NoPlaceFoundText>
        </NoPlaceFoundWrapper>
      </PageWrapper>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <PageWrapper>
        <NewPlaceWrapper>
          {!isLoading && loadedPlace && (
            <form onSubmit={placeUpdateSubmitHandler}>
              <Input
                id='title'
                element='input'
                type='text'
                label='標題'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='標題不能為空'
                onInput={inputHandler}
                initialValue={loadedPlace.title}
                initialValid={true}
              />
              <Mt16>
                <Input
                  id='description'
                  element='textarea'
                  type='text'
                  label='描述'
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText='描述至少要五個字'
                  onInput={inputHandler}
                  initialValue={loadedPlace.description}
                  initialValid={true}
                />
              </Mt16>
              <Mt16>
                <BtnsWrapper>
                  <Btn type='submit' secondary disabled={!formState.isValid}>
                    更新
                  </Btn>
                </BtnsWrapper>
              </Mt16>
            </form>
          )}
        </NewPlaceWrapper>
      </PageWrapper>
    </>
  );
};

const NoPlaceFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoPlaceFoundText = styled.h2`
  margin: 16px 0;
  text-align: center;
`;

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

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default UpdatePlace;
