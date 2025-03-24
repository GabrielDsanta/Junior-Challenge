import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { Ring } from '../models/ring';

const RING_LIMITS: { [key: string]: number } = {
  elf: 3,
  dwarf: 7,
  man: 9,
  sauron: 1,
};

export interface AuthenticatedRequest extends Request {
  user_id?: string;
}

const validateRingCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('power').notEmpty().withMessage('Power is required'),
  body('carrier').notEmpty().withMessage('Carrier is required'),
  body('forger').notEmpty().withMessage('Forger is required'),
  body('imageUri').optional().isURL().withMessage('Image URI must be a valid URL'),
];

async function getAllRings(req: AuthenticatedRequest, res: Response) {
  const userId = req.user_id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const rings = await Ring.findAll({
      where: {
        bearerId: userId,
      },
    });

    return res.status(200).json(rings);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: message });
  }
}

async function createRing(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user_id;
    const { name, power, imageUri, bearer, forger } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const breed = user.breed;
    const ringCount = await Ring.count({ where: { bearerId: userId } });

    if (ringCount >= RING_LIMITS[breed]) {
      return res.status(400).json({ error: `Limite de anéis atingido para ${breed}` });
    }

    const newRing = await Ring.create({
      name,
      power,
      imageUri,
      bearer,
      forger,
      bearerId: user.id,
    });

    return res.status(201).json(newRing);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: message });
  }
}

async function deleteRing(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user_id!;
    const { ringId } = req.params;

    if (!ringId) {
      return res.status(400).json({ error: 'Ring ID is required' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const ring = await Ring.findByPk(ringId);

    if (!ring) {
      return res.status(400).json({ error: 'Ring not found' });
    }

    await ring.destroy();
    return res.status(200).json({ message: 'Ring deleted successfully' });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: message });
  }
}

async function editRing(req: AuthenticatedRequest, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user_id!;
    const { ringId } = req.params;
    const { name, power, imageUri, bearer, forger } = req.body;

    const ring = await Ring.findByPk(ringId);

    if (!ring) {
      return res.status(400).json({ error: 'Ring not found' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const updatedRing = await ring.update({
      name,
      power,
      imageUri,
      bearer,
      forger,
    });

    return res.status(200).json(updatedRing);
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: message });
  }
}

export { getAllRings, createRing, deleteRing, editRing, validateRingCreation };
