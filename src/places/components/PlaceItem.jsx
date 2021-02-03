import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../shared/components/UI/Modal';
import Btn from '../../shared/components/formElements/Btn';
import Map from '../../shared/components/UI/Map';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import { AuthContext } from '../../shared/context/auth';
import useHttpClient from '../../shared/hooks/useHttpClient';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);

  const isMe = auth.uid === props.creatorId;

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const openConfirmDeleteHandler = () => {
    setShowConfirmDelete(true);
  };

  const closeConfirmDeleteHandler = () => {
    setShowConfirmDelete(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmDelete(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  const deleteFooter = (
    <FooterWrapper>
      <Btn onClick={closeConfirmDeleteHandler}>關閉</Btn>
      <ConfirmDeleteBtn danger onClick={confirmDeleteHandler}>
        刪除
      </ConfirmDeleteBtn>
    </FooterWrapper>
  );

  const mapFooter = (
    <FooterWrapper>
      <Btn danger onClick={closeMapHandler}>
        關閉
      </Btn>
    </FooterWrapper>
  );

  return (
    <>
      {/* error modal */}
      <ErrorModal error={error} onClear={clearError} />
      {/* modal (google map) */}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        footer={mapFooter}
      >
        <Map center={props.location} zoom={16} />
      </Modal>
      {/* modal (confirm delete) */}
      <Modal
        show={showConfirmDelete}
        onCancel={closeConfirmDeleteHandler}
        header='確認刪除'
        footer={deleteFooter}
      >
        <ConfirmDeleteText>確定要刪除嗎? 刪除完就無法恢復</ConfirmDeleteText>
      </Modal>
      {/* placeItem */}
      <PlaceItemWrapper>
        {isLoading && <LoadingSpinner asOverlay />}
        <PlaceItemImg
          src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
          alt={`${props.title} img`}
        />
        <PlaceItemInfoWrapper>
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </PlaceItemInfoWrapper>
        <SeparateLine />
        <PlaceItemBtnsWrapper>
          <PlaceItemBtns isLoggedIn={auth.isLoggedIn} isMe={isMe}>
            <Btn onClick={openMapHandler}>Google map</Btn>
            {isMe && (
              <>
                <Link to={`/places/${props.id}`}>
                  <Btn secondary>編輯</Btn>
                </Link>
                <Btn danger onClick={openConfirmDeleteHandler}>
                  刪除
                </Btn>
              </>
            )}
          </PlaceItemBtns>
        </PlaceItemBtnsWrapper>
      </PlaceItemWrapper>
    </>
  );
};

const PlaceItemWrapper = styled.article`
  margin-top: 16px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const PlaceItemImg = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const PlaceItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SeparateLine = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.color.border};
`;

const PlaceItemBtnsWrapper = styled.div`
  padding: 24px;

  @media (min-width: ${(props) => props.theme.device.md}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PlaceItemBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isMe ? 'space-between' : 'center')};
  align-items: center;
  height: 120px;

  @media (min-width: ${(props) => props.theme.device.md}) {
    flex-direction: row;
    width: 280px;
    height: auto;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const ConfirmDeleteText = styled.div`
  margin-top: 16px;
`;

const ConfirmDeleteBtn = styled(Btn)`
  margin-left: 16px;
`;

export default PlaceItem;
