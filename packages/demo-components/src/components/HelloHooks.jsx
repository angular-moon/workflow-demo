import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div>
        <p>
          you clicked 111
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
    </>
  );
};
