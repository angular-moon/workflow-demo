import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cold } from 'react-hot-loader';

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        you3 clicked 222
        {count}
        {' '}
times
      </p>
      <button
        type="button"
        onClick={() => {
          console.log(111);
          setCount(count + 1);
        }}
      >
        Click Me
      </button>
    </div>
  );
};
