import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const stampsRouter = Router();

// GET /api/stamps - List all collected passport stamps
stampsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const stamps = await prisma.stamp.findMany({
      where: { userId: user.id },
      include: {
        cafe: true,
      },
      orderBy: { validatedAt: 'desc' },
    });

    res.json({ success: true, count: stamps.length, data: stamps });
  } catch (error) {
    console.error('Error fetching stamps:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/stamps - Claim a new roastery passport stamp
stampsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { cafeId, cafeName } = req.body;

    if (!cafeId && !cafeName) {
      return res.status(400).json({
        success: false,
        error: 'Either cafeId or cafeName must be provided',
      });
    }

    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Find the cafe by id or name
    let cafe = null;
    if (cafeId) {
      cafe = await prisma.cafe.findUnique({ where: { id: cafeId } });
    }
    if (!cafe && cafeName) {
      cafe = await prisma.cafe.findFirst({
        where: { name: { contains: cafeName } },
      });
    }

    if (!cafe) {
      // Fallback to first cafe if not found
      cafe = await prisma.cafe.findFirst();
    }

    if (!cafe) {
      return res.status(404).json({ success: false, error: 'No cafe available' });
    }

    // Check if user already collected stamp for this cafe
    const existing = await prisma.stamp.findFirst({
      where: {
        userId: user.id,
        cafeId: cafe.id,
      },
    });

    if (existing) {
      return res.json({
        success: true,
        alreadyCollected: true,
        message: `Stempel untuk ${cafe.name} sudah pernah diklaim sebelumnya!`,
        data: existing,
      });
    }

    // Create new stamp
    const newStamp = await prisma.stamp.create({
      data: {
        userId: user.id,
        cafeId: cafe.id,
        cafeName: cafe.name,
      },
    });

    // Increment user stats: +1 roasterStamp, +1 cafeVisited, +150 perk points
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        roasterStamps: { increment: 1 },
        cafesVisited: { increment: 1 },
        perkPoints: { increment: 150 },
      },
    });

    res.status(201).json({
      success: true,
      message: `Selamat! Stempel ${cafe.name} berhasil ditambahkan (+150 Poin Perk)`,
      data: newStamp,
      userStats: {
        totalStamps: updatedUser.roasterStamps,
        perkPoints: updatedUser.perkPoints,
        cafesVisited: updatedUser.cafesVisited,
      },
    });
  } catch (error) {
    console.error('Error creating stamp:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
