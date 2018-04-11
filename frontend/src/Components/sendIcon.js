import React from 'react';

const styles = {
    color: 'rgba(0, 0, 0, 0.87)',
    fill: 'rgb(117, 117, 117)',
    height: '24px',
    width: '24px',
    userSelect: 'none',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    margin: '12px'
};

const SendIcon = () => (
    <svg viewBox="0 0 24 24" style={styles}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
    </svg>
);


export default SendIcon;