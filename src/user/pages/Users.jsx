import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import useHttpClient from '../../shared/hooks/useHttpClient';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/users`
        );

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  );
};

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Users;
