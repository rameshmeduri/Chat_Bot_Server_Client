import React from 'react';

import Header from './Header';
import ChatRoom from './ChatRoom';

const Root = () => (
    <div>
        <Header />
        <main className="container-fluid">
            <br />
            <div className="row">
            <div className="col">
                    <h3>V2</h3>
                    <ChatRoom />
                </div>
                <div className="col">
                    <h3>Ticket</h3>
                </div>
            </div>
        </main>
        
    </div>
);

export default Root;