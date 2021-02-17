import express from "express";
import morgan from "morgan";
import helmet from "helmet";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())


app.use(morgan("combined"));
