import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';


const coffeeRouter = express.Router();

interface ICoffee extends Document {
    name: string,
    weight: number;
    width: number;
    height: number;
    grindSize?: string;
    beanSize?: string;
    capsuleMaterial?: string;
    solubility?: string;
    type: string,
    volume: number
    quantity: number
}

const coffeeSchema: Schema = new Schema({
    name: {type: String, required: true},
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    grindSize: { type: String, required: false },
    beanSize: { type: String, required: false },
    capsuleMaterial: { type: String, required: false },
    solubility: { type: String, required: false },
    type: { type: String, required: true },
    volume: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
})

const Coffee = mongoose.model<ICoffee>('Coffee', coffeeSchema, 'coffeeDocument');


coffeeRouter.get('/coffee', (_req: Request, res: Response) => {
    Coffee.find()
        .then(coffees => {
            console.log(coffees); // Логування для дебагу
            res.json(coffees);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

coffeeRouter.post('/coffee', async (req: Request, res: Response) => {
    try {
        // Check if a coffee with the same name already exists
        const existingCoffee = await Coffee.findOne({ name: req.body.name });
        if (existingCoffee) {
            return res.status(400).json({ message: 'Coffee with this name already exists' });
        }

        // If no coffee with the same name exists, proceed to create a new one
        const coffeeData = new Coffee({
            name: req.body.name,
            weight: req.body.weight,
            width: req.body.width,
            height: req.body.height,
            grindSize: req.body.grindSize,
            beanSize: req.body.beanSize,
            capsuleMaterial: req.body.capsuleMaterial,
            solubility: req.body.solubility,
            type: req.body.type,
            volume: req.body.volume,
            quantity: req.body.quantity || 1
        });

        const savedCoffee = await coffeeData.save();
        res.status(201).json(savedCoffee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


coffeeRouter.get('/coffee/:id', (req: Request, res: Response) => {
    Coffee.findById(req.params.id)
        .then(coffee => {
            if (!coffee) {
                return res.status(404).json({ message: 'Coffee not found' });
            }
            res.json(coffee);
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

coffeeRouter.put('/coffee/:id', (req: Request, res: Response) => {
    const coffee = Coffee.find(c => c.id === parseInt(req.params.id));
    if (!coffee) {
        return res.status(404).send('Coffee not found');
    }

    res.json(coffee);
});

coffeeRouter.patch('/coffee/:id', async (req: Request, res: Response) => {
    try {
        const coffeeId = req.params.id;
        const updatedCoffee = await Coffee.findByIdAndUpdate(coffeeId, req.body, { new: true });

        if (!updatedCoffee) {
            return res.status(404).json({ message: 'Coffee not found' });
        }

        res.status(200).json(updatedCoffee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

coffeeRouter.delete('/coffee/:id', async (req: Request, res: Response) => {
    try {
        const coffeeId = req.params.id;
        const result = await Coffee.deleteOne({ _id: coffeeId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Coffee not found' });
        }

        res.status(200).json({ message: 'Coffee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default coffeeRouter ;
