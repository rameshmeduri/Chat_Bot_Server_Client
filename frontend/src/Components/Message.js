import React from 'react';

const Message = ({ author, message }) => {    
    return (
        <li className={`chat ${author === 'USER' ? 'right' : 'left'}`}>
            {message}
        </li>
    );
};

export default Message;