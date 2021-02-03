import styled from 'styled-components';

const Avatar = (props) => {
  return (
    <StyledAvatar
      src={props.image}
      alt={`${props.name} avatar`}
      width={props.width}
    />
  );
};

const StyledAvatar = styled.img`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  object-fit: cover;
  border-radius: 50%;
`;

export default Avatar;
