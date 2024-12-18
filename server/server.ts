import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRouter from "./controllers/item.controller.ts";
import containerRouter from "./controllers/container.controller.ts";
import selectedCoffeeController from "./controllers/favoriteItem.controller.ts";
import selectedContainerController from "./controllers/favoriteContainer.controller.ts";
import reportRouter from "./controllers/report.controller.ts";

const app = express();

app.use(cors({
  origin: '*', // Вкажіть ваш фронтенд-домен
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json())

mongoose.connect("mongodb+srv://tesliamain:dsQSnfZXc0Fxwo5q@coffeedb.tpjpeha.mongodb.net/CoffeeDB?retryWrites=true&ssl=true&w=majority&appName=ItemsStoreManagement",)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/', itemRouter)
app.use('/', containerRouter)
app.use('/', selectedCoffeeController)
app.use('/', selectedContainerController)
app.use('/', reportRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
