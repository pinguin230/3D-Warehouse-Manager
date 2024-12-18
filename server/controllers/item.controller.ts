import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

//Системи теорії прийняття рішень

const itemsRouter = express.Router();

interface IItems extends Document {
    name: string,
    weight: number;
    width: number;
    height: number;
    volume: number
    quantity: number,
    depth: number;
    userId: number;
}

const itemsSchema: Schema = new Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    volume: { type: Number, required: true },
    depth: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
})

const Items = mongoose.model<IItems>('Items', itemsSchema, 'itemsDocument');


itemsRouter.get('/item', (req: Request, res: Response) => {
    const userId = req.query.userId as string; // Отримує userId з рядка запиту
    // console.log(userId)
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    Items.find({ userId })
        .then(containers => res.json(containers))
        .catch(err => res.status(500).json({ error: err.message }));
});

itemsRouter.post('/item', async (req: Request, res: Response) => {
    try {
        // Check if an items with the same name already exists
        const existingItems = await Items.findOne({ name: req.body.name });
        if (existingItems) {
            return res.status(400).json({ message: 'Items with this name already exists' });
        }

        // If no items with the same name exists, proceed to create a new one
        const itemsData = new Items({
            userId: req.body.userId,
            name: req.body.name,
            weight: req.body.weight,
            width: req.body.width,
            height: req.body.height,
            depth: req.body.depth,
            volume: req.body.volume,
            quantity: req.body.quantity || 1
        });

        const savedItems = await itemsData.save();
        res.status(201).json(savedItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


itemsRouter.get('/item/:id', (req: Request, res: Response) => {
    Items.findById(req.params.id)
        .then(items => {
            if (!items) {
                return res.status(404).json({ message: 'Items not found' });
            }
            res.json(items);
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

itemsRouter.put('/item/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, weight, width, height, volume, quantity, depth} = req.body;

        // Find an existing item by ID
        const existingItem = await Items.findOne({_id: id});

        console.log(existingItem);

        if (existingItem) {
            // Check if all properties (except 'quantity') are the same
            const isSameProperties = (
                existingItem.name === name &&
                existingItem.weight === weight &&
                existingItem.width === width &&
                existingItem.height === height &&
                existingItem.depth === depth &&
                existingItem.volume === volume
            );

            if (isSameProperties) {
                // If properties are the same, update only the 'quantity'
                existingItem.quantity += quantity;
                await existingItem.save();
                return res.status(200).json(existingItem);
            }
        }
        // If no item with the same ID exists or properties don't match, create a new item
        const newItem = new Items({
            _id: id,
            name,
            weight,
            width,
            height,
            depth,
            volume,
            quantity
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

itemsRouter.patch('/item/:id', async (req: Request, res: Response) => {
    try {
        const itemsId = req.params.id;
        const updatedItems = await Items.findByIdAndUpdate(itemsId, req.body, { new: true });

        if (!updatedItems) {
            return res.status(404).json({ message: 'Items not found' });
        }

        res.status(200).json(updatedItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

itemsRouter.delete('/item/:id', async (req: Request, res: Response) => {
    try {
        const itemsId = req.params.id;
        const result = await Items.deleteOne({ _id: itemsId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Items not found' });
        }

        res.status(200).json({ message: 'Items deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default itemsRouter ;
