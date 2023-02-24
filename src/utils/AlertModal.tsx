import React from 'react';
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styled from 'styled-components';

type ConfirmType = {
  type: string;
  message: string;
  action?: any;
};
// 타입: alert, confirm 구분
// 액션: 확인 눌렀을 때 동작할 함수
// 메시지 : 띄울 메시지

// AlertModal({
//   message: '이동하시겠습니까?',
//   action: () => {
//     console.log('내비게이트');
//   },
//   type: 'confirm',
// });

const AlertModal = ({ message, action, type }: ConfirmType) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="popup-overlay">
          {type === 'confirm' ? (
            <>
              <Div>{message}</Div>
              <div className="confirm-container">
                <button
                  onClick={() => {
                    action();
                    onClose();
                  }}
                >
                  확인
                </button>
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  취소
                </button>
              </div>
            </>
          ) : (
            <>
              {action ? (
                <>
                  <Div>{message}</Div>
                  <div className="confirm-container">
                    <button
                      onClick={() => {
                        action();
                        onClose();
                      }}
                    >
                      확인
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Div>{message}</Div>
                  <div className="confirm-container">
                    <button
                      onClick={() => {
                        onClose();
                      }}
                    >
                      확인
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      );
    },
  });
};

const Div = styled.div`
  word-break: keep-all;
  line-height: 25px;
  font-size: 20px;
  margin: 20px auto 30px;
`;

export default AlertModal;
