/**
 * DECLARAÇÃO DA COMUNICAÇÃO EM SOCKETS
 */
require("dotenv").config();
const https = require("https");
const fs = require("fs");
const express = require("express");
const moment = require("moment-timezone");
const StorageController = require("../api/src/app/controllers/StorageController");
const app_express = express();
const mqtt = require("mqtt");

const options = {
  key: fs.readFileSync("/usr/app/conf/ssl.api.frstore.tk.key"),
  cert: fs.readFileSync("/usr/app/conf/ssl.api.frstore.tk.crt"),
  ca: fs.readFileSync("/usr/app/conf/ssl.api.frstore.tk.crt"),
};

const app = https.createServer(options, app_express);
const io = require("socket.io").listen(app);

app.listen(65080, () => {
  console.log("SERVIDOR INICIADO PORTA 65080");
});

/**
 * DECLARAÇÃO DO MQTT
 */

// CREDENCIAIS MQTT
const options_mqtt = {
  port: 9883,
  host: "frstore.tk",
  clientId: "servidor_websocket",
  username: process.env.ROOT_EMAIL,
  password: process.env.ROOT_PASS,
  keepalive: 60,
  reconnectPeriod: 5000,
  clean: true,
  encoding: "utf8",
};

const client = mqtt.connect("mqtt://frstore.tk", options_mqtt);

// CONECTA AO MQTT
client.on("connect", () => {
  console.log("MQTT :: conectado");
  client.subscribe("/poste/#", (err) => {
    if (!err) {
      console.log("MQTT :: Se inscreveu nos tópicos");
    }
  });
});
client.on("error", (err) => {
  console.log(`MQTT :: ${err}`);
});

let visits = 0;
io.on("connection", (socket) => {
  console.log("Socket :: cliente conectado");
  visits += 1;

  io.emit("visits", visits);
  socket.on("dados", (data) => {
    console.log(`Socket :: cliente possui ${data}`);
    socket.join(data);
    socket.emit("ok", "");
  });

  socket.on("alerta", (data) => {
    console.log(`Socket :: cliente enviou alerta ${data}`);
    const { id, valor } = data;
    client.publish("/poste/alerta", `${id},${valor}`);

    // if (parseFloat(valor) === 1) {
    //   StorageController.store({ id, valor, tipo: "alerta" });
    // }
    // socket.to(id).emit("/poste", `alerta/${id}/${valor}`);
  });

  socket.on("disconnect", () => {
    visits -= visits;
    console.log("Socket :: cliente desconectado");
  });
});

// QUANDO RECEBE UMA MSG
let lastMessage = {
  hour: null,
  topic: null,
};
client.on("message", async (topic, message) => {
  const NOW = moment().format("HH:mm:ss YYYY/MM/DD");
  console.log(
    `MQTT :: recebeu ${message.toString()} em ${topic} - Agora: ${NOW} - Last: ${JSON.stringify(
      lastMessage
    )}`
  );
  if (lastMessage.hour === NOW && topic === lastMessage.topic) {
    console.log("Mesagem igual");
    lastMessage = {
      hour: NOW,
      topic,
    };
  } else {
    lastMessage = {
      hour: NOW,
      topic,
    };
    try {
      const topico = topic.split("/")[2];
      const allowDataType = [
        "alerta",
        "temperatura",
        "movimentacao",
        "umidade",
        "tensao",
        "luminosidade",
        "rele",
      ];
      if (allowDataType.includes(topico)) {
        const separa = message.toString().split(","); // RECEBE ID_POSTE,VALOR
        const id_poste = separa[0]; // ID_POSTE
        const valor = separa[1]; // VALOR
        io.to(id_poste).emit("/poste", `${topico}/${id_poste}/${valor}`);

        //SALVA SEM AGUARDAR CONCLUIR
        await StorageController.store({
          tipo: topico,
          valor: parseFloat(valor),
          id: parseFloat(id_poste),
        });

        console.log(`Dado ${topico} inserido :: poste ${id_poste} :: ${valor}`);
      }
    } catch (err) {
      console.log(`Erro :: ${err.message}`);
    }
  }
});
