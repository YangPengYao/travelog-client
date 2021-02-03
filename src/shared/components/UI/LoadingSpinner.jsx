import styled, { keyframes } from 'styled-components';

const LoadingSpinner = (props) => {
  if (props.asOverlay) {
    return (
      <SpinnerOverlay>
        <Spinner />
      </SpinnerOverlay>
    );
  }
  return <Spinner />;
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${(props) => props.theme.color.primary};
    border-color: ${(props) => props.theme.color.primary} transparent
      ${(props) => props.theme.color.primary} transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

const SpinnerOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingSpinner;
