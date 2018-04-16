import React from 'react';

const Item = ({ title, desc, completed }) => {

    let c = (completed)
        ? 'ant-timeline-item-head ant-timeline-item-head-green'
        : 'ant-timeline-item-head ant-timeline-item-head-red';

    return (
        <li className="ant-timeline-item">
            <div className="ant-timeline-item-tail"></div>
            <div className={c}></div>
            <div className="ant-timeline-item-content">{title} : {desc}</div>
        </li>
    );
};

const Timeline = ({ events, show }) => {
    if (show) {
        return (
            <div>
                <h3>Ticket</h3>
                <br />
                <ul>
                    {
                        events.map((event, index) => {
                            return (
                                <Item key={index} title={event.title} desc={event.desc} completed={event.completed} />
                            );
                        })
                    }
                </ul>
                <br />
            </div>
        );
    } else {
        return null;
    }
};

export default Timeline;