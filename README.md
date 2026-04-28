# RAG Startup Advisor Frontend

A Next.js chat interface for the RAG API startup advisor. Get AI-powered guidance for startups with context-aware responses backed by Ollama and ChromaDB.

## Quick Start

### Prerequisites
- RAG API running on `http://localhost:8000`
- Node.js 18+

### Start Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Start RAG API (separate terminal)

```bash
cd ../rag-api
source venv/Scripts/activate
uvicorn main:app --reload
```

## Features

- **💬 Interactive Chat** - Real-time conversations with AI advisor
- **🚀 Startup Plans** - Generate comprehensive project guides  
- **⚡ Strategies** - Get actionable recommendations
- **📄 Documents** - Create pitch decks and business plans
- **🎨 Modern UI** - Built with Tailwind CSS

## Architecture

Frontend: Next.js 16 (TypeScript, Tailwind CSS)
Backend: FastAPI RAG API + ChromaDB + Ollama

## Documentation

See [README_CHAT.md](./README_CHAT.md) for full documentation including:
- Installation & setup
- API integration details
- Deployment guides
- Troubleshooting

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Project Structure

```
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Utilities & API client
└── public/          # Static assets
```

