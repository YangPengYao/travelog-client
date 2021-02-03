import styled from 'styled-components';
import PageWrapper from '../../shared/components/UI/PageWrapper';
import UserItem from './UsersItem';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <PageWrapper>
        <NoUserFoundText>找不到使用者</NoUserFoundText>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {props.items.map(({ id, name, image, places }) => (
        <UserItem
          key={id}
          id={id}
          image={image}
          name={name}
          placeCount={places.length}
        />
      ))}
    </PageWrapper>
  );
};

const NoUserFoundText = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export default UsersList;
