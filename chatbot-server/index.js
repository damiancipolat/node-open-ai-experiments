require('dotenv').config();

const http = require('http');
const express = require('express');
const routes = require('./router');

const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/v1', routes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
