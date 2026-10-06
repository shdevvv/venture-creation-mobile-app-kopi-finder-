import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const reviewsRouter = Router();

// GET /api/reviews - Get recent community cupping reviews
reviewsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.cuppingReview.findMany({
      include: {
        user: true,
        cafe: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const formatted = reviews.map((r) => ({
      ...r,
      tastingNotes: JSON.parse(r.tastingNotes || '[]') as string[],
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/reviews - Submit a new cupping review and rate a cafe
reviewsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {
      cafeId,
      cafeName,
      beanName,
      brewMethod,
      tastingNotes,
      content,
      coffeeRating,
      ambienceRating,
      wifiRating,
    } = req.body;

    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

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
      cafe = await prisma.cafe.findFirst();
    }

    if (!cafe) {
      return res.status(404).json({ success: false, error: 'Cafe not found' });
    }

    // Create review
    const newReview = await prisma.cuppingReview.create({
      data: {
        userId: user.id,
        cafeId: cafe.id,
        beanName: beanName || 'Single Origin V60 Filter',
        brewMethod: brewMethod || 'v60',
        tastingNotes: JSON.stringify(tastingNotes || ['Jasmine', 'Honey']),
        content: content || 'Great roast profile and clean cup finish.',
        coffeeRating: Number(coffeeRating) || 5,
        ambienceRating: Number(ambienceRating) || 5,
        wifiRating: Number(wifiRating) || 4,
      },
    });

    // Also auto-stamp if not yet stamped
    const existingStamp = await prisma.stamp.findFirst({
      where: { userId: user.id, cafeId: cafe.id },
    });

    let stampAdded = false;
    if (!existingStamp) {
      await prisma.stamp.create({
        data: {
          userId: user.id,
          cafeId: cafe.id,
          cafeName: cafe.name,
        },
      });
      stampAdded = true;
    }

    // Update user stats
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        reviewsLogged: { increment: 1 },
        perkPoints: { increment: 200 },
        ...(stampAdded && {
          roasterStamps: { increment: 1 },
          cafesVisited: { increment: 1 },
        }),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Ulasan cupping berhasil disimpan! (+200 Poin Perk)',
      data: {
        ...newReview,
        tastingNotes: JSON.parse(newReview.tastingNotes),
      },
      stampAdded,
      userStats: {
        reviewsLogged: updatedUser.reviewsLogged,
        perkPoints: updatedUser.perkPoints,
        roasterStamps: updatedUser.roasterStamps,
      },
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
