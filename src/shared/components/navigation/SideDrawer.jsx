import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/auth';

const SideDrawer = (props) => {
  const auth = useContext(AuthContext);

  const content = (
    <aside>
      <nav>
        <SideDrawerWrapper state={props.state}>
          <StyledLi>
            <StyledLink to='/' exact onClick={props.closeDrawer}>
              使用者
            </StyledLink>
          </StyledLi>
          {auth.isLoggedIn && (
            <StyledLi>
              <StyledLink
                to={`/${auth.uid}/places`}
                exact
                onClick={props.closeDrawer}
              >
                我的地點
              </StyledLink>
            </StyledLi>
          )}
          {auth.isLoggedIn && (
            <StyledLi>
              <StyledLink to='/places/new' exact onClick={props.closeDrawer}>
                新增地點
              </StyledLink>
            </StyledLi>
          )}
          {!auth.isLoggedIn && (
            <StyledLi>
              <StyledLink to='/auth' exact onClick={props.closeDrawer}>
                登入
              </StyledLink>
            </StyledLi>
          )}
        </SideDrawerWrapper>
      </nav>
    </aside>
  );

  return createPortal(content, document.getElementById('drawer-hook'));
};

const SideDrawerWrapper = styled.ul`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: ${(props) => props.theme.zIndex.sideDrawer};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 288px;
  width: 70%;
  background-color: #fff;

  /* react-transition-group */
  transform: translateX(
    ${(props) =>
      props.state === 'entering' || props.state === 'entered' ? '0' : '-100%'}
  );
  transition: 0.2s;
`;

const StyledLi = styled.li`
  list-style: none;
  padding: 16px;
`;

const StyledLink = styled(NavLink).attrs((props) => ({
  activeStyle: {
    color: props.theme.color.primary,
  },
}))``;

export default SideDrawer;
