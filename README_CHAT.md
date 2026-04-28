# RAG Startup Advisor Frontend

A modern Next.js chat interface for the RAG API startup advisor, enabling seamless interaction with AI-powered startup guidance.

## Features

- **💬 Interactive Chat Interface** - Real-time conversations with AI startup advisor
- **🚀 Startup Plan Generation** - Create comprehensive startup project guides
- **⚡ Strategic Recommendations** - Get actionable strategies for any startup topic
- **📄 Document Generation** - Auto-generate pitch decks, business plans, and investor updates
- **🔗 RAG Integration** - Powered by ChromaDB vector database and Ollama local LLM
- **⏱️ Real-time Streaming** - See AI responses as they're generated
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎨 Modern UI** - Built with Tailwind CSS and Lucide icons

## Tech Stack

- **Frontend Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Backend API**: FastAPI (RAG API)

## Prerequisites

- Node.js 18+ and npm
- RAG API running locally on `http://localhost:8000`
- Ollama with models: `qwen2.5:0.5b` and `nomic-embed-text`

## Installation

1. Navigate to the project directory:
   ```bash
   cd ~/Documents/Personal-Portfolio/rag_frontend
   ```

2. Install dependencies (already done, but run if needed):
   ```bash
   npm install
   ```

3. Ensure `.env.local` is configured:
   ```env
   NEXT_PUBLIC_RAG_API_URL=http://localhost:8000
   ```

## Getting Started

### Start the RAG API (in another terminal)

```bash
cd ~/Documents/Personal-Portfolio/rag-api
source venv/Scripts/activate  # Windows
# or source venv/bin/activate  # Mac/Linux
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Start the Frontend Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the interface.

## Usage

### Chat Interface

1. **Ask Question** - Ask any startup-related question and get AI-powered answers with context sources
2. **Generate Plan** - Describe your startup idea to get a comprehensive 10-section plan
3. **Get Strategies** - Request 4 actionable strategies for a specific topic
4. **Generate Doc** - Create business documents like pitch decks and investor updates

### Example Queries

- **Question**: "How do I validate my startup idea?"
- **Plan**: "An AI-powered platform that helps small businesses automate customer service"
- **Strategies**: "Customer acquisition for B2B SaaS"
- **Document**: "Pitch deck for AI startup"

## Project Structure

```
rag_frontend/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Main chat interface
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/                 # React components
│   ├── ChatContainer.tsx       # Main chat logic
│   ├── ChatMessage.tsx         # Message display
│   └── ChatInput.tsx           # User input area
├── lib/
│   ├── api.ts                 # RAG API client
│   └── types.ts               # TypeScript types
├── public/                     # Static assets
├── .env.local                 # Environment variables
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
└── next.config.ts             # Next.js config
```

## API Integration

The frontend communicates with the RAG API through Axios client in `lib/api.ts`:

### Endpoints Used

- `GET /health` - Health check
- `POST /ask` - Answer startup questions
- `POST /startup-plan` - Generate startup plans
- `POST /strategies` - Generate strategies
- `POST /generate-document` - Generate business documents
- `POST /batch-ask` - Batch question processing

## Development

### Build for Production

```bash
npm run build
npm run start
```

### Lint Code

```bash
npm run lint
```

### Run Tests

Tests can be added using Jest or Vitest:

```bash
npm test
```

## Troubleshooting

### "Failed to connect to RAG API"

- Ensure RAG API is running on `http://localhost:8000`
- Check that Ollama is running with required models
- Verify network connectivity

### Messages not showing sources

- Check that ChromaDB is properly initialized with startup knowledge
- Verify `context_used` in API responses

### Slow responses

- Check system resources
- Ensure Ollama models are loaded in memory
- Consider reducing `TOP_K_RESULTS` in RAG API config

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Set `NEXT_PUBLIC_RAG_API_URL` in environment variables
4. Deploy

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Build and run:

```bash
docker build -t rag-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_RAG_API_URL=http://host.docker.internal:8000 rag-frontend
```

## Performance Tips

1. **Message Caching** - Consider adding localStorage for chat history
2. **Debouncing** - Input debouncing reduces API calls
3. **Lazy Loading** - Load message history progressively
4. **Image Optimization** - Use Next.js Image component for assets

## Contributing

Feel free to enhance the frontend:

- Add dark mode support
- Implement chat history persistence
- Add code syntax highlighting for responses
- Create export to PDF functionality
- Add multi-language support

## License

Part of the Personal Portfolio project. See parent README for details.

## Support

For issues or questions:
1. Check RAG API logs for backend errors
2. Review browser console for frontend errors
3. Verify API connectivity at `http://localhost:8000/health`
