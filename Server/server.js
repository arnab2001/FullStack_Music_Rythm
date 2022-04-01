import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import { not_found, error_handler } from "./Middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const port = 5000 || process.env.PORT;

app.use(not_found);
app.use(error_handler);

const server = app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

import * as io from "socket.io";

const socketio = new io.Server(server, {
  
  cors: {
    origin: "http://localhost:3000",
  },
});

socketio.on("connection", (socket) => {
  socket.on("setup", (user) => {
    const ID = user.sub.split("|")[1];
    socket.join(ID);
    const userData = { name: user.name, id: socket.id };

    console.log(`user ${user.name} joined in ${ID} ansd ${socket.id} `);
    socket.emit("connected");
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});
