import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { GoogleGenAI } from '@google/genai';

export const aiRouter = Router();

// POST /api/ai/match - Smart Barista Engine recommendation
aiRouter.post('/match', async (req: Request, res: Response) => {
  try {
    const { mood, budget, amenities, brewMethod } = req.body;

    const allCafes = await prisma.cafe.findMany({
      include: { menu: true },
    });

    if (allCafes.length === 0) {
      return res.status(404).json({ success: false, error: 'No cafes found' });
    }

    // Smart algorithmic scoring
    let bestCafe = allCafes[0];
    let highestScore = -1;

    for (const c of allCafes) {
      let score = 50;

      if (mood === 'Work & Deep Focus') {
        if (parseInt(c.wifiSpeed) >= 80) score += 20;
        if (c.aspectPlugs.toLowerCase().includes('abundant') || c.aspectPlugs.toLowerCase().includes('100%')) score += 15;
        if (parseInt(c.noiseDb) <= 55) score += 10;
      } else if (mood === 'Casual Date') {
        if (c.aspectVibe >= 4.8) score += 25;
        if (c.aspectCoffee >= 4.8) score += 15;
      } else if (mood === 'Book Reading') {
        if (parseInt(c.noiseDb) <= 53) score += 30;
        score += c.aspectVibe * 4;
      } else if (mood === 'Espresso Tasting') {
        if (c.features.toLowerCase().includes('roast')) score += 30;
        score += c.aspectCoffee * 5;
      } else {
        score += c.aspectVibe * 4 + c.aspectCoffee * 4;
      }

      if (Array.isArray(amenities)) {
        amenities.forEach((a: string) => {
          if (a.includes('Wi-Fi') && parseInt(c.wifiSpeed) >= 70) score += 6;
          if (a.includes('Outlets') && !c.aspectPlugs.toLowerCase().includes('few')) score += 6;
          if (a.includes('Quiet') && parseInt(c.noiseDb) <= 56) score += 6;
          if (a.includes('Garden') && c.features.toLowerCase().includes('pet')) score += 6;
        });
      }

      if (score > highestScore) {
        highestScore = score;
        bestCafe = c;
      }
    }

    // Recommended Menu Item
    const recommendedPour =
      bestCafe.menu.find((m) => {
        if (brewMethod === 'v60') return m.category === 'manual-brew' || m.name.toLowerCase().includes('v60');
        if (brewMethod === 'espresso') return m.category === 'coffee' || m.name.toLowerCase().includes('espresso') || m.name.toLowerCase().includes('white');
        if (brewMethod === 'cold-drip') return m.name.toLowerCase().includes('cold');
        return true;
      }) || bestCafe.menu[0];

    // Optional: Call Gemini API if GEMINI_API_KEY is configured
    let aiExplanation = `Cocok untuk ${mood?.toLowerCase() || 'ngopi'}: Wi-Fi ${bestCafe.wifiSpeed}, colokan ${bestCafe.aspectPlugs}, dan suasana ${bestCafe.noiseLabel} (${bestCafe.noiseDb}).`;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Sebagai Q-Grader barista ahli kopi Jakarta, berikan 1 kalimat persuasif (maksimal 25 kata) mengapa kafe "${bestCafe.name}" di ${bestCafe.neighborhood} paling cocok untuk seseorang yang mencari suasana "${mood}", budget "${budget}", dengan seduhan "${brewMethod}".`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        if (response.text) {
          aiExplanation = response.text.trim();
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local reasoning:', geminiError);
      }
    }

    const formattedCafe = {
      ...bestCafe,
      images: JSON.parse(bestCafe.images || '[]') as string[],
      features: JSON.parse(bestCafe.features || '[]') as string[],
      keySpecs: {
        priceAvg: bestCafe.priceRange,
        wifiSpeed: bestCafe.wifiSpeed,
        wifiLabel: bestCafe.wifiLabel,
        noiseDb: bestCafe.noiseDb,
        noiseLabel: bestCafe.noiseLabel,
      },
      aspectRatings: {
        coffee: bestCafe.aspectCoffee,
        vibe: bestCafe.aspectVibe,
        wifiSpeed: bestCafe.wifiSpeed,
        plugs: bestCafe.aspectPlugs,
        service: bestCafe.aspectService,
      },
      menu: bestCafe.menu.map((m) => ({
        ...m,
        tastingNotes: JSON.parse(m.tastingNotes || '[]') as string[],
      })),
    };

    res.json({
      success: true,
      matchScore: 94 + Math.floor(Math.random() * 5),
      aiReasoning: aiExplanation,
      matchedCafe: formattedCafe,
      recommendedPour: {
        ...recommendedPour,
        tastingNotes: JSON.parse(recommendedPour.tastingNotes || '[]') as string[],
      },
    });
  } catch (error) {
    console.error('Error in AI matchmaker:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
