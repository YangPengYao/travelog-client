import styled from 'styled-components';

const MainHeader = (props) => {
  return (
    <MainHeaderWrapper>
      <MainHeaderContent>{props.children}</MainHeaderContent>
    </MainHeaderWrapper>
  );
};

const MainHeaderWrapper = styled.header`
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.header};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-width: 320px;
  height: 54px;
  background-color: #fff;
`;

const MainHeaderContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 935px;
  padding: 0 16px;

  @media (min-width: ${(props) => props.theme.device.md}) {
    justify-content: space-between;
  }
`;

export default MainHeader;
