FROM node:12
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --loglevel verbose
COPY . /usr/app
COPY websocket /usr/app/websocket
EXPOSE 3000 65080
CMD npm start
