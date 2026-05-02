# AI Meeting Notes Assistant

i made this project for my assignment. its a web app where you can put your rough meeting notes and it will convert them into proper summary with action items and who has to do what.

## Architecture

the app has two parts. frontend made in react which is what user sees and backend made in node and express which does all the processing. when user fills the form and clicks generate summary, react sends the data to express backend. if user uploaded a audio file then whisper api first converts it to text. then backend sends the notes to groq ai model with a prompt. ai gives back summary, tags and action items in json format. we then save it in sqlite database. history page shows all the previous meetings fetched from database.

## Why Stack Chosen

i used react for frontend bcz i was already familiar with it and its easy to make ui with components. for backend i used node and express bcz its simple to make routes and its same language as frontend so no switching. for database i used sqlite bcz it doesnt need any setup, it just saves everything in one file which is good for a small project like this. for ai i used groq api bcz its completly free and very fast. for audio i used groq whisper which is also free and converts speech to text.

## Tradeoffs

sqlite is good for small project but if there are many users it wont work well, in that case postgres would be better. right now there is no login so anyone can see all meetings. if audio file is very large it can slow down the server bcz we process it one at a time. groq free tier has some limits so for big production app paid tier would be needed.

## What I Would Improve

if i get more time i would add user login so each user sees only their meetings. i would also switch to postgres database for better performance. would add a search bar to find old meetings by keyword. would deploy it on vercel and render so anyone can use it without running locally. would also add option to download summary as pdf.
