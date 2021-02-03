import styled from 'styled-components';

const MenuToggler = (props) => {
  return (
    <MenuTogglerWrapper onClick={props.openDrawer}>
      <span></span>
      <span></span>
      <span></span>
    </MenuTogglerWrapper>
  );
};

const MenuTogglerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 48px;
  height: 30px;
  cursor: pointer;

  span {
    width: 32px;
    height: 4px;
    background-color: #000;
    border-radius: 2px;
  }

  @media (min-width: ${(props) => props.theme.device.md}) {
    display: none;
  }
`;

export default MenuToggler;
