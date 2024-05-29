import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

interface IReport extends Document {
  containerName: string;
  containerWidth: number;
  containerHeight: number;
  totalVolume: number;
  usedVolume: number;
  freeVolume: number;
  usedPercentage: number;
  loadedCoffees: {
    name: string;
    weight: number;
    volume: number;
    quantity: number;
    usedVolumePercentage: number;
  }[];
  unplacedCoffees: {
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
  totalVolume: { type: Number, required: true },
  usedVolume: { type: Number, required: true },
  freeVolume: { type: Number, required: true },
  usedPercentage: { type: Number, required: true },
  loadedCoffees: [{
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
    quantity: { type: Number, required: true },
    usedVolumePercentage: { type: Number, required: true }
  }],
  unplacedCoffees: [{
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }]
}, { timestamps: true });


const reportRouter = express.Router();

const Report = mongoose.model<IReport>('Report', reportSchema);

reportRouter.post('/saveReport', async (req: Request, res: Response) => {
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

export default reportRouter;
