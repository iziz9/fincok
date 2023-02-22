import { FcHighPriority } from 'react-icons/fc';
import styled from 'styled-components';

const AlertLoginState = (props: any) => {
  return (
    <AlreadyLogin>
      <div>
        <FcHighPriority style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
      </div>
      {props.text}
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => history.back()}>이전 페이지로 돌아가기</button>
      </div>
    </AlreadyLogin>
  );
};

export const AlreadyLogin = styled.div`
  padding-top: 100px;
  font-size: 30px;
  color: var(--color-orange);
  text-align: center;
`;

export default AlertLoginState;
