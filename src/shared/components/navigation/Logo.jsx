import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to='/'>Travelog</Link>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.h1`
  margin: 0 auto;
  font-size: 24px;

  @media (min-width: ${({ theme }) => theme.device.md}) {
    margin: 0;
  }
`;

export default Logo;
