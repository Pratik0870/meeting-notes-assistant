\# AI Meeting Notes Assistant



A simple tool that takes rough meeting notes and converts them into proper structured action items using AI.



\## Architecture



React Frontend → Node/Express Backend → Groq AI API → SQLite Database



\- user fills the meeting title, participants and raw notes in the react form

\- frontend sends a POST request to the express backend on port 5000

\- if audio file is uploaded, whisper api first converts it to text

\- backend then sends the notes to groq llama ai with a proper prompt

\- ai returns the summary and action items in json format

\- we save everything in sqlite database

\- history page fetches all the saved meetings and shows them



\## Why Stack Chosen



| Tool | Reason |

|---|---|

| React | easy to build ui with components, we already knew it |

| Node/Express | simple to setup routes and api, same language as frontend so no context switching |

| SQLite | no extra setup needed, its just a file, perfect for a mvp like this |

| Groq API | completly free, very fast response, good quality output |

| Groq Whisper | free speech to text, no need to setup anything extra |



\## Tradeoffs



\- sqlite is good for mvp but wont scale for production, in real app we would use postgres or mysql

\- there is no authentication right now so anyone can see all the meeting history

\- audio processing is synchronous so if file is very large it can slow down the server

\- groq free tier has rate limits so for production use we would need paid tier



\## What I Would Improve



\- add user login so every user can only see their own meetings

\- switch to postgres for better performance and scalability  

\- add search feature so user can search meetings by keyword or date

\- deploy frontend on vercel and backend on render so anyone can access it

\- add option to export meeting summary as pdf or send on email

\- better error messages when ai is not able to understand the notes properly

\- make it more mobile friendly with better responsive design

