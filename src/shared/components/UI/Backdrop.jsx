import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Backdrop = (props) => {
  const content = <BackdropWrapper onClick={props.onClick} />;
  return createPortal(content, document.getElementById('backdrop-hook'));
};

const BackdropWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: ${(props) => props.theme.zIndex.backdrop};
  cursor: pointer;
`;

export default Backdrop;
