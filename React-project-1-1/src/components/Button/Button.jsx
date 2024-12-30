import React from 'react';
import './button.less';

/*
Обрабатывать клик можно одним из вариантов указанных здесь

const Button = ({children, className, onClick}) => {
    return (
        <button onClick={onClick} className={className}>{children}</button>
    )
}
*/

const Button = ({children, className, ...props}) => {
    return (
        <button {...props} className={className}>{children}</button>
    )
}

export default Button;



