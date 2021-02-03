import styled from 'styled-components';

const PageWrapper = (props) => {
  return <PageContentWrapper>{props.children}</PageContentWrapper>;
};

const PageContentWrapper = styled.div`
  padding: 54px 16px 16px 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
`;

export default PageWrapper;
