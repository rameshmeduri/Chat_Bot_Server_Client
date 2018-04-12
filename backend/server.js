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
    const author = 'BOT';

    client.on('disconnect', () => {
        console.log('client disconnect...', client.id);
    });

    client.on('error', (err) => {
        console.log('received error from client:', client.id, err);
    });

    client.on('CLIENT_ACTION', (payload) => {
        console.log('CLIENT_ACTION', payload);
        const action = payload.action;
        let obj;

        switch (action) {

            case 'START':
                obj = { author, nextAction: 'STEP_1', message: 'BUY or SELL' };
                break;

            case 'STEP_1':
                obj = { author, nextAction: 'STEP_2', message: 'ISIN' };
                break;

            case 'STEP_2':
                obj = { author, nextAction: 'STEP_3', message: 'Quantity' };
                break;

            case 'STEP_3':
                obj = { author, nextAction: 'STEP_4', message: 'Price' };
                break;

            case 'STEP_4':
                obj = { author, nextAction: 'END', message: 'Your Ticket has been Created' };
                break;

            default:
                obj = { author, nextAction: 'NONE', message: 'Command Not Recognised' };
                break;

        }

        io.emit('SERVER_ACTION', obj);
    });
});

