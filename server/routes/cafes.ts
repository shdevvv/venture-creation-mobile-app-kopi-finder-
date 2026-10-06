import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const cafesRouter = Router();

// GET /api/cafes - List cafes with dynamic filtering and sorting
cafesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { search, district, price, minRating, feature, sortBy } = req.query;

    const allCafes = await prisma.cafe.findMany({
      include: {
        menu: true,
      },
    });

    let result = allCafes.map((c) => ({
      ...c,
      images: JSON.parse(c.images || '[]') as string[],
      features: JSON.parse(c.features || '[]') as string[],
      keySpecs: {
        priceAvg: c.priceRange,
        wifiSpeed: c.wifiSpeed,
        wifiLabel: c.wifiLabel,
        noiseDb: c.noiseDb,
        noiseLabel: c.noiseLabel,
      },
      aspectRatings: {
        coffee: c.aspectCoffee,
        vibe: c.aspectVibe,
        wifiSpeed: c.wifiSpeed,
        plugs: c.aspectPlugs,
        service: c.aspectService,
      },
      menu: c.menu.map((m) => ({
        ...m,
        tastingNotes: JSON.parse(m.tastingNotes || '[]') as string[],
      })),
    }));

    // Filter by search query
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.neighborhood.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Filter by district/neighborhood
    if (district && typeof district === 'string' && district !== 'all') {
      const d = district.toLowerCase();
      result = result.filter(
        (c) =>
          c.neighborhood.toLowerCase().includes(d) ||
          c.address.toLowerCase().includes(d)
      );
    }

    // Filter by price range
    if (price && typeof price === 'string' && price !== 'all') {
      if (price === '$') {
        result = result.filter((c) => c.priceRange.includes('$ •') || c.priceRange.includes('25k'));
      } else if (price === '$$') {
        result = result.filter((c) => c.priceRange.startsWith('$$'));
      } else if (price === '$$$') {
        result = result.filter((c) => c.priceRange.startsWith('$$$'));
      }
    }

    // Filter by minimum rating
    if (minRating) {
      const r = parseFloat(minRating as string);
      if (!isNaN(r)) {
        result = result.filter((c) => c.rating >= r);
      }
    }

    // Filter by feature
    if (feature && typeof feature === 'string') {
      result = result.filter((c) =>
        c.features.some((f) => f.toLowerCase().includes(feature.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching cafes:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/cafes/:id - Get cafe details and menu
cafesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cafe = await prisma.cafe.findUnique({
      where: { id },
      include: {
        menu: true,
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!cafe) {
      return res.status(404).json({ success: false, error: 'Cafe not found' });
    }

    const formatted = {
      ...cafe,
      images: JSON.parse(cafe.images || '[]') as string[],
      features: JSON.parse(cafe.features || '[]') as string[],
      keySpecs: {
        priceAvg: cafe.priceRange,
        wifiSpeed: cafe.wifiSpeed,
        wifiLabel: cafe.wifiLabel,
        noiseDb: cafe.noiseDb,
        noiseLabel: cafe.noiseLabel,
      },
      aspectRatings: {
        coffee: cafe.aspectCoffee,
        vibe: cafe.aspectVibe,
        wifiSpeed: cafe.wifiSpeed,
        plugs: cafe.aspectPlugs,
        service: cafe.aspectService,
      },
      menu: cafe.menu.map((m) => ({
        ...m,
        tastingNotes: JSON.parse(m.tastingNotes || '[]') as string[],
      })),
      reviews: cafe.reviews.map((r) => ({
        ...r,
        tastingNotes: JSON.parse(r.tastingNotes || '[]') as string[],
      })),
    };

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error fetching cafe detail:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
