const express = require('express');
const socket = require('socket.io');
const steps = require('./messages');

const app = express();
const port = 5000;

const server = app.listen(port, () => {
    console.log(`server is listening on Port ${port}`);
});

const io = socket(server);

io.on('connection', (client) => {
    console.log('client connected...', client.id);

    client.on('disconnect', () => {
        console.log('client disconnect...', client.id);
    })

    client.on('error', (err) => {
        console.log('received error from client:', client.id, err);
    })

    client.on('CLIENT_ACTION', (payload) => {
        console.log('CLIENT_ACTION', payload);        
        const action = payload.action;
        let obj;

        switch (action) {
            
            case 'START':
                obj = { author: 'BOT', nextAction: 'STEP_1', message: 'BUY or SELL' };
                break;

        }

        io.emit('SERVER_ACTION', obj);
    });
});

