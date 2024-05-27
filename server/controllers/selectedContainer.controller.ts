import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import axios from "axios";


const containerRouter = express.Router();

interface Container extends Document {
    name: string;
    height: number;
    width: number;
    volume: number;
}

const containerSchema: Schema = new Schema({
    name: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    volume: { type: Number, required: true },
})

const SelectedContainer = mongoose.model<Container>('SelectedContainer', containerSchema, 'selectedContainerDocument');


containerRouter.get('/selected-container', (_req: Request, res: Response) => {
    SelectedContainer.find()
        .then(container => {
            console.log(container); // Логування для дебагу
            res.json(container);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.get('/selected-container/:id', (req: Request, res: Response) => {
    SelectedContainer.findById(req.params.id)
        .then(container => {
            if (!container) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(container);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


containerRouter.post('/selected-container', (req: Request, res: Response) => {
    const containerData = new SelectedContainer({
        width: req.body.width,
        height: req.body.height,
        volume: req.body.volume,
        name: req.body.name
    });

    containerData.save()
        .then(savedContainer => res.status(201).json(savedContainer))
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.post('/selected-container/add/:id', async (req: Request, res: Response) => {
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
            volume: container.data.volume
        });

        const savedContainer = await newSelectedContainer.save();

        res.status(201).json(savedContainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


containerRouter.put('/selected-container/:id', (req: Request, res: Response) => {
    SelectedContainer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedContainer => {
            if (!updatedContainer) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(updatedContainer);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.delete('/selected-container/:id', async (req: Request, res: Response) => {
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
