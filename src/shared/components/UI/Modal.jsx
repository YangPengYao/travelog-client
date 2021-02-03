import { useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
  const content = (
    <ModalOverlayWrapper state={props.state}>
      <div>
        <header>
          <h2>{props.header}</h2>
        </header>
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div>{props.children}</div>
          <footer>{props.footer}</footer>
        </form>
      </div>
    </ModalOverlayWrapper>
  );

  return createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  const modalRef = useRef();

  return (
    <>
      {/* modal */}
      <Transition in={props.show} timeout={200} nodeRef={modalRef}>
        {(state) => (
          <div ref={modalRef}>
            <ModalOverlay {...props} state={state} />
          </div>
        )}
      </Transition>
      {/* backdrop */}
      {props.show && <Backdrop onClick={props.onCancel} />}
    </>
  );
};

const ModalOverlayWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 5vh;
  z-index: ${(props) => props.theme.zIndex.modal};
  width: 90%;
  max-width: 640px;
  padding: 24px;
  background-color: #fff;
  border-radius: ${(props) => props.theme.borderRadius.md};

  /* react-transition-group */
  transform: translateX(-50%)
    scale(
      ${(props) =>
        props.state === 'entering' || props.state === 'entered' ? '1' : '0'}
    );
  transition: 0.2s;

  @media (min-width: ${(props) => props.theme.device.md}) {
    width: 640px;
  }
`;

export default Modal;
