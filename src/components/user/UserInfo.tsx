import React, { useState } from 'react';
import CertifyUser from './CertifyUser';
import EditUser from './EditUser';

function UserInfo() {
  const [certify, setCertify] = useState(false);
  const [userPassword, setUserPassword] = useState();
  return (
    <div>
      {certify ? (
        <EditUser userPassword={userPassword} />
      ) : (
        <CertifyUser setCertify={setCertify} setPassword={setUserPassword} />
      )}
    </div>
  );
}

export default UserInfo;
