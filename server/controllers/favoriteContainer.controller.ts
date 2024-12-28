import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import axios from "axios";


const containerRouter = express.Router();

interface Container extends Document {
    name: string;
    height: number;
    width: number;
    volume: number;
    depth: number;
    userId: string;
}

const containerSchema: Schema = new Schema({
    name: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    volume: { type: Number, required: true },
    depth: { type: Number, required: true },
    userId: { type: String, required: true },
})

const SelectedContainer = mongoose.model<Container>('SelectedContainer', containerSchema, 'selectedContainerDocument');


containerRouter.get('/favorite-container', (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    // console.log(userId)
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    SelectedContainer.find({ userId })
        .then(containers => res.json(containers))
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.get('/favorite-container/:id', (req: Request, res: Response) => {
    SelectedContainer.findById(req.params.id)
        .then(container => {
            if (!container) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(container);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


containerRouter.post('/favorite-container', async (req: Request, res: Response) => {
    try {

        console.log("req.body", req.body)
        const { width, height, volume, depth, name, userId} = req.body;
        const existingContainer = await SelectedContainer.findOne({ width, height, volume, name, userId });

        if (existingContainer) {
            return res.status(400).json({ message: 'Container with the same properties already exists' });
        }
        const newContainer = new SelectedContainer({
            width,
            height,
            volume,
            depth,
            name,
            userId
        });
        const savedContainer = await newContainer.save();
        res.status(201).json(savedContainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

containerRouter.post('/favorite-container/:id', async (req: Request, res: Response) => {
    try {
        // Fetch the container data from the original container collection
        const container = await axios.get(`http://localhost:3001/container/${req.params.id}`);

        if (!container.data) {
            return res.status(404).json({ message: 'Container not found' });
        }

        // Create a new selected container with the fetched data
        const newSelectedContainer = new SelectedContainer({
            name: container.data.name,
            height: container.data.height,
            width: container.data.width,
            volume: container.data.volume,
            depth: container.data.volume
        });

        const savedContainer = await newSelectedContainer.save();

        res.status(201).json(savedContainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


containerRouter.put('/favorite-container/:id', (req: Request, res: Response) => {
    SelectedContainer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedContainer => {
            if (!updatedContainer) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(updatedContainer);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.delete('/favorite-container/:id', async (req: Request, res: Response) => {
    try {
        const result = await SelectedContainer.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Container not found' });
        }

        res.status(200).json({ message: 'Container deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default containerRouter ;
