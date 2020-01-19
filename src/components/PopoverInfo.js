import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import Info from '../svg/Info';

const PopoverInfo = ({ contentComponent, title }) => {
    const [popOpen, setPopState] = useState(false);
    return (
        <>
            <Popover 
                disableReposition 
                isOpen={popOpen} 
                position={'top'} 
                content={(
                    <PopoverContentWrapper title={title} >
                        {contentComponent}
                    </PopoverContentWrapper>
                )}
            >
                <span 
                    onMouseEnter={() => setPopState(true)} 
                    onMouseLeave={() => setPopState(false)}  
                >
                    <Info size={15} />
                </span>
            </Popover>
        
        </>
    )
}

const PopoverContentWrapper = ({ children, title }) => {
    return (
        <div className='popover'>
            <div className='popover-inner'>
                <div className='popover-title'>{title}</div>
                <div className='popover-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopoverInfo;