import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import axios from 'axios';

const itemRouter = express.Router();

interface IItem extends Document {
    name: string;
    weight: number;
    width: number;
    height: number;
    volume: number;
    userId: string;
    depth: number
}

const itemSchema: Schema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    depth: { type: Number, required: true },
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    volume: { type: Number, required: true }
});

const FavoriteItem = mongoose.model<IItem>('FavoriteItem', itemSchema, 'selectedItemDocument');

itemRouter.get('/favorite-item', async (req: Request, res: Response) => {
    const userId = req.query.userId as string; // Отримує userId з рядка запиту
    // console.log(userId)
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    FavoriteItem.find({ userId })
        .then(containers => res.json(containers))
        .catch(err => res.status(500).json({ error: err.message }));
});

itemRouter.post('/favorite-item', async (req: Request, res: Response) => {
    try {
        const { width, height, weight, volume, name, depth, _id, userId} = req.body;

        const existingFavoriteItem = await FavoriteItem.findOne({ width, height, weight, depth, volume, name, userId});

        if (existingFavoriteItem) {
            return res.status(400).json({ message: 'Container with the same properties already exists' });
        }

        const itemData = new FavoriteItem({
            _id: _id,
            name: name,
            weight: weight,
            width: width,
            height: height,
            volume: volume,
            depth: depth,
            userId: userId
        });

        const savedItem = await itemData.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

itemRouter.get('/favorite-item/:id', async (req: Request, res: Response) => {
    try {
        const item = await FavoriteItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

itemRouter.post('/favorite-item/add/:id', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`http://localhost:3001/item/${req.params.id}`);
        const item = response.data;
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const existingFavoriteItem = await FavoriteItem.findOne({ name: item.name });
        if (existingFavoriteItem) {
            return res.status(400).json({ message: 'Item with this name is already in the selected collection' });
        }

        const newFavoriteItem = new FavoriteItem({
            name: item.name,
            weight: item.weight,
            width: item.width,
            height: item.height,
            volume: item.volume,
            depth: item.depth
        });

        const savedItem = await newFavoriteItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

itemRouter.put('/favorite-item/:id', async (req: Request, res: Response) => {
    try {
        const updatedItem = await FavoriteItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

itemRouter.delete('/favorite-item/:id', async (req: Request, res: Response) => {
    try {
        const result = await FavoriteItem.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default itemRouter;
