# Quick Start Guide - RAG Chat Frontend

## ✅ Project Created Successfully!

Your Next.js chat interface is ready at:
```
~/Documents/Personal-Portfolio/rag_frontend
```

## 🚀 Running the Frontend

### Terminal 1: Start the RAG API
```bash
cd ~/Documents/Personal-Portfolio/rag-api
source venv/Scripts/activate  # Windows
uvicorn main:app --reload
```
✓ API will be at: http://localhost:8000

### Terminal 2: Start the Frontend
```bash
cd ~/Documents/Personal-Portfolio/rag_frontend
npm run dev
```
✓ Frontend will be at: http://localhost:3000

## 🎯 What You Get

### Components
- **ChatContainer.tsx** - Main chat logic with API integration
- **ChatMessage.tsx** - Message display with icons and source context
- **ChatInput.tsx** - Multi-mode input (Questions, Plans, Strategies, Documents)

### Features
- ✅ Real-time chat interface
- ✅ API health checking
- ✅ Streaming response display
- ✅ Source attribution
- ✅ Multiple interaction modes
- ✅ Error handling & reconnection
- ✅ Responsive design with Tailwind CSS

### API Integration
- All endpoints mapped: `/ask`, `/startup-plan`, `/strategies`, `/generate-document`
- Automatic error handling
- Connection status indicator
- Context source display

## 📝 Environment Configuration

File: `.env.local`
```env
NEXT_PUBLIC_RAG_API_URL=http://localhost:8000
```

Change the URL if your RAG API runs on a different port.

## 🧪 Testing the Chat

Once both servers are running, try:

1. **Ask a Question**
   - "How do I validate my startup idea?"
   - "What metrics matter for SaaS?"

2. **Generate a Plan**
   - "An AI platform for automating customer service"

3. **Get Strategies**
   - "Customer acquisition for B2B SaaS"

4. **Generate Document**
   - "Pitch deck for AI startup"

## 📂 Project Files

```
rag_frontend/
├── app/
│   ├── page.tsx           ← Main chat page
│   ├── layout.tsx         ← Root layout
│   └── globals.css        ← Global styles
├── components/
│   ├── ChatContainer.tsx  ← Main component
│   ├── ChatMessage.tsx    ← Message display
│   └── ChatInput.tsx      ← User input
├── lib/
│   ├── api.ts            ← API client
│   └── types.ts          ← TypeScript types
├── .env.local            ← Config
└── package.json          ← Dependencies
```

## 🛠️ Build & Deployment

### Development
```bash
npm run dev      # Start dev server with hot reload
npm run lint     # Check code quality
```

### Production
```bash
npm run build    # Build optimized bundle
npm run start    # Start production server
```

## 🔗 API Integration Points

The frontend calls these RAG API endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check API status |
| `/ask` | POST | Answer questions |
| `/startup-plan` | POST | Generate plans |
| `/strategies` | POST | Get strategies |
| `/generate-document` | POST | Create documents |

## ❓ Troubleshooting

### "Failed to connect to RAG API"
- Ensure RAG API is running on http://localhost:8000
- Check Ollama is running with required models
- Verify firewall isn't blocking localhost:8000

### Blank chat screen
- Check browser console for errors (F12)
- Ensure .env.local has correct API URL
- Try refreshing the page

### Slow responses
- Check system resources
- Ensure Ollama models are loaded
- Review RAG API logs for issues

## 📚 Documentation

- Full docs: [README_CHAT.md](./README_CHAT.md)
- RAG API docs: [../rag-api/README.md](../rag-api/README.md)
- Next.js docs: https://nextjs.org/docs

## 🎓 What's Included

✅ TypeScript for type safety
✅ Tailwind CSS for styling
✅ Lucide icons for UI
✅ Axios for HTTP requests
✅ Error boundaries
✅ Loading states
✅ Responsive design
✅ Auto-scrolling messages
✅ Source attribution
✅ Message type indicators

## 🚀 Next Steps

1. Start both servers (RAG API + Frontend)
2. Visit http://localhost:3000
3. Test the chat interface
4. Customize styling/colors if needed
5. Deploy to Vercel or your preferred host

Happy building! 🎉
