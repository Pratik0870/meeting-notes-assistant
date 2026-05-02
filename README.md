\# AI Meeting Notes Assistant



A lightweight MVP that converts rough meeting notes into structured action items using AI.



\## Architecture



Frontend (React) → Backend (Node/Express) → Groq AI API → SQLite Database



\- User fills meeting title, participants, and raw notes on React frontend

\- Frontend sends POST request to Express backend

\- If audio uploaded, Whisper API converts it to text first

\- Backend sends notes to Groq Llama AI with structured prompt

\- AI returns summary and action items in JSON format

\- Data saved to SQLite database

\- History page fetches all saved meetings from database



\## Why Stack Chosen



| Tool | Reason |

|---|---|

| React | Component based, fast UI development, already familiar |

| Node/Express | Lightweight, easy routing, same language as frontend |

| SQLite | No setup needed, file based, perfect for MVP |

| Groq API | Completely free, fastest AI inference available |

| Groq Whisper | Free speech to text, no extra setup needed |



\## Tradeoffs



\- SQLite is great for MVP but wont scale for production — would use Postgres

\- No authentication — anyone can see all meeting history

\- Audio processing is synchronous — large files could slow down the server

\- Groq free tier has rate limits — paid tier needed for production use



\## What I Would Improve



\- Add user authentication so each user sees only their own meetings

\- Use Postgres database for better scalability

\- Add search functionality to find meetings by keyword

\- Deploy frontend on Vercel and backend on Render

\- Add email export so users can share meeting summaries

\- Better error messages when AI fails to parse notes

\- Add loading spinner and better mobile responsiveness

