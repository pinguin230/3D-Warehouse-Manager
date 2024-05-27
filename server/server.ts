import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import coffeeRouter from "./controllers/coffee.controller.ts";
import containerRouter from "./controllers/container.controller.ts";
import selectedCoffeeController from "./controllers/selectedCoffee.controller.ts";
import selectedContainerController from "./controllers/selectedContainer.controller.ts";

const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://tesliamain:dsQSnfZXc0Fxwo5q@coffeedb.tpjpeha.mongodb.net/CoffeeDB?retryWrites=true&ssl=true&w=majority&appName=CoffeeDB",)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/', coffeeRouter)
app.use('/', containerRouter)
app.use('/', selectedCoffeeController)
app.use('/', selectedContainerController)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
