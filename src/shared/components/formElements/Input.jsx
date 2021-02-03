import { useReducer, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const element =
    props.element === 'input' ? (
      <StyledInput
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
        isValid={inputState.isValid || !inputState.isTouched}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    ) : (
      <StyledTextarea
        id={props.id}
        rows={props.rows || 3}
        value={inputState.value}
        isValid={inputState.isValid || !inputState.isTouched}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    );

  return (
    <div>
      <div>
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <ErrorText>{props.errorText}</ErrorText>
      )}
    </div>
  );
};

const inputMixin = css`
  display: block;
  width: 100%;
  padding: 4px 8px;
  margin-top: 8px;
  border: 1px solid
    ${(props) => (props.isValid ? 'gray' : props.theme.color.danger)};
  border-radius: ${(props) => props.theme.borderRadius.xs};
  outline: none;
  background-color: ${(props) =>
    props.isValid ? '#fff' : props.theme.color.lightDanger};

  :focus {
    box-shadow: 1px 1px 1px
      ${(props) => (props.isValid ? 'gray' : props.theme.color.danger)};
  }
`;

const StyledInput = styled.input`
  ${inputMixin}
`;

const StyledTextarea = styled.textarea`
  ${inputMixin}
`;

const ErrorText = styled.p`
  color: ${(props) => props.theme.color.danger};
`;

export default Input;
