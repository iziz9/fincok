import React, { useEffect } from 'react';

const useOutSideClick = (
  ref: React.MutableRefObject<any>,
  handlerCallback: (event: CustomEvent<MouseEvent>) => void,
) => {
  useEffect(() => {
    // 이벤트 핸들러
    const handle = (event: CustomEvent<MouseEvent>) => {
      // ref가 없거나 클릭한 element가 하위에 속한 element일때 함수 종료
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handlerCallback(event);
    };

    // mount 되었을때 event 등록
    document.addEventListener('mousedown', handle as EventListener);
    document.addEventListener('touchstart', handle as EventListener);

    return () => {
      // unmount 되었을때 event 등록 해제
      document.removeEventListener('mousedown', handle as EventListener);
      document.removeEventListener('touchstart', handle as EventListener);
    };
  }, [ref, handlerCallback]);
};

export default useOutSideClick;
