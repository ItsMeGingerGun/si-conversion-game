# SI Unit Challenge - Farcaster Mini App

![Game Screenshot](/public/screenshots/screenshot1.png)

The SI Unit Challenge is a fast-paced conversion game deployed as a Farcaster mini-app. Players test their knowledge of metric system conversions under time pressure across three difficulty levels, competing for top scores on global leaderboards.

## Key Features

- ⏱️ **Timed Conversion Challenges**: Convert between SI units (weight, distance, time, memory) with 10-20 second limits
- 🥇 **Global Leaderboards**: Compete against players worldwide with Redis-backed score tracking
- 🎮 **3 Difficulty Levels**: Easy (20s), Medium (15s), Hard (10s) per question
- 📱 **Farcaster Integration**: Play directly in Warpcast frames with seamless UX
- 🏆 **Social Sharing**: Challenge friends and share scores via Farcaster
- 📈 **Player Analytics**: Track game sessions with state parameters

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Redis (via Upstash)
- **Database**: Redis for leaderboards and session storage
- **Authentication**: Neynar for Farcaster identity
- **Deployment**: Vercel
- **Farcaster**: Frame Actions, Mini App Manifest

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/si-conversion-game.git
cd si-conversion-game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment
Create `.env.local` file:
```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Redis (Upstash)
REDIS_URL=your_redis_url
REDIS_TOKEN=your_redis_token

# Farcaster
NEYNAR_API_KEY=your_neynar_key
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Test Frame Locally
Visit: `http://localhost:3000/frame`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Yes | Your application URL (e.g., `https://your-app.vercel.app`) |
| `REDIS_URL` | Yes | Redis database connection URL |
| `REDIS_TOKEN` | Yes | Redis access token |
| `NEYNAR_API_KEY` | Yes | Neynar API key for Farcaster validation |
| `FRAME_ANALYTICS_URL` | No | Endpoint for frame interaction analytics |

## Farcaster Integration

### 1. Create Frame Images
- `public/frame.png` (1200x630) - Main frame image
- `public/frame-game.png` (1200x630) - In-game frame
- `public/icons/icon-192.png` (192x192)
- `public/icons/icon-512.png` (512x512)
- `public/screenshots/screenshot1.png` (1280x720)

### 2. Configure Manifest
Update `public/manifest.json` with your app details:
```json
{
  "name": "SI Unit Challenge",
  "icon": "https://your-app.vercel.app/icons/icon-192.png",
  "start_url": "https://your-app.vercel.app/frame",
  "description": "Test your SI unit conversion skills against the clock!",
  "app": {
    "bundle": "/",
    "bundlePath": "https://your-app.vercel.app"
  }
  
}
```

### 3. Submit to Farcaster
1. Test your frame:  
  
   
2. Submit to Mini App Directory:  
   [Farcaster Developers Portal](https://warpcast.com/~/developers)

3. Provide:
   - Manifest URL: `https://your-app.vercel.app/manifest.json`
   - App Name: "SI Unit Challenge"
   - Category: "Games"
   - Tags: "education, puzzle, game"

### 4. Share Your App
```markdown
Test your unit conversion skills with this fast-paced game! 
https://your-app.vercel.app/frame
```

## Repository Structure

```
si-conversion-game/
├── public/                   # Static assets
│   ├── manifest.json         # Farcaster manifest
│   ├── frame.png             # Main frame image
│   ├── frame-game.png        # In-game frame
│   ├── icons/                # App icons
│   └── screenshots/          # App screenshots
│
├── src/
│   ├── app/
│   │   ├── frame/            # Frame entry point
│   │   ├── game/             # Game UI
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   │
│   ├── components/           # React components
│   ├── lib/                  # Utilities and helpers
│   └── styles/               # Global styles
│
├── .env.example              # Environment template
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
└── README.md                 # Project documentation
```

## Contributing

We welcome contributions to improve the SI Unit Challenge! Here's how to get started:

### Reporting Issues
- Use [GitHub Issues](https://github.com/your-username/si-conversion-game/issues) to report bugs
- Include steps to reproduce, expected behavior, and screenshots

### Feature Requests
- Submit feature requests with detailed descriptions
- Explain the problem it solves or the enhancement it provides

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your fork: `git push origin feature/new-feature`
5. Open a pull request

### Code Guidelines
- Follow existing TypeScript patterns
- Keep components small and focused
- Use descriptive variable names
- Add comments for complex logic
- Update documentation when changing functionality

### Testing
- Test all frame interactions
- Verify game logic with different unit conversions
- Check responsive design across devices

### Deployment Preview
- All PRs automatically deploy to Vercel
- Include frame debugger link in PR description

---

**Start playing now**:  
`https://your-app.vercel.app/frame`  
Challenge your friends and climb the leaderboards!
