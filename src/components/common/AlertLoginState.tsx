import { FcHighPriority } from 'react-icons/fc';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

const AlertLoginState = (props: any) => {
  const navigate = useNavigate();

  return (
    <AlreadyLogin>
      {getCookie('accessToken') ? (
        <>
          <div>
            <img src="/denied.jpg" style={{ width: '400px' }} />
          </div>
          {props.text}
          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => history.back()}>이전 페이지로 돌아가기</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <img src="/login.jpg" style={{ width: '400px' }} />
          </div>
          {props.text}
          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => navigate('/login')}>로그인 페이지로</button>
          </div>
        </>
      )}
    </AlreadyLogin>
  );
};

export const AlreadyLogin = styled.div`
  font-size: 30px;
  color: var(--color-orange);
  text-align: center;
`;

export default AlertLoginState;
