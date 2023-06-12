
**Deployed on Vercel**: https://new-tennis-app.vercel.app/

# Tennis Tracker App
An app that lets you search for players, view live rankings, and add verified matches from the past that you might have missed to a watchlist.

### Main Technologies Used
* React for the frontend, as well as Tailwind and daisyUI for styling
* Firebase Authentication and Google OAuth for authentication
* Retrieved latest data from _Tennis Live Data_ API from RapidAPI
* Deployed using Vercel

### Miscellaneous Notes
**API Limitations I've noticed (using _Tennis Live Data API_ from RapidAPI):**  
- Player names with variable spelling can sometimes change. e.g. Djokovic <-> Dokovic
- _currently, only 250 API calls per month are supported (free version: https://rapidapi.com/sportcontentapi/api/tennis-live-data/)_
**Things to work on next:**
- better support for smaller screens, mobile screens, etc. 
