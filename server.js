const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const cookieParser = require("cookie-parser");
const { cloudinaryConfig } = require("./config/cloudinaryConfiguration");

const cors = require("cors");
const dotenv = require("dotenv");
const server = http.createServer(app);
const io = socketio(server);
//users for sockets
const { addUser, removeUser, getUser } = require("./users");

dotenv.config();

//connecting to db
const connectDB = require("./config/db");

//getting routes
const auth = require("./routes/auth");
const machine = require("./routes/machine");
const project = require("./routes/project");
const chats = require("./routes/chat");
const product = require("./routes/product");
const rawMaterial = require("./routes/rawMaterial");
const tasks = require("./routes/task");
const orders = require("./routes/order");
const teams = require("./routes/teams");
const salaries = require("./routes/salaries");

const PORT = process.env.PORT || 5000;
cloudinaryConfig();
connectDB();
app.use(cors());
app.use(express.json({ extended: true }));
//cookie parser
app.use(cookieParser());
//setting up morgan for logging requests
app.use(morgan("dev"));
//mounting routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/machines", machine);
app.use("/api/v1/products", product);
app.use("/api/v1/rawMaterials", rawMaterial);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/orders", orders);
app.use("/api/v1/teams", teams);
app.use("/api/v1/projects", project);
app.use("/api/v1/salaries", salaries);
app.use("/api/v1/chats", chats);

//socket.io code integration at server side
// io.on("connect", socket => {
//   socket.on("join", ({ name, profile }, callback) => {
//     console.log("joshi");
//     console.log(name, profile);
//     if (name == null || profile == null) {
//       return;
//     }

//     const { error, user } = addUser({ id: socket.id, name, profile });

//     if (error) return callback(error);

//     callback();
//   });

//   socket.on("sendMessage", chat => {
//     console.log("chat", chat);
//     const message = {
//       createdAt: Date.now(),
//       text: chat.message,
//       sender: chat.sender,
//       reciever: chat.reciever,
//     };

//     let reciver = getUser(chat.reciever);

//     if (reciver) {
//       const recieverSocket = reciver.id;
//       console.log("reciever socket", recieverSocket);
//       io.to(`${recieverSocket}`).emit("message", message);
//     }
//     io.to(`${socket.id}`).emit("message", message);
//   });

//   socket.on("disconnect", () => {
//     const user = removeUser(socket.id);
//   });
// });
//end socket.io at server side

server.listen(PORT, () => {
  console.log(`Your Server is runing on PORT:  ${PORT} `);
});
module.exports = app;
