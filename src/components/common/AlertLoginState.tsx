import { FcHighPriority } from 'react-icons/fc';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

const AlertLoginState = (props: any) => {
  const navigate = useNavigate();

  return (
    <AlreadyLogin>
      <div>
        <FcHighPriority style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
      </div>
      {props.text}
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
        {getCookie('accessToken') ? (
          <button onClick={() => history.back()}>이전 페이지로 돌아가기</button>
        ) : (
          <button onClick={() => navigate('/login')}>로그인 페이지로</button>
        )}
      </div>
    </AlreadyLogin>
  );
};

export const AlreadyLogin = styled.div`
  padding-top: 100px;
  font-size: 30px;
  color: var(--color-orange);
  text-align: center;
  button {
    padding: 0 30px;
  }
`;

export default AlertLoginState;
