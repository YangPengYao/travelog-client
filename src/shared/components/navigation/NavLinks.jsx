import { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth';
import Btn from '../../components/formElements/Btn';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <NavLinksWrapper>
        <li>
          <StyledLink to='/' exact>
            使用者
          </StyledLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <StyledLink to={`/${auth.uid}/places`} exact>
              我的地點
            </StyledLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <StyledLink to='/places/new' exact>
              新增地點
            </StyledLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <StyledLink to='/auth' exact>
              登入
            </StyledLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <Btn onClick={auth.logout}>登出</Btn>
          </li>
        )}
      </NavLinksWrapper>
    </nav>
  );
};

const NavLinksWrapper = styled.ul`
  display: none;

  @media (min-width: ${(props) => props.theme.device.md}) {
    display: flex;
    align-items: center;
    list-style: none;

    > li {
      margin-left: 16px;
    }

    > li:first-child {
      margin-left: 0;
    }

    > li:hover {
      text-decoration: underline;
    }
  }
`;

const StyledLink = styled(NavLink).attrs((props) => ({
  activeStyle: {
    color: props.theme.color.primary,
  },
}))``;

export default NavLinks;
