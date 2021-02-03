import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../../shared/components/UI/PageWrapper';
import PlaceItem from './PlaceItem';
import Btn from '../../shared/components/formElements/Btn';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <PageWrapper>
        <NoPlaceFoundWrapper>
          <NoPlaceFoundText>Oops, 找不到地點</NoPlaceFoundText>
          <Link to='/places/new'>
            <Btn secondary>分享</Btn>
          </Link>
        </NoPlaceFoundWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {props.items.map((item) => (
        <PlaceItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          address={item.address}
          creatorId={item.creator}
          location={item.location}
          onDelete={props.onDelete}
        />
      ))}
    </PageWrapper>
  );
};

const NoPlaceFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoPlaceFoundText = styled.h2`
  margin: 16px 0;
  text-align: center;
`;

export default PlaceList;
