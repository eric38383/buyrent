import React from 'react';

const ColorButton = ({ colors, handleClick }) => {

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleClick(e, colors)
        }
    }

    return (
        <button style={{
            'height': '20px', 
            'width': '20px', 
            'box-shadow': '1px 1px 5px',
            'border': 'none',
            'cursor': 'pointer',
            'background': `linear-gradient(to bottom right, ${colors[0]} 50%, ${colors[1]} 50%)`
            }}
            onKeyPress={handleKeyPress}
            onClick={(e) => handleClick(e, colors)}
        >

        </button>
    )
}

export default ColorButton;