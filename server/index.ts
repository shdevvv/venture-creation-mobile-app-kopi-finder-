import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { cafesRouter } from './routes/cafes';
import { userRouter } from './routes/user';
import { stampsRouter } from './routes/stamps';
import { reviewsRouter } from './routes/reviews';
import { aiRouter } from './routes/ai';
import { prisma } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/cafes', cafesRouter);
app.use('/api/user', userRouter);
app.use('/api/stamps', stampsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/ai', aiRouter);

// Health Check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    const cafeCount = await prisma.cafe.count();
    const userCount = await prisma.user.count();
    res.json({
      status: 'healthy',
      database: 'connected (SQLite)',
      stats: { cafes: cafeCount, users: userCount },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: String(error) });
  }
});

// Built-in Interactive API Tester & Documentation Web Page
app.get('/api/docs', (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>KopiFinder REST API - Interactive Tester</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    pre { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#181312] text-[#fdf9f3] min-h-screen p-4 sm:p-8">
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="border-b border-[#3e2723] pb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3e2723] text-[#ffca98] text-xs font-bold mb-2">
          <span>☕ KopiFinder Backend Engine</span>
          <span class="w-2 h-2 rounded-full bg-[#c8f17a] animate-pulse"></span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Interactive REST API Tester</h1>
        <p class="text-sm text-[#d3c3c0] mt-1">Uji coba langsung semua endpoint database SQLite & AI dengan 1-klik tanpa perlu Postman.</p>
      </div>
      <a href="http://localhost:3000" target="_blank" class="px-4 py-2.5 bg-[#ffca98] text-[#2c1600] font-bold text-xs rounded-xl hover:bg-[#ffdcbd] transition-all shadow-md">
        ← Buka Tampilan Frontend
      </a>
    </div>

    <!-- Interactive Tester Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 1. Health Check -->
      <div class="bg-[#241c1a] border border-[#3e2723] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="px-2 py-0.5 rounded-md bg-[#2e7d32]/30 text-[#81c784] text-[11px] font-bold">GET</span>
            <span class="text-xs text-[#a89a97]">Database Status</span>
          </div>
          <h3 class="font-bold text-white text-sm">/api/health</h3>
          <p class="text-xs text-[#a89a97] mt-1">Cek konektivitas SQLite dan jumlah data kafe & user.</p>
        </div>
        <button onclick="testApi('/api/health')" class="mt-4 w-full py-2 bg-[#3e2723] hover:bg-[#5b403c] text-[#ffdcbd] font-bold text-xs rounded-xl transition-all cursor-pointer">
          ▶ Test Health Check
        </button>
      </div>

      <!-- 2. Get All Cafes -->
      <div class="bg-[#241c1a] border border-[#3e2723] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="px-2 py-0.5 rounded-md bg-[#2e7d32]/30 text-[#81c784] text-[11px] font-bold">GET</span>
            <span class="text-xs text-[#a89a97]">Discovery</span>
          </div>
          <h3 class="font-bold text-white text-sm">/api/cafes</h3>
          <p class="text-xs text-[#a89a97] mt-1">Ambil seluruh data roastery dari database SQLite beserta menu seduhan.</p>
        </div>
        <button onclick="testApi('/api/cafes')" class="mt-4 w-full py-2 bg-[#3e2723] hover:bg-[#5b403c] text-[#ffdcbd] font-bold text-xs rounded-xl transition-all cursor-pointer">
          ▶ Test Get All Cafes
        </button>
      </div>

      <!-- 3. Get Filtered Cafes -->
      <div class="bg-[#241c1a] border border-[#3e2723] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="px-2 py-0.5 rounded-md bg-[#2e7d32]/30 text-[#81c784] text-[11px] font-bold">GET</span>
            <span class="text-xs text-[#a89a97]">Filtered Query</span>
          </div>
          <h3 class="font-bold text-white text-sm">/api/cafes?district=senopati&minRating=4.8</h3>
          <p class="text-xs text-[#a89a97] mt-1">Filter kafe berdasarkan distrik Senopati dengan rating minimal 4.8.</p>
        </div>
        <button onclick="testApi('/api/cafes?district=senopati&minRating=4.8')" class="mt-4 w-full py-2 bg-[#3e2723] hover:bg-[#5b403c] text-[#ffdcbd] font-bold text-xs rounded-xl transition-all cursor-pointer">
          ▶ Test Filter Senopati
        </button>
      </div>

      <!-- 4. Get User Profile & Stamps -->
      <div class="bg-[#241c1a] border border-[#3e2723] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="px-2 py-0.5 rounded-md bg-[#2e7d32]/30 text-[#81c784] text-[11px] font-bold">GET</span>
            <span class="text-xs text-[#a89a97]">User Stats</span>
          </div>
          <h3 class="font-bold text-white text-sm">/api/user</h3>
          <p class="text-xs text-[#a89a97] mt-1">Profil pengguna, XP poin, stempel passport, dan kafe bookmark.</p>
        </div>
        <button onclick="testApi('/api/user')" class="mt-4 w-full py-2 bg-[#3e2723] hover:bg-[#5b403c] text-[#ffdcbd] font-bold text-xs rounded-xl transition-all cursor-pointer">
          ▶ Test Get User Data
        </button>
      </div>

      <!-- 5. Claim Stamp POST -->
      <div class="bg-[#241c1a] border border-[#3e2723] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="px-2 py-0.5 rounded-md bg-[#1565c0]/30 text-[#90caf9] text-[11px] font-bold">POST</span>
            <span class="text-xs text-[#a89a97]">Passport Reward</span>
          </div>
          <h3 class="font-bold text-white text-sm">/api/stamps</h3>
          <p class="text-xs text-[#a89a97] mt-1">Klaim stempel kafe baru ke database (+150 Poin Perk).</p>
        </div>
        <button onclick="testPost('/api/stamps', { cafeId: 'kroma', cafeName: 'Kroma Studio & Roastery' })" class="mt-4 w-full py-2 bg-[#c8f17a] hover:bg-[#b5e065] text-[#131f00] font-extrabold text-xs rounded-xl transition-all cursor-pointer">
          ▶ Test Claim Stamp (Kroma)
        </button>
      </div>

      <!-- 6. AI Matchmaker POST -->
      <div class="bg-[#241c1a] border border-[#3e2723] rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="px-2 py-0.5 rounded-md bg-[#6a1b9a]/30 text-[#ce93d8] text-[11px] font-bold">POST</span>
            <span class="text-xs text-[#a89a97]">AI Barista Engine</span>
          </div>
          <h3 class="font-bold text-white text-sm">/api/ai/match</h3>
          <p class="text-xs text-[#a89a97] mt-1">Pencocokan cerdas barista AI berdasarkan mood kerja & seduhan V60.</p>
        </div>
        <button onclick="testPost('/api/ai/match', { mood: 'Work & Deep Focus', budget: '35k-50k', brewMethod: 'v60', amenities: ['Fast Wi-Fi (>80 Mbps)', 'Plentiful Outlets'] })" class="mt-4 w-full py-2 bg-[#ffca98] hover:bg-[#ffdcbd] text-[#2c1600] font-bold text-xs rounded-xl transition-all cursor-pointer">
          ▶ Test AI Coffee Matching
        </button>
      </div>
    </div>

    <!-- Output Response Console -->
    <div class="bg-[#120e0d] border border-[#3e2723] rounded-2xl p-5 shadow-2xl">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-[#ffca98] uppercase tracking-wider">Live Response Console</span>
          <span id="responseStatus" class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3e2723] text-[#d3c3c0]">Idle</span>
        </div>
        <span id="responseTime" class="text-xs text-[#827472]">0 ms</span>
      </div>
      <div class="relative">
        <pre id="output" class="bg-[#0a0807] p-4 rounded-xl text-xs text-[#add461] overflow-x-auto max-h-96 leading-relaxed">// Klik salah satu tombol "Test" di atas untuk melihat respon langsung dari server database SQLite.</pre>
      </div>
    </div>
  </div>

  <script>
    async function testApi(url) {
      const output = document.getElementById('output');
      const status = document.getElementById('responseStatus');
      const timeSpan = document.getElementById('responseTime');
      
      status.innerText = 'Calling...';
      status.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900 text-amber-200';
      output.innerText = '// Fetching data from: ' + url + '...';

      const start = performance.now();
      try {
        const res = await fetch(url);
        const data = await res.json();
        const duration = Math.round(performance.now() - start);

        status.innerText = res.status + ' ' + res.statusText;
        status.className = res.ok ? 'px-2 py-0.5 rounded text-[10px] font-bold bg-green-900 text-green-200' : 'px-2 py-0.5 rounded text-[10px] font-bold bg-red-900 text-red-200';
        timeSpan.innerText = duration + ' ms';
        output.innerText = JSON.stringify(data, null, 2);
      } catch (err) {
        status.innerText = 'Error';
        status.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-red-900 text-red-200';
        output.innerText = 'Fetch failed: ' + err.message;
      }
    }

    async function testPost(url, payload) {
      const output = document.getElementById('output');
      const status = document.getElementById('responseStatus');
      const timeSpan = document.getElementById('responseTime');
      
      status.innerText = 'Posting...';
      status.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-purple-900 text-purple-200';
      output.innerText = '// Sending POST to ' + url + ' with payload:\\n' + JSON.stringify(payload, null, 2) + '\\n\\n// Waiting for server response...';

      const start = performance.now();
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        const duration = Math.round(performance.now() - start);

        status.innerText = res.status + ' ' + res.statusText;
        status.className = res.ok ? 'px-2 py-0.5 rounded text-[10px] font-bold bg-green-900 text-green-200' : 'px-2 py-0.5 rounded text-[10px] font-bold bg-red-900 text-red-200';
        timeSpan.innerText = duration + ' ms';
        output.innerText = JSON.stringify(data, null, 2);
      } catch (err) {
        status.innerText = 'Error';
        status.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-red-900 text-red-200';
        output.innerText = 'Post failed: ' + err.message;
      }
    }
  </script>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`🚀 KopiFinder Backend Server running on http://localhost:${PORT}`);
  console.log(`📋 Interactive API Docs & Tester: http://localhost:${PORT}/api/docs`);
});
