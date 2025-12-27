/**
 * DrawEase Server
 * Real-time collaborative whiteboard using Express and Socket.IO
 */

const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const cors = require("cors");
const config = require("./config");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Input validation helper
const validateDrawingData = (data) => {
  if (!data || typeof data !== "object") return false;
  if (typeof data.x !== "number" || typeof data.y !== "number") return false;
  if (data.color && typeof data.color !== "string") return false;
  if (data.width && typeof data.width !== "number") return false;
  return true;
};

// Initialize Socket.IO with CORS configuration
const corsOptions = config.isDevelopment
  ? { origin: "*", methods: ["GET", "POST"] }
  : { origin: process.env.ALLOWED_ORIGINS?.split(",") || [], methods: ["GET", "POST"] };

const io = socketIO(server, { cors: corsOptions });

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Drawing events
  socket.on("mousedown", (point) => {
    if (!validateDrawingData(point)) {
      console.warn(`Invalid drawing data from ${socket.id}`);
      return;
    }
    socket.broadcast.emit("onmousedown", point);
  });

  socket.on("mousemove", (point) => {
    if (!validateDrawingData(point)) {
      console.warn(`Invalid drawing data from ${socket.id}`);
      return;
    }
    socket.broadcast.emit("onmousemove", point);
  });

  socket.on("mouseup", (stroke) => {
    socket.broadcast.emit("onmouseup", stroke);
  });

  // Tool change events
  socket.on("toolchange", (tool) => {
    const validTools = ["pencil", "eraser", "sticky", "upload"];
    if (!validTools.includes(tool)) {
      console.warn(`Invalid tool from ${socket.id}: ${tool}`);
      return;
    }
    socket.broadcast.emit("ontoolchange", tool);
  });

  socket.on("size", (size) => {
    if (typeof size !== "number" || size < 1 || size > 100) {
      console.warn(`Invalid size value from ${socket.id}: ${size}`);
      return;
    }
    socket.broadcast.emit("onsize", size);
  });

  socket.on("color", (color) => {
    if (typeof color !== "string" || color.length > 9) {
      console.warn(`Invalid color value from ${socket.id}: ${color}`);
      return;
    }
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