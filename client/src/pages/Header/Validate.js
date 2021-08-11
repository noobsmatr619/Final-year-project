import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
const Validate = () => {
  const history = useHistory();
  return (
    <div>
      {localStorage.getItem('user_type') === undefined ||
      localStorage.getItem('user_type') === '' ||
      localStorage.getItem('user_type') === null
        ? history.push('/auth')
        : ''}
    </div>
  );
};

export default Validate;
