import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../../shared/components/UI/Avatar';

const UsersItem = (props) => {
  return (
    <Link to={`/${props.id}/places`}>
      <UsersItemWrapper>
        <UsersItemImgWrapper>
          <Avatar
            name={props.name}
            image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            width={70}
          />
        </UsersItemImgWrapper>
        <UsersItemContent>
          <h2>{props.name}</h2>
          <h3>記錄點數量: {props.placeCount}</h3>
        </UsersItemContent>
      </UsersItemWrapper>
    </Link>
  );
};

const UsersItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 120px;
  padding: 24px;
  margin-top: 16px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
`;

const UsersItemImgWrapper = styled.div`
  margin-right: 16px;
`;

const UsersItemContent = styled.div`
  > h2,
  > h3 {
    font-weight: 300;
  }
`;

export default UsersItem;
