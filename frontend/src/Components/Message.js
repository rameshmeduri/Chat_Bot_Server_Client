import React from 'react';

const Message = ({message, author, align}) => (
    <li className={align}>   
        <img src="Bot.svg" />
        <p>{message}</p>
    </li>
);

export default Message;