import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";
//singleton
class Server {
  constructor() {
    this.serverInstance = null;
  }

  static getInstance() {
    if (!this.serverInstance) {
      this.serverInstance = new Server();
    }
    return this.serverInstance;
  }

  async start() {
    try {
      await createAdminUser();
      app.listen(app.get("port"));
      console.log("Server on port", app.get("port"));
      console.log("Environment:", process.env.NODE_ENV);
    } catch (error) {
      console.error("Failed to start server:", error);
    }
  }
}

const server = Server.getInstance();
server.start();
