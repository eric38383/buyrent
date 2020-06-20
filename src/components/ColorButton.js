import React from 'react';

const ColorButton = ({ colors, handleClick }) => {

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleClick(e, colors)
        }
    }

    return (
      <button
        className='color-button'
        style={{
          background: `linear-gradient(to bottom right, ${colors[0]} 50%, ${colors[1]} 50%)`
        }}
        title={colors[2]}
        onKeyPress={handleKeyPress}
        onClick={() => handleClick(colors)}
      ></button>
    );
}

export default ColorButton;