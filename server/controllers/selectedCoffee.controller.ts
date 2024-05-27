import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import axios from 'axios';

const coffeeRouter = express.Router();

interface ICoffee extends Document {
    name: string;
    weight: number;
    width: number;
    height: number;
    grindSize?: string;
    beanSize?: string;
    capsuleMaterial?: string;
    solubility?: string;
    type: string;
    volume: number;
}

const coffeeSchema: Schema = new Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    grindSize: { type: String, required: false },
    beanSize: { type: String, required: false },
    capsuleMaterial: { type: String, required: false },
    solubility: { type: String, required: false },
    type: { type: String, required: true },
    volume: { type: Number, required: true }
});

const SelectedCoffee = mongoose.model<ICoffee>('SelectedCoffee', coffeeSchema, 'selectedCoffeeDocument');

coffeeRouter.get('/selected-coffee', async (_req: Request, res: Response) => {
    try {
        const coffees = await SelectedCoffee.find();
        res.json(coffees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

coffeeRouter.post('/selected-coffee', async (req: Request, res: Response) => {
    try {
        const coffeeData = new SelectedCoffee({
            name: req.body.name,
            weight: req.body.weight,
            width: req.body.width,
            height: req.body.height,
            grindSize: req.body.grindSize,
            beanSize: req.body.beanSize,
            capsuleMaterial: req.body.capsuleMaterial,
            solubility: req.body.solubility,
            type: req.body.type,
            volume: req.body.volume
        });

        const savedCoffee = await coffeeData.save();
        res.status(201).json(savedCoffee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

coffeeRouter.get('/selected-coffee/:id', async (req: Request, res: Response) => {
    try {
        const coffee = await SelectedCoffee.findById(req.params.id);
        if (!coffee) {
            return res.status(404).json({ message: 'Coffee not found' });
        }
        res.json(coffee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

coffeeRouter.post('/selected-coffee/add/:id', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`http://localhost:3001/coffee/${req.params.id}`);
        const coffee = response.data;
        if (!coffee) {
            return res.status(404).json({ message: 'Coffee not found' });
        }

        const existingSelectedCoffee = await SelectedCoffee.findOne({ name: coffee.name });
        if (existingSelectedCoffee) {
            return res.status(400).json({ message: 'Coffee with this name is already in the selected collection' });
        }

        const newSelectedCoffee = new SelectedCoffee({
            name: coffee.name,
            weight: coffee.weight,
            width: coffee.width,
            height: coffee.height,
            grindSize: coffee.grindSize,
            beanSize: coffee.beanSize,
            capsuleMaterial: coffee.capsuleMaterial,
            solubility: coffee.solubility,
            type: coffee.type,
            volume: coffee.volume
        });

        const savedCoffee = await newSelectedCoffee.save();
        res.status(201).json(savedCoffee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

coffeeRouter.put('/selected-coffee/:id', async (req: Request, res: Response) => {
    try {
        const updatedCoffee = await SelectedCoffee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCoffee) {
            return res.status(404).json({ message: 'Coffee not found' });
        }
        res.json(updatedCoffee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

coffeeRouter.delete('/selected-coffee/:id', async (req: Request, res: Response) => {
    try {
        const result = await SelectedCoffee.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Coffee not found' });
        }

        res.status(200).json({ message: 'Coffee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default coffeeRouter;
