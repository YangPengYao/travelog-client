import styled, { css } from 'styled-components';

const Btn = (props) => {
  return (
    <BtnWrapper {...props} onClick={props.onClick}>
      {props.children}
    </BtnWrapper>
  );
};

const normalMixin = css`
  color: #000;
  border: 1px solid #000;
  background-color: #fff;
  :hover {
    color: #fff;
    background-color: #000;
  }
`;

const secondaryMixin = css`
  color: ${(props) => props.theme.color.secondary};
  border: 1px solid ${(props) => props.theme.color.secondary};
  background-color: #fff;
  :hover {
    color: #fff;
    background-color: ${(props) => props.theme.color.secondary};
  }
`;

const dangerMixin = css`
  color: #fff;
  border: 1px solid ${(props) => props.theme.color.danger};
  background-color: ${(props) => props.theme.color.danger};
  :hover {
    color: #fff;
    border: 1px solid ${(props) => props.theme.color.dangerHover};
    background-color: ${(props) => props.theme.color.dangerHover};
  }
`;

const disabledMixin = css`
  color: gray;
  border: 1px solid ${(props) => props.theme.color.border};
  background-color: ${(props) => props.theme.color.border};
  :hover {
    cursor: not-allowed;
  }
`;

const BtnWrapper = styled.button`
  ${(props) => {
    if (props.disabled) return disabledMixin;
    if (props.secondary) return secondaryMixin;
    else if (props.danger) return dangerMixin;
    else return normalMixin;
  }}

  cursor: pointer;
  padding: 4px 12px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 16px;
  transition: 0.2s;
`;

export default Btn;
