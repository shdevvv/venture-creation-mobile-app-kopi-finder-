import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const userRouter = Router();

// GET /api/user - Get active user profile, stamps, and bookmarks
userRouter.get('/', async (req: Request, res: Response) => {
  try {
    let user = await prisma.user.findFirst({
      include: {
        stamps: true,
        savedCafes: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        ...user,
        stamps: user.stamps.map((s) => s.cafeName),
        savedCafeIds: user.savedCafes.map((s) => s.cafeId),
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/user/bookmark - Toggle bookmark a cafe
userRouter.post('/bookmark', async (req: Request, res: Response) => {
  try {
    const { cafeId } = req.body;
    if (!cafeId) {
      return res.status(400).json({ success: false, error: 'cafeId is required' });
    }

    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const existing = await prisma.savedCafe.findUnique({
      where: {
        userId_cafeId: {
          userId: user.id,
          cafeId,
        },
      },
    });

    let isSaved: boolean;
    if (existing) {
      await prisma.savedCafe.delete({
        where: { id: existing.id },
      });
      isSaved = false;
    } else {
      await prisma.savedCafe.create({
        data: {
          userId: user.id,
          cafeId,
        },
      });
      isSaved = true;
    }

    res.json({
      success: true,
      isSaved,
      message: isSaved ? 'Cafe saved to bookmarks' : 'Cafe removed from bookmarks',
    });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/user - Update user profile
userRouter.put('/', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const { name, handle, avatar } = req.body;
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(handle && { handle }),
        ...(avatar && { avatar }),
      },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
