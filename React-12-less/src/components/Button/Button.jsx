import React from 'react';
import './button.less';

const Button = ({children, color}) => {
    return (
        <button className={color}>{children}</button>
    );
};

export default Button;



