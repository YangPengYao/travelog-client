import styled from 'styled-components';
import Modal from './Modal';
import Btn from '../formElements/Btn';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header='Oops~ 發生錯誤!!'
      show={!!props.error}
      footer={<Btn onClick={props.onClear}>Okay</Btn>}
    >
      <ErrorText>{props.error}</ErrorText>
    </Modal>
  );
};

const ErrorText = styled.p`
  padding: 16px 0;
`;

export default ErrorModal;
