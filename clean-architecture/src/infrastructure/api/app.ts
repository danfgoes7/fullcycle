import express from "express";
import productRoute from "./routes/product.route";

export const app = express();

app.use(express.json());
app.use("/products", productRoute);
