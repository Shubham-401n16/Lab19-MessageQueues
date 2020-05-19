'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Homepage');
});

app.post('/delivery/:vendor/:orderId', (req, res, next) => {
    const payload = {
      vendor: req.params.vendor,
      orderId: req.params.orderId,
    };
    console.log('delivery', payload);
    if (!(payload.vendor === 'flower' || payload.vendor === 'candy')) {
        res.status(400);
        res.send('Incorrect order type');
    } else {
      socket.emit('delivered', payload);
      res.status(200);
      res.send('Sent order to queue');
    }
  });
  
  app.listen(3000, () => {
    console.log('API Server up and running on 3000');
  });