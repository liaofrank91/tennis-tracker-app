_currently, only 250 API calls per month are supported (free version: https://rapidapi.com/sportcontentapi/api/tennis-live-data/)_

Deployed on Vercel: https://new-tennis-app.vercel.app/

### A Tennis Tracker app that lets you add verified matches to a watchlist, search for players, and view live rankings. 

##### Covers both the ATP and WTA circuit.

##### Built with React and Firebase (used Firebase Authentication, Firestore)

**API Limitations I've noticed (using _Tennis Live Data API_ from RapidAPI):**  
- Player names with variable spelling can sometimes change. e.g. Djokovic <-> Dokovic
- Data pertaining to RACE RANKINGS (Race Rank, Race Points) are incorrect/outdated, whereas LIVE RANKING data is fine

**Things to work on next:**
- accomodate for smaller screens, mobile screens, etc. 
