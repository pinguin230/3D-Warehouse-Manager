import express, {Request, Response} from 'express';
import mongoose, {Schema, Document} from 'mongoose';


const containerRouter = express.Router();

interface Container extends Document {
  name: string;
  height: number;
  width: number;
  volume: number;
  depth: number;
  userId: string
}

const containerSchema: Schema = new Schema({
  name: {type: String, required: true},
  userId: {type: String, required: true},
  height: {type: Number, required: true},
  width: {type: Number, required: true},
  volume: {type: Number, required: true},
  depth: {type: Number, required: true},
})

const Container = mongoose.model<Container>('Container', containerSchema, 'containerDocument');


containerRouter.get('/container', (req: Request, res: Response) => {
  const userId = req.query.userId as string; // Отримує userId з рядка запиту
  // console.log(userId)
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  Container.find({ userId })
      .then(containers => res.json(containers))
      .catch(err => res.status(500).json({ error: err.message }));
});

containerRouter.get('/container/:id', (req: Request, res: Response) => {
  Container.findById(req.params.id)
      .then(container => {
        if (!container) {
          return res.status(404).json({message: 'Container not found'});
        }
        res.json(container);
      })
      .catch(err => res.status(500).json({error: err.message}));
});


containerRouter.post('/container', (req: Request, res: Response) => {
  console.log('Отриманий body:', req.body); // Додайте це логування

  const containerData = new Container({
    userId: req.body.userId,
    width: req.body.width,
    height: req.body.height,
    volume: req.body.volume,
    name: req.body.name,
    depth: req.body.depth,
  });

  console.log(containerData)

  containerData.save()
      .then(savedContainer => res.status(201).json(savedContainer))
      .catch(err => res.status(500).json({error: err.message}));
});

containerRouter.put('/container/:id', (req: Request, res: Response) => {
  Container.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedContainer => {
        if (!updatedContainer) {
          return res.status(404).json({message: 'Container not found'});
        }
        res.json(updatedContainer);
      })
      .catch(err => res.status(500).json({error: err.message}));
});

containerRouter.patch('/container/:id', (req: Request, res: Response) => {
  Container.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedContainer => {
        if (!updatedContainer) {
          return res.status(404).json({message: 'Container not found'});
        }
        res.json(updatedContainer);
      })
      .catch(err => res.status(500).json({error: err.message}));
});

containerRouter.delete('/container/:id', async (req: Request, res: Response) => {
  try {
    const result = await Container.deleteOne({_id: req.params.id});

    if (result.deletedCount === 0) {
      return res.status(404).json({message: 'Container not found'});
    }

    res.status(200).json({message: 'Container deleted successfully'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

export default containerRouter;
