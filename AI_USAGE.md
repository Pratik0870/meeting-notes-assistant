# AI Usage Report

## Example 1 - making the summarize api

what i asked ai:
i asked chatgpt to write me a express route that takes meeting notes and calls groq ai to get summary and action items back in json format

ai output:
it was good, gave me the basic structure with async await and error handling. but the prompt it used to call ai was too simple

what i changed:
i made the prompt more specific. told ai to return only json format with summary, action items, owner name and priority. also wrote no extra text in the prompt so ai doesnt add explanation before the json

why i changed it:
bcz first version was giving back plain text paragraph and i couldnt use that in frontend. i needed proper json to show each field separately

what i learnt:
prompt engineering is very important. if you give clear and specific instructions to ai you get much better output. vague prompt gives vague answer

---

## Example 2 - model was not working

what i asked ai:
i got error saying llama3-8b-8192 model is decommisioned. i asked chatgpt which model to use instead on groq

ai output:
it was bad. everytime i asked it gave diffrent model name and none of them were working. it was very confusing

what i changed:
i stopped asking ai and directly went to groq official website and checked their documentation. found that llama-3.3-70b-versatile was the correct model

why i changed it:
bcz ai kept giving wrong answers for this. ai has a cutoff date for training so it doesnt know about recent changes in apis

what i learnt:
dont trust ai blindly for things like model names or library versions. always check official documentation bcz ai can give wrong answer very confidently

---

## Example 3 - react frontend form

what i asked ai:
help me make a react form with meeting title participants and notes fields that sends data to my backend and shows the result

ai output:
it was good, gave working component with usestate and axios call. but it was missing some things

what i changed:
ai didnt add loading state so when user clicks button nothing shows that app is working. i added loading state that changes button text to Generating. also added error message and color coded badges for high medium low priority which ai didnt give

why i changed it:
without loading state user thinks app is crashed. color coding makes it easy to see priority at one glance without reading

what i learnt:
ai gives good starting code but small ux details like loading state error handling and visual design always need to be added by us manually

---

## Example 4 - audio file upload problem

what i asked ai:
how to receive audio file in express and send to groq whisper for speech to text conversion

ai output:
it was good, gave multer setup and whisper api code. but had some issues

what i changed:
ai forgot to delete the temp file after transcription so files were getting saved in uploads folder permanently. also ai made both notes and audio required but user should be able to use either one not both

why i changed it:
if temp files are not deleted server storage will fill up over time. and forcing user to give both audio and text doesnt make sense

what i learnt:
ai writes the main working code well but misses edge cases like file cleanup and optional fields. always test the code properly and check these small things manually
