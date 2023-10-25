import React from 'react';

function Spacing({ size }) {
  const style = {
    margin: `${size}px`,
  };

  return <div style={style} />;
}

export default Spacing;
