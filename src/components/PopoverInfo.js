import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import Info from '../svg/Info';
import { Property } from '../utilities';

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
            <div className="row v-center"
                onMouseEnter={() => setPopState(true)} 
                onMouseLeave={() => setPopState(false)} 
            >
                <Info 
                    size={15} 
                />
            </div>
            </Popover>
        </>
    )
}

PopoverInfo.propTypes = {
    contentComponent: PropTypes.object.isRequired,
    title: PropTypes.any.isRequired
}

const PopoverContentWrapper = ({ children, title }) => {
    return (
        <div className="popover">
            <div className="popover-inner">
                <div className="popover-title">{title}</div>
                <div className="popover-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopoverInfo;