const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

const webSocketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
const webSocketUrl2 = 'wss://stream.binance.com:9443/ws/btcbrl@trade';

const ws = new WebSocket(webSocketUrl);
const ws2 = new WebSocket(webSocketUrl2);

ws.on('open', function open() {
  console.log('Conectado ao Servidor WebSocket da Binance');
});

ws2.on('open', function open() {
  console.log('Conectado ao Servidor WebSocket da Binance');
});


ws.on('message', function incoming(data) {
  const msg = JSON.parse(data);
  const price = msg.p;

  io.emit('priceBTC', {
    symbol: 'BTC/USDT',
    price: price
  });
});

ws2.on('message', function incoming(data) {
  const msg = JSON.parse(data);
  const price = msg.p;

  io.emit('priceBTC2', {
    symbol: 'BTC/BRL',
    price: price
  });
});

app.use(express.static(__dirname, {
  extensions: ["html", "png"],
}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
