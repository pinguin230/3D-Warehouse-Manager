import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

export interface IReport{
  _id?: string;
  containerName: string;
  containerWidth: number;
  containerHeight: number;
  containerDepth: number;
  totalVolume: number;
  usedVolume: number;
  freeVolume: number;
  usedPercentage: number;
  createdAt?: string;
  loadedItems: {
    name: string;
    weight: number;
    volume: number;
    depth: number;
    quantity: number;
    usedVolumePercentage: number;
  }[];
  unplacedItems: {
    name: string;
    weight: number;
    volume: number;
    quantity: number;
  }[];
}

const reportSchema: Schema = new Schema({
  containerName: { type: String, required: true },
  containerWidth: { type: Number, required: true },
  containerHeight: { type: Number, required: true },
  containerDepth: { type: Number, required: true },
  totalVolume: { type: Number, required: true },
  usedVolume: { type: Number, required: true },
  freeVolume: { type: Number, required: true },
  usedPercentage: { type: Number, required: true },
  loadedItems: [{
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
    depth: { type: Number, required: true },
    quantity: { type: Number, required: true },
    usedVolumePercentage: { type: Number, required: true }
  }],
  unplacedItems: [{
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }]
}, { timestamps: true });


const reportRouter = express.Router();

const Report = mongoose.model<IReport>('Report', reportSchema);

reportRouter.post('/reports', async (req: Request, res: Response) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

reportRouter.get('/reports', async (_req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

reportRouter.get('/reports/:id', async (_req: Request, res: Response) => {
  Report.findById(_req.params.id)
      .then(items => {
        if (!items) {
          return res.status(404).json({ message: 'Items not found' });
        }
        res.json(items);
      })
      .catch(err => res.status(500).json({ error: err.message }));
});

reportRouter.delete('/reports/:id', async (_req: Request, res: Response) => {
  try {
    const result = await Report.deleteOne({ _id: _req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default reportRouter;
