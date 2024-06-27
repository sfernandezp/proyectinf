import express from "express";
import cors from "cors";
import routes from "../routes/index.route";
export class Server {
  private app: any;
  private port: string | number;
  private pre: string;
  private paths: any;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3800;
    this.pre = "/api";
    this.paths = {
      tests: this.pre + "/tests",
      //users: this.pre+ "/users"
      concept: this.pre + "/concept",
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  routes() {
    const { testRoute, concept } = routes;
    this.app.use(this.paths.tests, testRoute);
    this.app.use(this.paths.concept, concept);
  }
  async connectDB() {
    //conexion a la base de datos
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en localhost:${this.port}`);
    });
  }
}