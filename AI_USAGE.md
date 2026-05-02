\# AI Usage Report



\## Prompt 1 — Setting up the summarize API



\*\*What I asked AI:\*\*

i asked chatgpt to help me write a express endpoint that takes meeting notes and calls an ai api to generate summary and action items in json format



\*\*AI Output:\*\*

Good — it gave me the basic structure with async await and error handling which was helpfull



\*\*What I changed:\*\*

the prompt i was sending to ai was too simple and vague. i changed it to be more specific, told it to return only json with summary, action items, owner name and priority. also added "no extra text" in the prompt



\*\*Why:\*\*

because first version was returning plain text paragraph instead of json so i couldnt parse it on frontend properly



\*\*What I learned:\*\*

prompt engineering is very important. if you give ai a clear and structured prompt you get back a much better and consistent output. vague prompts give vague answers



\---



\## Prompt 2 — Model was decommisioned error



\*\*What I asked AI:\*\*

i got a error saying llama3-8b-8192 model is decommisioned and not supported anymore. i asked chatgpt which model to use instead



\*\*AI Output:\*\*

Bad — it kept suggesting models that were also outdated or wrong. everytime i asked it gave diffrent answer



\*\*What I changed:\*\*

i stopped trusting ai for this and went directly to groq official documentation. found that llama-3.3-70b-versatile was the correct and latest model



\*\*Why:\*\*

ai has a training cutoff date so it doesnt always know about recent changes in apis and which models are deprecated



\*\*What I learned:\*\*

dont blindly trust ai for version specific things like api models or library versions. always verify from official documentation because ai can be confidently wrong



\---



\## Prompt 3 — Building React frontend form



\*\*What I asked AI:\*\*

help me build a react form with fields for meeting title, participants and notes that calls my backend api and shows the result on screen



\*\*AI Output:\*\*

Good — gave me a working component with usestate and axios call to the backend



\*\*What I changed:\*\*

ai missed the loading state so when user clicks generate summary button nothing was showing that its working. i added a loading state that shows "Generating..." on the button. also added error message and color coded priority badges which were not there



\*\*Why:\*\*

without loading state user doesnt know if app is working or crashed. color coding makes high medium low priority instantly visible without reading



\*\*What I learned:\*\*

ai gives a good working first draft but user experience details like loading states, error handling and visual feedback always need to be added manually. ai focuses on functionality not ux



\---



\## Prompt 4 — Audio file upload



\*\*What I asked AI:\*\*

how to receive a audio file in express and send it to groq whisper api to convert speech to text



\*\*AI Output:\*\*

Good — gave me multer setup for file upload and groq audio transcription code



\*\*What I changed:\*\*

ai forgot to delete the temp file after transcription so files were piling up in uploads folder. also had to make notes field optional when audio is provided bcz ai made both required



\*\*Why:\*\*

if we dont delete temp files after use the server storage will fill up. and user should be able to use either notes or audio not forced to give both



\*\*What I learned:\*\*

ai handles the main happy path very well but edge cases like cleanup of temp files, optional vs required fields and error handling need to be carefully checked and fixed manually

