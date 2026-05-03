# AI Meeting Notes Assistant

i made this project for my assignment. its a web app where you can put your rough meeting notes and it will convert them into proper summary with action items and who has to do what.

## Architecture

React Frontend → Node/Express Backend → Groq AI API → SQLite Database

- user fills meeting title, participants and raw notes in react form
- frontend sends POST request to express backend on port 5000
- if audio uploaded, whisper api converts it to text first
- backend sends notes to groq llama ai with structured prompt
- ai returns summary, tags and action items in json format
- everything saved in sqlite database
- history page fetches all saved meetings from database

## Why Stack Chosen

- React - easy to build ui with components, already familiar with it
- Node/Express - simple to setup routes and api, same language as frontend
- SQLite - no setup needed, file based, perfect for mvp
- Groq API - completely free, very fast, good quality output
- Groq Whisper - free speech to text, no extra setup needed

## Tradeoffs

- sqlite is good for small project but if there are many users it wont work well, postgres would be better
- right now there is no login so anyone can see all meetings
- if audio file is very large it can slow down the server
- groq free tier has some limits so for big production app paid tier would be needed

## What I Would Improve

- add user login so each user sees only their meetings
- switch to postgres database for better performance
- add a search bar to find old meetings by keyword
- deploy on vercel and render so anyone can use it without running locally
- add option to download summary as pdf
