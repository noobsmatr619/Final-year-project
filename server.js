const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const { cloudinaryConfig } = require('./config/cloudinaryConfiguration');
const Machines = require('./Models/Machine');
const cors = require('cors');
const dotenv = require('dotenv');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});
//users for sockets
const { addUser, removeUser, getUser } = require('./users');

if (process.env.NODE_ENV !== 'PRODUCTION') dotenv.config();

//connecting to db
const connectDB = require('./config/db');

//getting routes
const auth = require('./routes/auth');
const machine = require('./routes/machine');
const health = require('./routes/health');
const project = require('./routes/project');
const chats = require('./routes/chat');
const product = require('./routes/product');
const rawMaterial = require('./routes/rawMaterial');
const tasks = require('./routes/task');
const orders = require('./routes/order');
const teams = require('./routes/teams');
const salaries = require('./routes/salaries');

const PORT = process.env.PORT || 5000;
cloudinaryConfig();
connectDB();
app.use(express.json());
app.use(cors());
//cookie parser
app.use(cookieParser());
//setting up morgan for logging requests
app.use(morgan('dev'));
//mounting routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/machines', machine);
app.use('/api/v1/health', health);
app.use('/api/v1/products', product);
app.use('/api/v1/rawMaterials', rawMaterial);
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/orders', orders);
app.use('/api/v1/teams', teams);
app.use('/api/v1/projects', project);
app.use('/api/v1/salaries', salaries);
app.use('/api/v1/chats', chats);

// socket.io code integration at server side
let interval;
const getApiAndEmit = async (socket) => {
  const machines = await Machines.find();
  // console.log(machines);
  // Emitting a new message. Will be consumed by the client
  socket.emit('machines', machines);
};

io.on('connection', (socket) => {
  console.log('connection made successfully');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

io.on('connection', (socket) => {

  socket.on('sendMessage', (chat) => {
    const message = {
      createdAt: Date.now(),
      text: chat.message,
      sender: chat.sender,
      reciever: chat.reciever
    };
    io.emit('send_back_message', message);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  });
});
//end socket.io at server side

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, './client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Your Server is runing on PORT:  ${PORT} `);
});
module.exports = app;
