require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  socketUrl: process.env.SOCKET_URL || "http://localhost:3000",
  isDevelopment: (process.env.NODE_ENV || "development") === "development",
  isProduction: (process.env.NODE_ENV || "development") === "production"
};