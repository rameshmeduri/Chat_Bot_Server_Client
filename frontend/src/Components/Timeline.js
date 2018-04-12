import React from 'react';

const Item = ({ title, desc, completed }) => {

    let c = (completed)
        ? 'ant-timeline-item-head ant-timeline-item-head-green'
        : 'ant-timeline-item-head ant-timeline-item-head-red';

    console.log(c);
    
    return (
        <li className="ant-timeline-item">
            <div className="ant-timeline-item-tail"></div>
            <div className={c}></div>
            <div className="ant-timeline-item-content">{title} : {desc}</div>
        </li>
    );
};

const Timeline = ({ items }) => {
    return (
        <ul>
            {
                items.map((item, index) => {
                    return (
                        <Item key={index} title={item.title} desc={item.desc} completed={item.completed} />
                    );
                })
            }
        </ul>
    );
};

export default Timeline;