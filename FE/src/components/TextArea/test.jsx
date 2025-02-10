import React from 'react';
import PropTypes from 'prop-types';


export function Test(props) {
  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>{props.message}</h2>
    </div>
  );
}

Test.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func
};

Test.defaultProps = {
  message: 'Helloaaaaa',
  onClick: function(){ alert("Hello"); }
};
