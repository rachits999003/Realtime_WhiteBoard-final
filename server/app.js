/**
 * DrawEase Server
 * Real-time collaborative whiteboard using Express and Socket.IO
 */

const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const config = require("./config");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Drawing events
  socket.on("mousedown", (point) => {
    socket.broadcast.emit("onmousedown", point);
  });

  socket.on("mousemove", (point) => {
    socket.broadcast.emit("onmousemove", point);
  });

  socket.on("mouseup", (stroke) => {
    socket.broadcast.emit("onmouseup", stroke);
  });

  // Tool change events
  socket.on("toolchange", (tool) => {
    socket.broadcast.emit("ontoolchange", tool);
  });

  socket.on("size", (size) => {
    socket.broadcast.emit("onsize", size);
  });

  socket.on("color", (color) => {
    socket.broadcast.emit("oncolor", color);
  });

  // UI events
  socket.on("hamburger", () => {
    socket.broadcast.emit("onhamburger");
  });

  // Undo/Redo events
  socket.on("undo", () => {
    socket.broadcast.emit("onundo");
  });

  socket.on("redo", () => {
    socket.broadcast.emit("onredo");
  });

  // Clear canvas event
  socket.on("clear", () => {
    socket.broadcast.emit("onclear");
  });

  // Sticky notes events
  socket.on("addsticky", (data) => {
    socket.broadcast.emit("onaddsticky", data);
  });

  socket.on("removesticky", (id) => {
    socket.broadcast.emit("onremovesticky", id);
  });

  socket.on("updatesticky", (data) => {
    socket.broadcast.emit("onupdatesticky", data);
  });

  // Image upload events
  socket.on("uploadimage", (data) => {
    socket.broadcast.emit("onuploadimage", data);
  });

  // Disconnect handler
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // Error handling
  socket.on("error", (error) => {
    console.error(`Socket error from ${socket.id}:`, error);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
server.listen(config.port, () => {
  console.log(`🎨 DrawEase Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  if (config.isDevelopment) {
    console.log(`Socket.IO URL: ${config.socketUrl}`);
  }
});

module.exports = server;