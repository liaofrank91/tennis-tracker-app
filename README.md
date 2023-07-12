
**Deployed on Vercel**: https://new-tennis-app.vercel.app/

# Tennis Tracker App
An app that lets you search for players, view live rankings, and add verified matches from the past that you might have missed to a watchlist.

## Screenshots
![image](https://github.com/liaofrank91/tennis-tracker-app/assets/45638876/3681ccc5-6665-40ee-b5b4-86b8dc17bd19)
![image](https://github.com/liaofrank91/tennis-tracker-app/assets/45638876/52dd2116-6319-4e29-a92d-b4f1bb2ad8cc)
![image](https://github.com/liaofrank91/tennis-tracker-app/assets/45638876/59ff0ab4-0df2-4ca1-a689-531ae5b2e5fc)
![image](https://github.com/liaofrank91/tennis-tracker-app/assets/45638876/20283d4f-06c9-4874-9866-1844d73da215)
![image](https://github.com/liaofrank91/tennis-tracker-app/assets/45638876/7d218a77-4a42-40ef-8ffc-4eb30595d08e)


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
