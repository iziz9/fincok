import React from 'react';
import { useLocation } from 'react-router';

const NotFound = () => {
  const location = useLocation();
  return (
    <div style={{ height: '80vh', textAlign: 'center' }}>
      <h3>존재하지 않는 경로입니다.</h3>
    </div>
  );
};

export default NotFound;
