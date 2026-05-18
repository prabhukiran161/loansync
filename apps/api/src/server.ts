import { ENV } from "./config/env";
import { app } from "./app";
import { logger } from "./config/logger";
import { Socket } from "net";
import { db } from "@loansync/db";

const PORT = ENV.PORT || 4000;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${ENV.NODE_ENV} mode`);
});

const connections = new Set<Socket>();

server.on("connection", (connection) => {
  connections.add(connection);
  connection.on("close", () => {
    connections.delete(connection);
  });
});

const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  server.close(() => {
    logger.info("HTTP server closed.");
  });

  setTimeout(() => {
    logger.warn(
      "Could not close connections in time, forcefully shutting down",
    );
    for (const connection of connections) {
      connection.destroy();
    }
    process.exit(1);
  }, 5000);

  try {
    await db.$disconnect();
    logger.info("Database connection closed.");
    process.exit(0);
  } catch (error) {
    logger.error("Error during database disconnection", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
