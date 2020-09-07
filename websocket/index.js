/**
 * DECLARAÇÃO DA COMUNICAÇÃO EM SOCKETS
 */
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');

const app_express = express();
const mqtt = require('mqtt');

const options = {
  key: fs.readFileSync('/usr/app/cert.key'),
  cert: fs.readFileSync('/usr/app/cert.crt'),
  ca: fs.readFileSync('/usr/app/cert.crt'),
};
const app = https.createServer(options, app_express);
const io = require('socket.io').listen(app);

app.listen(65080, () => {
  console.log('SERVIDOR INICIADO PORTA 65080');
});

/**
 * DECLARAÇÃO DO MQTT
 */

// CREDENCIAIS MQTT
const options_mqtt = {
  port: 9883,
  host: 'frstore.tk',
  clientId: 'servidor_websocket',
  username: process.env.ROOT_EMAIL,
  password: process.env.ROOT_PASS,
  keepalive: 60,
  reconnectPeriod: 5000,
  clean: true,
  encoding: 'utf8',
};

const client = mqtt.connect('mqtt://frstore.tk', options_mqtt);

// CONECTA AO MQTT
client.on('connect', () => {
  console.log('MQTT :: conectado');
  client.subscribe('/poste/#', (err) => {
    if (!err) {
      console.log('MQTT :: Se inscreveu nos tópicos');
    }
  });
});
client.on('error', (err) => {
  console.log(`MQTT :: ${err}`);
});

let visits = 0;
io.on('connection', (socket) => {
  console.log('Socket :: cliente conectado');
  visits += visits;

  io.emit('visits', visits);
  socket.on('dados', (data) => {
    console.log(`Socket :: cliente possui ${data}`);
    socket.join(data);
  });
  socket.on('disconnect', () => {
    visits -= visits;
    console.log('Socket :: cliente desconectado');
  });

  // QUANDO RECEBE UMA MSG
  client.on('message', (topic, message) => {
    console.log(`MQTT :: recebeu ${message.toString()} em ${topic}`);
    const topico = topic.split('/')[2];
    const allowDataType = [
      'alerta',
      'temperatura',
      'movimentacao',
      'umidade',
      'tensao',
      'luminosidade',
    ];
    if (allowDataType.includes(topico)) {
      const separa = message.toString().split(','); // RECEBE ID_POSTE,TEMPERATURA
      const id_poste = separa[0]; // ID_POSTE
      const temperatura = separa[1]; // TEMPERATURA
      socket
        .to(id_poste)
        .emit('/poste', `${topico}/${id_poste}/${temperatura}`);
    }
  });
});
