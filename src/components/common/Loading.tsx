import styled from 'styled-components';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  return (
    <Container>
      <HashLoader color="#f74440" size={100} speedMultiplier={1} />
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  height: 100vh;
  position: fixed;
  top: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

export default Loading;
