import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map });
  }, [center, zoom]);

  return <MapWrapper ref={mapRef} />;
};

const MapWrapper = styled.div`
  height: 300px;
  margin: 16px 0;

  @media (min-width: ${(props) => props.theme.device.md}) {
    height: 400px;
  }
`;

export default Map;
