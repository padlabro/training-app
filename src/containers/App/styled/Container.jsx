import styled from '@emotion/styled';

const Container = styled.div`
  margin: 0 auto;
  padding: 15px;
  margin-top: 50px;
  max-width: 1440px;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 50px auto 300px;
  grid-template-areas:
    'options sort'
    'options table'
    'options graph';
`;

export default Container;
