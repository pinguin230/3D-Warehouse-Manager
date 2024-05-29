import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';


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

const Container = mongoose.model<Container>('Container', containerSchema, 'containerDocument');


containerRouter.get('/container', (_req: Request, res: Response) => {
    Container.find()
        .then(container => {
            console.log(container); // Логування для дебагу
            res.json(container);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.get('/container/:id', (req: Request, res: Response) => {
    Container.findById(req.params.id)
        .then(container => {
            if (!container) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(container);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


containerRouter.post('/container', (req: Request, res: Response) => {
    const containerData = new Container({
        width: req.body.width,
        height: req.body.height,
        volume: req.body.volume,
        name: req.body.name
    });

    containerData.save()
        .then(savedContainer => res.status(201).json(savedContainer))
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.put('/container/:id', (req: Request, res: Response) => {
    Container.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedContainer => {
            if (!updatedContainer) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(updatedContainer);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.patch('/container/:id', (req: Request, res: Response) => {
    Container.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedContainer => {
            if (!updatedContainer) {
                return res.status(404).json({ message: 'Container not found' });
            }
            res.json(updatedContainer);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.delete('/container/:id', async (req: Request, res: Response) => {
    try {
        const result = await Container.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Container not found' });
        }

        res.status(200).json({ message: 'Container deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default containerRouter ;
